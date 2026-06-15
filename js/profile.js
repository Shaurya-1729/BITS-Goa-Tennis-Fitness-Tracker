import { db } from "./firebase-config.js";

import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

import {
  getAuth,
  signOut
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

const auth = getAuth();

const player =
JSON.parse(
  sessionStorage.getItem(
    "playerData"
  )
);

if (!player) {

  window.location.href =
    "login.html";
}

/* ADMIN CHECK */

if (player.role === "admin") {

  document
    .getElementById(
      "adminPanel"
    )
    .classList
    .remove("hidden");
}

function getWeekKey() {

  const today = new Date();

  const day = today.getDay();

  const diff =
    today.getDate() -
    day +
    (day === 0 ? -6 : 1);

  const monday =
    new Date(today);

  monday.setDate(diff);

  return monday
    .toISOString()
    .split("T")[0];
}
const weekKey = getWeekKey();

const weekStart =
new Date(weekKey);

const weekEnd =
new Date(weekStart);

weekEnd.setDate(
  weekStart.getDate() + 6
);

document.getElementById(
  "weekDisplay"
).innerText =
`Training Week: ${weekStart.toLocaleDateString()} - ${weekEnd.toLocaleDateString()}`;

console.log("PLAYER DATA:", player);

if (!player) {
  window.location.href = "login.html";
}

document.getElementById("playerName")
.innerText = player.name;

document.getElementById("playerTeam")
.innerText =
`Team: ${player.team}`;

document.getElementById("totalPoints")
.innerText =
player["total points"] || 0;

const submissionRef = doc(
  db,
  "weeklySubmissions",
  `${player["bits id"]}_${weekKey}`
);

const submissionSnap =
await getDoc(submissionRef);

if (submissionSnap.exists()) {

  const data =
  submissionSnap.data();

  document.getElementById("runs").value =
  data.runs || 0;

  document.getElementById("upper").value =
  data.upper || 0;

  document.getElementById("lower").value =
  data.lower || 0;

  document.getElementById("court").value =
  data.court || 0;

  document.getElementById("runs").disabled =
  true;

  document.getElementById("upper").disabled =
  true;

  document.getElementById("lower").disabled =
  true;

  document.getElementById("court").disabled =
  true;

  document.getElementById("submitBtn").disabled =
  true;

  document.getElementById("submitBtn").innerText =
  "Week Locked";

  document.getElementById("submitBtn")
    .classList.add("opacity-50");

  const msg =
  document.getElementById(
    "lockedMessage"
  );

  if (msg) {
    msg.classList.remove(
      "hidden"
    );
  }
}


function getTier(points) {

  if (points >= 13) {
    return "Sexy 🔥";
  }

  if (points >= 9) {
    return "Very Good ⭐";
  }

  if (points >= 5) {
    return "Good 👍";
  }

  return "Keep Going";
}

document.getElementById("playerTier")
.innerText =
getTier(
player["total points"] || 0
);

document
.getElementById("logoutBtn")
.addEventListener("click", async () => {

  await signOut(auth);

  sessionStorage.clear();

  window.location.href =
  "login.html";
});

document
.getElementById("submitBtn")
.addEventListener("click", async () => {

  if (submissionSnap.exists()) {

    alert(
      "This week's submission is already locked."
    );

    return;
  }

  const runs =
  Number(
    document.getElementById("runs").value
  ) || 0;

  const upper =
  Number(
    document.getElementById("upper").value
  ) || 0;

  const lower =
  Number(
    document.getElementById("lower").value
  ) || 0;

  const court =
  Number(
    document.getElementById("court").value
  ) || 0;

  const total =
  runs +
  upper +
  lower +
  court;

  console.log("PLAYER:", player);
console.log("BITS ID:", player["bits id"]);
console.log("WEEK KEY:", weekKey);
  
  await setDoc(
    doc(
      db,
      "weeklySubmissions",
     `${player["bits id"]}_${weekKey}`
    ),
    {
      "bits id":
      player["bits id"],

      name:
      player.name,

      team:
      player.team,

      runs,
      upper,
      lower,
      court,

      "total points":
      total,

      submittedAt:
      serverTimestamp()
    }
  );

  await updateDoc(
  doc(
    db,
    "players",
    player["bits id"]
  ),
  {
    "total points": total
  }
);

  document
  .getElementById("successMsg")
  .classList
  .remove("hidden");

});

async function loadAdminPanel() {

  if (player.role !== "admin") {
    return;
  }

  const {
    collection,
    getDocs
  } = await import(
    "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js"
  );

  const playersSnap =
    await getDocs(
      collection(
        db,
        "players"
      )
    );

  const submissionsSnap =
    await getDocs(
      collection(
        db,
        "weeklySubmissions"
      )
    );

  const players = [];
  const submissions = [];
  const submittedIds = new Set();

  playersSnap.forEach(doc => {
    players.push(doc.data());
  });

  submissionsSnap.forEach(doc => {

    const data =
      doc.data();

    if (
      doc.id.endsWith(
        "_" + weekKey
      )
    ) {

      submissions.push(
        data
      );

      submittedIds.add(
        data["bits id"]
      );
    }
  });

  const boys =
    players.filter(
      p =>
      p.team === "boys"
    );

  const girls =
    players.filter(
      p =>
      p.team === "girls"
    );

  const boysMissing =
    boys.filter(
      p =>
      !submittedIds.has(
        p["bits id"]
      )
    );

  const girlsMissing =
    girls.filter(
      p =>
      !submittedIds.has(
        p["bits id"]
      )
    );

  document.getElementById(
    "boysSubmitted"
  ).innerText =
  `Submitted: ${
    boys.length -
    boysMissing.length
  } / ${boys.length}`;

  document.getElementById(
    "girlsSubmitted"
  ).innerText =
  `Submitted: ${
    girls.length -
    girlsMissing.length
  } / ${girls.length}`;

  document.getElementById(
    "boysMissing"
  ).innerHTML =
  boysMissing
  .map(
    p =>
    `<li>❌ ${p.name}</li>`
  )
  .join("");

  document.getElementById(
    "girlsMissing"
  ).innerHTML =
  girlsMissing
  .map(
    p =>
    `<li>❌ ${p.name}</li>`
  )
  .join("");

  document.getElementById(
    "submissionList"
  ).innerHTML =
  submissions
  .sort(
    (a,b) =>
    (b["total points"] || 0)
    -
    (a["total points"] || 0)
  )
  .map(
    p => `
      <div class="flex justify-between bg-slate-800 p-3 rounded">
        <span>${p.name}</span>
        <span>${p["total points"] || 0} pts</span>
      </div>
    `
  )
  .join("");
}

loadAdminPanel();

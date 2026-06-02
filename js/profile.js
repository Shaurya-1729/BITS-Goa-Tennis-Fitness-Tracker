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
sessionStorage.getItem("playerData")
);

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
  `${player["bits id"]}_week1`

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
}
);


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

  await setDoc(
    doc(
      db,
      "weeklySubmissions",
     `${player["bits id"]}_week1`
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

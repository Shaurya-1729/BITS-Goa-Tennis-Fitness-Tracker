import { db } from "./firebase-config.js";

import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

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
  `Current Training Week: ${
    weekStart.toLocaleDateString(
      "en-GB",
      {
        day: "numeric",
        month: "short"
      }
    )
  } - ${
    weekEnd.toLocaleDateString(
      "en-GB",
      {
        day: "numeric",
        month: "short"
      }
    )
  }`;

document
  .getElementById("logoutBtn")
  .addEventListener(
    "click",
    () => {

      sessionStorage.clear();

      window.location.href =
        "login.html";
    }
  );

async function loadDashboard() {

  const playersSnap =
    await getDocs(
      collection(db, "players")
    );

  const submissionsSnap =
    await getDocs(
      collection(
        db,
        "weeklySubmissions"
      )
    );

  const players = [];

  playersSnap.forEach(doc => {
    players.push(doc.data());
  });

  const submittedIds =
    new Set();

  const submissions = [];

  submissionsSnap.forEach(doc => {

    const data = doc.data();

    if (
      doc.id.endsWith(
        "_" + weekKey
      )
    ) {

      submittedIds.add(
        data["bits id"]
      );

      submissions.push(data);
    }
  });

  const boys =
    players.filter(
      p => p.team === "boys"
    );

  const girls =
    players.filter(
      p => p.team === "girls"
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
    boysMissing.map(
      p =>
        `<li>❌ ${p.name}</li>`
    ).join("");

  document.getElementById(
    "girlsMissing"
  ).innerHTML =
    girlsMissing.map(
      p =>
        `<li>❌ ${p.name}</li>`
    ).join("");

  document.getElementById(
    "submissionList"
  ).innerHTML =
    submissions.map(
      p => `
      <div class="bg-slate-700 p-3 rounded-lg flex justify-between">

        <span>
          ${p.name}
        </span>

        <span>
          ${p["total points"] || 0}
          pts
        </span>

      </div>
    `
    ).join("");
}

loadDashboard();

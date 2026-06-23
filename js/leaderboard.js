import { db } from "./firebase-config.js";

import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

const boysContainer =
  document.getElementById("boysLeaderboard");

const girlsContainer =
  document.getElementById("girlsLeaderboard");

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

  return monday;
}
const weekKey =
  getWeekKey()
    .toISOString()
    .split("T")[0];

function getTier(points) {

  if (points >= 9) {
    return "🔥 Elite";
  }

  if (points >= 6) {
    return "⭐ Excellent";
  }

  if (points >= 4) {
    return "👍 Keep Going";
  }

  return "🔴 Needs Work";
}

function getMedal(index) {

  if (index === 0) return "🥇";
  if (index === 1) return "🥈";
  if (index === 2) return "🥉";

  return `#${index + 1}`;
}


async function loadLeaderboards() {

  // Get all players
  const playersSnap =
    await getDocs(
      collection(db, "players")
    );

  // Get all submissions
  const submissionsSnap =
    await getDocs(
      collection(db, "weeklySubmissions")
    );

  // Map current week's submissions
  const weekSubmissions = {};

  submissionsSnap.forEach(doc => {

    if (
      doc.id.endsWith(
        "_" + weekKey
      )
    ) {

      const data =
        doc.data();

      weekSubmissions[
        data["bits id"]
      ] = data;
    }
  });

  const boys = [];
  const girls = [];

  // Create leaderboard entries
  playersSnap.forEach(doc => {

    const player =
      doc.data();

    // Use this week's submission if available
    const current =
      weekSubmissions[
        player["bits id"]
      ];

    const leaderboardPlayer = {

      ...player,

      "total points":
        current?.["total points"] || 0
    };

    if (
      player.team === "boys"
    ) {

      boys.push(
        leaderboardPlayer
      );

    } else if (
      player.team === "girls"
    ) {

      girls.push(
        leaderboardPlayer
      );
    }

  });

  // Sort by weekly points
  boys.sort(
    (a, b) =>
      (b["total points"] || 0)
      -
      (a["total points"] || 0)
  );

  girls.sort(
    (a, b) =>
      (b["total points"] || 0)
      -
      (a["total points"] || 0)
  );

  boysContainer.innerHTML =
    boys.map((p, index) => {

      const medal =
        getMedal(index);

      return `
<li class="flex justify-between items-center gap-2 py-3 border-b border-slate-600">

<div class="flex items-center gap-3 flex-1 min-w-0">

<span class="font-semibold">
${medal}
</span>

<span class="truncate">
${p.name}
</span>

</div>

<div class="flex items-center gap-2">

<span class="w-8 text-center font-bold text-lg">
${p["total points"] || 0}
</span>

<span class="text-xs px-2 py-1 rounded-full bg-slate-700 whitespace-nowrap">
${getTier(p["total points"] || 0)}
</span>

</div>

</li>
`;

    }).join("");

  girlsContainer.innerHTML =
    girls.map((p, index) => {

      const medal =
        getMedal(index);

      return `
<li class="flex justify-between items-center gap-2 py-3 border-b border-slate-600">

<div class="flex items-center gap-3 flex-1 min-w-0">

<span class="font-semibold">
${medal}
</span>

<span class="truncate">
${p.name}
</span>

</div>

<div class="flex items-center gap-2">

<span class="w-8 text-center font-bold text-lg">
${p["total points"] || 0}
</span>

<span class="text-xs px-2 py-1 rounded-full bg-slate-700 whitespace-nowrap">
${getTier(p["total points"] || 0)}
</span>

</div>

</li>
`;

    }).join("");

}

const weekStart =
  getWeekKey();

const weekEnd =
  new Date(weekStart);

weekEnd.setDate(
  weekStart.getDate() + 6
);

document.getElementById(
  "currentWeek"
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

loadLeaderboards();

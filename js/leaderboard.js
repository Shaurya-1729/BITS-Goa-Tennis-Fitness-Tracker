import { db } from "./firebase-config.js";

import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

const boysContainer =
  document.getElementById("boysLeaderboard");

const girlsContainer =
  document.getElementById("girlsLeaderboard");

function getTier(points) {

  if (points >= 13) {
    return "🔥 Elite";
  }

  if (points >= 9) {
    return "⭐ Excellent";
  }

  if (points >= 4) {
    return "👍 Keep Going";
  }

  return "🔴 Needs Work";
}

async function loadLeaderboards() {

  const snapshot =
    await getDocs(collection(db, "players"));

  const boys = [];
  const girls = [];

  snapshot.forEach(doc => {

    const player = doc.data();

    if (player.team === "boys") {

      boys.push(player);

    } else if (player.team === "girls") {

      girls.push(player);
    }

  });

  boys.sort(
  (a,b) => (b["total points"] || 0) - (a["total points"] || 0)
);

girls.sort(
  (a,b) => (b["total points"] || 0) - (a["total points"] || 0)
);

  boysContainer.innerHTML =
  boys.map((p,index)=>`
  const medal =
  index === 0 ? "🥇" :
  index === 1 ? "🥈" :
  index === 2 ? "🥉" :
  `#${medal}`;
   <li class="flex justify-between items-center py-3 border-b border-slate-600">
      <span>#${index + 1} ${p.name || "Missing Name"}</span>
     <div class="flex items-center gap-3">

  <span class="font-bold text-lg">
    ${p["total points"] || 0}
  </span>

  <span class="
    text-sm
    px-3
    py-1
    rounded-full
    bg-slate-700
    whitespace-nowrap
  ">
    ${getTier(p["total points"] || 0)}
  </span>

</div>
    </div>
  `).join("");

girlsContainer.innerHTML =
  girls.map((p,index)=>`
  const medal =
  index === 0 ? "🥇" :
  index === 1 ? "🥈" :
  index === 2 ? "🥉" :
  `#${medal}`;
    <div class="flex justify-between py-2 border-b border-slate-700">
      <span>#${index + 1} ${p.name || "Missing Name"}</span>
     <div class="flex items-center gap-3">

  <span class="font-bold text-lg">
    ${p["total points"] || 0}
  </span>

  <span class="
    text-sm
    px-3
    py-1
    rounded-full
    bg-slate-700
    whitespace-nowrap
  ">
    ${getTier(p["total points"] || 0)}
  </span>

</div>
    </div>
  `).join("");

}

loadLeaderboards();

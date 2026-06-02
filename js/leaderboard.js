import { db } from "./firebase-config.js";

import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

const boysContainer =
  document.getElementById("boysLeaderboard");

const girlsContainer =
  document.getElementById("girlsLeaderboard");

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
    (a,b) => b.totalPoints - a.totalPoints
  );

  girls.sort(
    (a,b) => b.totalPoints - a.totalPoints
  );

  boysContainer.innerHTML =
    boys.map((p,index)=>`
      <div class="flex justify-between py-2 border-b border-slate-700">
        <span>#${index+1} ${p.name}</span>
        <span>${p.totalPoints}</span>
      </div>
    `).join("");

  girlsContainer.innerHTML =
    girls.map((p,index)=>`
      <div class="flex justify-between py-2 border-b border-slate-700">
        <span>#${index+1} ${p.name}</span>
        <span>${p.totalPoints}</span>
      </div>
    `).join("");

}

loadLeaderboards();

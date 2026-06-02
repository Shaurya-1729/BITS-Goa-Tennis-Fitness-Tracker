import { auth, db } from "./firebase-config.js";

import {
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut
}
from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

import {
    doc,
    getDoc
}
from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

const form = document.getElementById("loginForm");

if (form) {

    form.addEventListener("submit", async (e) => {

        e.preventDefault();

        const bitsId =
            document.getElementById("bitsId")
            .value
            .trim()
            .toUpperCase();

        const password =
            document.getElementById("password")
            .value;

        const firebaseEmail =
            `${bitsId}@tennistracker.local`;

        try {

            const userCredential =
                await signInWithEmailAndPassword(
                    auth,
                    firebaseEmail,
                    password
                );

            const playerDoc =
                await getDoc(
                    doc(db, "players", bitsId)
                );

            if (!playerDoc.exists()) {

                alert("Player not found");
                return;
            }

            const playerData =
                playerDoc.data();

            sessionStorage.setItem(
                "playerData",
                JSON.stringify(playerData)
            );

            if (
                playerData.role === "admin"
            ) {

                window.location.href =
                    "admin.html";

            } else {

                window.location.href =
                    "profile.html";
            }

        } catch (error) {

            document
            .getElementById("errorMessage")
            .classList
            .remove("hidden");

            document
            .getElementById("errorMessage")
            .innerText =
            "Invalid BITS ID or Password";
        }

    });

}

onAuthStateChanged(auth, (user) => {

    if(user){
        console.log("Logged In");
    }

});

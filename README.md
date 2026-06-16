# BITS Goa Tennis Fitness Tracker

A web-based fitness tracking and leaderboard platform developed for the BITS Goa Tennis Team to encourage accountability, consistency, and healthy competition throughout the semester.

## Overview

The BITS Goa Tennis Fitness Tracker allows players to log weekly fitness activities, monitor their progress, and compare performance through live team leaderboards. Team captains and administrators can track participation, identify missing submissions, and export semester data for analysis.

The system was designed to replace manual tracking methods with a centralized platform that is accessible from any device.

---

## Features

### Player Dashboard

* Secure player login
* Weekly fitness activity submission
* Personal fitness status and ranking tier
* View current training week
* Track cumulative points
* Add notes/comments to weekly submissions
* Progressive weekly updates allowed until the week ends

### Fitness Activities Tracked

Players can record the frequency of:

* 🏃 Weekly 2K Runs
* 💪 Upper Body Workouts
* 🦵 Lower Body Workouts
* 🎾 Court Drills

### Leaderboards

Separate live leaderboards for:

* Boys Team
* Girls Team

Features include:

* Medal rankings (🥇🥈🥉)
* Total points
* Fitness status badges

Status System:

| Points | Status        |
| ------ | ------------- |
| 9+     | 🔥 Elite      |
| 6–8    | ⭐ Excellent   |
| 4–5    | 👍 Keep Going |
| 0–3    | 🔴 Needs Work |

---

## Weekly Submission System

Each week is automatically identified using the Monday–Sunday cycle.

Players can:

* Submit activities throughout the current week
* Update entries multiple times before the week ends
* View previously entered activity counts

Once the week changes, the previous week's data remains permanently stored and contributes to semester analytics.

---

## Admin Dashboard

Administrators can:

### Monitor Team Participation

View:

* Total boys submitted
* Total girls submitted
* Missing submissions by team

### Weekly Submission Overview

For every player:

* Name
* Total points
* Runs completed
* Upper body workouts
* Lower body workouts
* Court drills
* Notes submitted

### Semester Data Export

Download semester data as CSV for:

* Record keeping
* Performance analysis
* End-of-semester reporting

Exported data includes:

* Player details
* Weekly activity records
* Submission timestamps
* Status rankings
* Notes

---

## Data Storage

### Firebase Firestore

The application uses Firestore to store:

#### Players Collection

```json
{
  "bits id": "2023XXXXXX",
  "name": "Player Name",
  "team": "boys",
  "role": "player",
  "total points": 0
}
```

#### Weekly Submissions Collection

```json
{
  "bits id": "2023XXXXXX",
  "name": "Player Name",
  "team": "boys",
  "runs": 2,
  "upper": 1,
  "lower": 2,
  "court": 3,
  "notes": "Completed workouts throughout the week",
  "total points": 8,
  "submittedAt": "timestamp"
}
```

---

## Technology Stack

### Frontend

* HTML5
* Tailwind CSS
* JavaScript (ES Modules)

### Backend

* Firebase Authentication
* Firebase Firestore

### Hosting

* Netlify

---

## Project Structure

```text
BITS-Goa-Tennis-Fitness-Tracker/
│
├── index.html
├── login.html
├── profile.html
├── README.md
│
└── js/
    ├── auth.js
    ├── firebase-config.js
    ├── leaderboard.js
    └── profile.js
```
---

## Workflow

### Player

1. Login
2. Open dashboard
3. Enter weekly activities
4. Add optional notes
5. Save progress throughout the week
6. View ranking and status

### Admin

1. Login with admin account
2. View team participation
3. Monitor submissions
4. Review activity breakdowns
5. Export semester data

---

## Future Enhancements

Planned features include:

* Semester analytics dashboard
* Hall of Fame section
* Activity-specific leaders
* Consistency awards
* Performance trend analysis
* Downloadable analytics reports
* Optional activity proof submission
* Enhanced visual statistics

---

## Motivation

The platform was built to encourage:

* Consistent fitness habits
* Team accountability
* Transparent progress tracking
* Healthy competition
* Data-driven performance monitoring

for members of the BITS Goa Tennis Team throughout the semester.

---

## Author

Developed for the BITS Goa Tennis Team by Shaurya Awasthi (Captain 2025-2026).

Built using Firebase, JavaScript, Tailwind CSS, and Netlify.

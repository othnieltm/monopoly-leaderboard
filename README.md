# House Rules Monopoly Leaderboard

A weekly Monopoly leaderboard with 3 points for first place, 2 for second, and 1 for third. Player names, game history, and scores are stored in the Cloud Firestore document `leaderboard/state`.

## Firebase setup

1. In the Firebase console for `avengersmonopoly`, create a Cloud Firestore database.
2. Install the Firebase CLI and sign in with `firebase login`.
3. From this folder, deploy the website and Firestore rules with `firebase deploy --project avengersmonopoly`.

The first browser visit creates `leaderboard/state` in Firestore using the contents of `data.json`. Later visits use the Firestore document. Keep `data.json` available as the initial seed when deploying the site.

The provided rules allow public reads and writes because the app has no login. Anyone who can open the site can change or erase the leaderboard. Add Firebase Authentication and restrict the rules before using this for private or important data.

## Run locally

Requires Node.js 18 or newer. Run `npm start` and open `http://localhost:3000`. The local server serves the app and `data.json`; Firestore still stores changes, so the browser needs internet access and the Firestore database and rules must be set up.

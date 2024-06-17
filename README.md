# Jira and Beyond

## BizStream Standards

Version: **[1.1](https://docs.google.com/document/d/1gsFS6rzvgdNrrkESBRAByd7aLrEFJd1YS6DNdE1zH9g)**

## Building the UI

To build the UI project, open the workspace file `aggbid.code-workspace` that lives in the root of the project. Once the project is open in VSCode, open a terminal window and run `npm ci`. This will install all of the necessary packages without modifying the `package.json` and `package-lock.json`.

Once the `npm ci` command has completed, run `npm run serve` to build the project or run `npm run build` to build the project for production.

## Development Notes

In order to develop and test in Chrome with the Geolocation API you need to do the following.

- Navigate to `chrome://flags/` in Chrome.
- Search for `Insecure origins treated as secure`.
- Enable the flag and add `http://localhost:8080,https://localhost:8080` to the text box. Change your port if needed.

## Firebase Cloud Function

This project makes use of Firebase Cloud Functions. Documentation can be found in the following directory `/bzs-aggbid/src/cloud-functions`.

Do not use the Vue `@` alias within files in the `constants`, `enums`, and `types` directory. The `@` alias causes issues for deploying your cloud functions.


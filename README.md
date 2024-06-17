# Jira and Beyond

## BizStream Standards

Version: **[1.1](https://docs.google.com/document/d/1gsFS6rzvgdNrrkESBRAByd7aLrEFJd1YS6DNdE1zH9g)**

## Building the UI

Once the project is open in VSCode, open a terminal window and run `npm ci`. This will install all of the necessary packages without modifying the `package.json` and `package-lock.json`.

Once the `npm ci` command has completed, run `npx webpack` to build the project.

## Development Notes

In order to develop and test in Chrome.

- Navigate to `chrome://extensions/` in Chrome.
- Enable Developer Mode in the upper right
- Click on Load unpacked and select the project root folder

## Other Notes

Every time you make a change you will have to rerun `npx webpack` because there is currently no watcher command to update the build folder


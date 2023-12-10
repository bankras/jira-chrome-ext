# Jira Chrome Extension
![workflow](https://github.com/bankras/jira-chrome-ext/actions/workflows/main.yml/badge.svg)

This project is intended to make it easy to quickly deeplink into your jira instance. By specifying either issue key or project name a new tab is opened in your browser with that target.

## Available Scripts

In the project directory, you can run:

### `npm run build`

Builds the app for production to the `dist` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

## Installing

1. Go to [chrome://extensions](`chrome://extensions`)
2. Enable `development mode`
3. `Load unpacked` and select the `/dist` folder
4. Open extension will show the config page
5. Fill in your Jira host and Jira username
6. On the [chrome://extensions](`chrome://extensions`) page, open the hamburger menu and select `keyboard shortcuts`
7. Find the extension and give it a shortkey (example Cmd+J)
8. Ready to go!

## Releasing

1. Make sure versions are updated in [manifest.json](public/manifest.json) and [package.json](./package.json)
2. Commit everything to a branch and let to PR be merged.
3. Create the binaries by running `npm run build` followed by `tar -zcvf ../jira-chrome-ext.tgz .` in the dist folder.
4. Create a new release on GitHub and upload the binaries.

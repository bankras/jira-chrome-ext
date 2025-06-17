# Jira Chrome Extension
![workflow](https://github.com/bankras/jira-chrome-ext/actions/workflows/main.yml/badge.svg)
[![Coverage Status](https://coveralls.io/repos/github/bankras/jira-chrome-ext/badge.svg?branch=main)](https://coveralls.io/github/bankras/jira-chrome-ext?branch=main)
![Version](https://img.shields.io/github/package-json/v/bankras/jira-chrome-ext)
![Last Commit](https://img.shields.io/github/last-commit/bankras/jira-chrome-ext)

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

Releases are automated through GitHub Actions when tags are pushed.

### Automated Release Process

1. Update versions in [manifest.json](public/manifest.json) and [package.json](./package.json)
2. Commit changes to main branch
3. Create and push a version tag:
   ```bash
   git tag v1.0.1
   git push origin v1.0.1
   ```
4. GitHub Actions will automatically:
   - Run tests and linting
   - Build the extension
   - Create a release package (.tgz)
   - Create a GitHub release with the package attached

### Manual Release Process

If you need to create a release manually:

1. Update versions in [manifest.json](public/manifest.json) and [package.json](./package.json)
2. Build: `npm run build`
3. Package: `tar -zcvf jira-chrome-ext-v1.0.1.tgz -C dist .`
4. Create GitHub release with `gh release create` or through the web interface

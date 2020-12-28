# GRID

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![PR](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://stash.teslamotors.com/projects/EF/repos/energy-project-management/pull-requests)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://stash.teslamotors.com/projects/EF/repos/energy-project-management/commits)
[![contrib](https://img.shields.io/badge/contributions-welcome-orange.svg)](https://stash.teslamotors.com/projects/EF/repos/energy-project-management/browse)
[![Mattermost](https://img.shields.io/badge/-mattermost-blue)](https://teamchat.tesla.com/tesla/channels/ask-phoenix)
[![Build Status](https://atmjenkins02.teslamotors.com/buildStatus/icon?job=ef-energy-project-management/master)](http://atmjenkins02.teslamotors.com/job/ef-energy-project-management/job/master/)

## Setup

* Ensure that node version is <strong>12</strong>. Recommend use `nvm`

1. Clone two repos
```
git clone https://stash.teslamotors.com/projects/EF/repos/energy-project-management/browse

git clone https://stash.teslamotors.com/projects/EF/repos/fulfillment-graphql-server/browse
```

2. Get `.env` from team member

3. Run graphql server + GRID with
```
make run
```

## Developer Guide

This project uses a database related architect to render components. Please ask the team for more info & DB access.

## Editor Configuration

This project provides an editor configuration file via `.editorconfig`. To take advantage of it, please install the [EditorConfig](https://editorconfig.org) plugin for your editor of choice.

## Vault Configuration

This project uses Vault to store environment variables. When creating new environment variables, values need to be added to 

1. .env
2. .env.example
3. .env.template

These three files would be in the root folder. Follow the convention in those files to add/modify values.

Before deployment, environment variables also need to be added to the deployed environment beforehand. Here is the list of domains:

1. Dev Vault
2. UAT Vault
3. QA Vault
4. Stage US/CN Vault
5. PROD US Vault
6. PROD CN Vault

Contact Grid team for .env value and Vault specific URL locations.

## VSCode Debug:
* Make sure to install [chrome debugging](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome) 

* You can launch vscode debugging by using option `full-stack-chrome`. 
 More info here: [Run Mode](https://code.visualstudio.com/docs/editor/debugging#_run-menu)

* Tutorial on how to set breakpoints [link](https://code.visualstudio.com/docs/editor/debugging#_breakpoints)

## Troubleshoot

Please contact [#ask-phoenix](https://teamchat.tesla.com/tesla/channels/ask-phoenix) if you see any issues.

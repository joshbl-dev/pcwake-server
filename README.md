<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456

[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript backend for
pcwake-server

# Setup

## Pre-requisites

- Node.js
- Yarn
- Etherwake
- Git
- Cloudflared (optional)

## Systemd Service

To set up automatic restarts and logging, create a systemd service file.

```bash
sudo nano /etc/systemd/system/pcwake-server.service
```

```
[Unit]
Description=PC Wake Server
RequiresMountsFor=/home/<user>
After=network-online.target
Wants=network-online.target

[Service]
WorkingDirectory=/home/<user>/<project_location>
User=<user>
Group=<user>
ExecStart=/usr/bin/sudo yarn start:rasp

Restart=always
RestartSec=10
[Install]
WantedBy=multi-user.target
```
```bash
sudo systemctl enable pcwake-server.service
```

Interact with the service with
`sudo systemctl <status/start/stop/restart> pcwake-server.service`
View the logs with `sudo journalctl -u pcwake-server.service -f`

## Installation

```bash
$ yarn
```

## Running the app

```bash
sudo systemctl start pcwake-server.service
```

## Cloudflared tunnel

Cloudflared tunnel is a secure approach to sending your http requests to your server.

To setup a tunnel follow these directions: https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/get-started/create-remote-tunnel/

For tunnel service choose `Type: HTTP` and `URL: localhost:<port>`

```bash
sudo nano /etc/systemd/system/cloudflared.service
```
```
[Unit]
Description=cloudflared
After=network-online.target
Wants=network-online.target

[Service]
TimeoutStartSec=0
Type=notify
ExecStart=screen -S tunnel -D -m /usr/local/bin/cloudflared --no-autoupdate tunnel run --token <token>
Restart=on-failure
RestartSec=5s

[Install]
WantedBy=multi-user.target
```
```bash
sudo systemctl enable cloudflared.service
```
```bash
sudo systemctl start cloudflared.service
```

You can further secure your tunnel by configuring your cloudflared rules to only accept requests from systems on your WARP network.

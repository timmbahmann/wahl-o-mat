# Wahl-o-Mat
[![Build Status](https://travis-ci.org/timmbahmann/wahl-o-mat.svg?branch=master)](https://travis-ci.org/timmbahmann/wahl-o-mat)

## Dev Mode
- Run `npm install` to install necessary dependencies.
- **Backend:** run `npm run` on Linux/WSL or `npm run dev:win` if you're in a Windows console. Both commands only start the backend server (frontend files won't be updated without a restart)
- **Frontend:**
	- run `npm run frontend` (or `npm run frontend:win` for Windows consoles) to build the frontend once. Files won't update after a site refresh without a new build
	- run `npm run frontend:hot` in a Linux/WSL console to start a separate frontend server with Hot Module reload (site will build and update immadiately once you save a file). HMR is currently not possible on Windows.
	- running `npm run frontend:win:watch` in a Windows console will give you limited reload possibilities. Your browser won't update automatically, but you can reload it after you made changes and they will be displayed without the need for a new build.
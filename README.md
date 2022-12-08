# HTML5 Game Development Workflow Setup
### Cheat Sheet
### GAME2050 Game Programming I

The workflow setup to develop HTML5 games takes a number of steps;
especially if you intend on using Typescript as your language of choice.
While we will setup your workflow in the lab together, most of you will
need to do the same setup on your home/personal machines. This cheat
sheet walks you through the process.

**Step 1:**

Install Node.js. Node.js is required to be able to use NPM (Node Package
Manager) which is a tool that downloads all the libraries and tools
needed to develop our HTML5 games.

-   Go to <https://nodejs.org/> and download / install the Node.js LTS
    version (recommended for most users)

-   You only need to do this once

**Step 2:**

Install VS Code / vscode-icons extension. This is the code editor we use
in the course -- and is currently the industry standard for development.

-   Go to <https://code.visualstudio.com/> and download / install VS
    Code

-   Go to the extensions panel in VS Code and install the vscode-icons
    extension (search for it by name). This adds better looking and more
    descriptive icons to the explorer panel of VS Code.

-   You only need to do this once

**Step 3:**

Install project dependencies. The boilerplate project folder needs loads
of tools and JS libraries downloaded in order to run your game.

-   Open your project folder in VS Code (NOT a single file). You MUST
    open the project folder and not just a single file.

-   Open the terminal in VS Code (CTRL + \~) and enter the command:

> npm install

-   NPM will download all the required dependencies and store them in
    the /node_modules folder in your project folder. It is quite big!
    You can delete this folder at any time and rebuild it later by
    re-entering the "npm install" command

-   Do this for each new game project

**Step 4:**

Run your game.

-   In the same opened terminal in VS Code enter the command:

> npm run game

-   this will spin up a local server to temporary host your game, open
    your browser at localhost:3000, and run your HTML5 game in that
    browser

-   under the hood there is a lot happening, most importantly is
    converting your TS files to JS files (transpiling) and placing them
    into /build as one single JS file

-   It is recommended that you disable the browser's caching. In the
    chrome browser open the developer tools with keystroke CTRL +
    SHIFT + J. Go to the network tab and set "Disable Cache" to checked

-   you can now begin developing your game. On every save of any file in
    the /html, /src, /lib folders your game will restart in the browser
    automatically

### Week 10 — November 22, 2026
**Event Plan**
- **User story:** As a student practicing my presentation, I want to type how many minutes I have on the home page and see a live countdown start as soon as I click Start Practice, so that I can practice pacing my slides under real time limits.
- **The event:** Typing in the practice time number box on index.html (the input event). It reads event.target.value on every keystroke so the page checks the number right away without needing a separate submit button.
- **State:** The page remembers two new things: targetMinutes (the number of minutes typed on index.html, saved in localStorage so practice.html can read it) and secondsLeft (the remaining seconds counting down on practice.html, starting from the user's typed minutes or defaulting to 15 minutes). 
- **My function:** isValidTimer(minutesValue) answers the question, "Is the typed number between 1 and 60 minutes?" It takes what the user typed as a parameter, removes extra spaces, and returns true or false.

**What changed:**
- Added an input listener to the timer box on index.html so it saves the typed minutes and shows a live confirmation or helper message underneath.
- Connected the saved minutes to practice.html so the Time left display in the header counts down every second once the practice session starts.

**Why redraw on every event:** Instead of changing the timer text directly inside the typing listener or the countdown timer, those events only update the saved state numbers (targetMinutes and secondsLeft) and call render(). Redrawing the page from state every time guarantees that the input box, the helper message on index.html, and the countdown clock on practice.html always stay in sync. 

**What was hard, and what I tried:** Connecting two separate HTML pages (index.html and practice.html) with one shared script.js file was tricky at first because moving to a new page resets the script, and some elements only exist on one page and not the other. To fix this, I used localStorage to pass the timer minutes from index.html to practice.html, added simple if checks inside render() so it only updates elements that exist on the active page, and tested isValidTimer in the browser Console before connecting it to the countdown.

**What happened when I tried to break it:**
- I tested isValidTimer in the Console with 5, numbers with extra spaces, an empty box, 0, and 90—it returned true for numbers between 1 and 60 and false for empty, zero, or numbers over 60.
- On index.html, I typed and deleted numbers quickly in the timer box; whenever I cleared the box or typed 0, the message switched cleanly to "Enter a practice time between 1 and 60 minutes." instead of showing an error, and clicking Start Practice safely defaulted to a 15-minute countdown.
- On practice.html, I tested a 1-minute timer and watched it count down from 1:00 to 0:00 (Time's up!) without going into negative numbers.

**What I learned or changed my mind about:** At first, I thought the timer setup and the challenge card needed to be on the same page. Separating the setup on index.html from the live practice session on practice.html makes the app feel much closer to a real presentation tool while still keeping all screen updates organized inside one render() function.

**Question for Joey:** Right now, my slides still use placeholder text like Slide 1 and Slide 2. What is the simplest way to let users upload real slide images or show their practice summary on report.html using the same state and render pattern?

**Next week's goal:** Make the presentation setting buttons on index.html (Class presentation, Pitch, Thesis / Research, Others) save the user's choice so practice.html updates its background image, and display a session summary on report.html.

**AI use:** Used AI to plan how to pass the timer value from index.html to practice.html using localStorage, organize the isValidTimer function and countdown timer inside my render() pattern.

### Week 9 — November 15, 2026
**Render Plan**
- **User story:** As a student practicing my presentation, I want a random challenge card to pop up automatically during my practice session, with a Shuffle button in case the prompt doesn't fit my situation, so that I can test my adaptability without interrupting my flow.
- **State:** The page remembers the position number of the challenge displayed. It starts at a random position number.
- **What changes it:** Clicking the "Shuffle" button picks a new random challenge card, and calls render(). 
- **What render() draws:** Clears the challenge container on practice.html and rebuilds the active challenge card from the `challenges` array, while also redrawing the current slide heading and counter.
- **The if inside the loop:** As the loop goes through each item in the challenges list, it checks `if (index === currentChallengeIndex)` to decide whether that challenge's position matches the currently picked card—if it matches, `render()` builds and displays that single challenge card inside `#challenge-display`; if not, it skips it.
- **What else render() works out:** Calculates the challenge indicator text (e.g., `"Challenge #2 of 6"`), computes `"Slide X of 15"`, updates the status message, and hides the `"Next Slide"` button once `currentSlide === totalSlides`.

**What changed:**
- Added a `render()` function in `script.js` that draws the active challenge card on `practice.html` directly from the `challenges` array based on `currentChallengeIndex`.
- Added a **Shuffle** button to `practice.html` so users can swap out a random challenge if it doesn't apply to their presentation, and called `render()` on page load so a challenge pops up automatically.

**Patching vs. rendering:**
Last week, my click code manually updated individual pieces of text and styles on the page one by one every time a use clicked next page. this week, I use render() function to help with the challenge card and also the slide count.

**What was hard, and what I tried:**
I brainstormed about the possible use cases for the render() function in my project. It was hard for me when it comes to combining all the functions i've built and make decisions about how to connect my slide counter, challenge array, and randomizer into one smooth flow. I think referring back to my user story and original plans as well as breaking the logic down in my plan first really helped.

**What happened when I tried to break it:**
The slide viewer still uses placeholder text instead of connecting to real presentation slides, and I haven't finished building the part where challenge.html pops up randomly in the middle of a `practice.html` session. 

**What I learned or changed my mind about:**
I initially thought `render()` would overcomplicate my project since I just wanted a challenge to pop up automatically and shuffle on click. Seeing how calling `render()` once on load and again on click handled both behaviors with one function showed me why separating state changes from DOM drawing makes the code cleaner and easier to debug.

**Question for Joey:**
What is the simplest way in JavaScript to have a challenge pop up randomly during a `practice.html` session (or redirect to `challenge.html` on a random slide)

**Next week's goal:**
update presentation background and timer carry over into the practice session.

**AI use:**
Used Gemini to brainstorm how to fit my automatic challenge popup and Shuffle button idea into the `render()` pattern, and trouble-shoot my code.

## **Instructions**

### **Step-by-Step: Getting Set Up**


**1\. Click the green "Use this template" button**

This creates a brand new repository under your own GitHub account, pre-loaded with the starting files.

**2\. Name your repository**

Use this naming convention:

`nyu-f26-lastname-firstname`

**3\. Click "Create repository from template"**

GitHub copies the files and takes you to your new repo page.

**4\. Click the green "Code" button → "Create Codespace"**

**5\. Wait about 15 minutes while it boots up**

This is normal. Codespaces is spinning up a virtual computer for you in the cloud, installing dependencies, and opening VS Code in your browser. Grab a sip of water while it loads.

**6\. You're ready**

When the browser tab opens to VS Code, open the `style.css` file in the file explorer on the left. The base styles are already written for you, and each rule has **STEP** comments showing where the grid properties go. That's your starting point — we'll type the grid code together in class, one step at a time.

---

## **GitHub Codespaces — A Brief Guide**

### **What Is It?**

Codespaces is a development environment that runs entirely in your browser. Instead of installing software on your own computer, you get a virtual computer in the cloud — pre-configured and ready to code — that you access through a web browser. Microsoft (which owns GitHub) hosts it.

### **What It Saves Us From**

Normally, getting a development environment set up requires installing and configuring a bunch of tools:

* A code editor (VS Code)  
* A terminal (command line)  
* Git (version control)  
* Node.js, Python, or whatever runtime the project needs  
* Extensions, themes, settings

Each one of these can break in unique ways depending on your operating system, your computer's permissions, or just bad luck. **Codespaces eliminates all of that.** You click one button and you're in a fully working environment. No "it works on my machine" problems.

### **How It Works (High Level)**

1. A project lives in a GitHub repository.  
2. You click the green **Code** button and select **Open with Codespaces**.  
3. GitHub spins up a lightweight virtual machine running Linux, installs the project's dependencies automatically, and opens a browser-based version of VS Code.  
4. You code, save, and commit just like you would on your local machine.  
5. When you're done, you stop the Codespace. Next time you come back, everything is exactly where you left it.

The environment is defined by a file called `devcontainer.json` (or `.devcontainer/`) in the repository. It's like a recipe that tells GitHub "this project needs X, Y, and Z."

### **The Catch: It's Slow to Start (And Why)**

A cold start takes **1–3 minutes**. Here's why:

* **A new virtual machine has to boot.** Codespaces isn't "running" until you open it. There's no always-on computer — one is created for you on demand. That means spinning up an OS from scratch.  
* **Your dependencies install.** If the project requires packages or libraries, Codespaces runs the install process when it starts. This is the same `npm install` or `pip install` you'd run locally — it just happens automatically.  
* **Extensions and settings sync.** VS Code loads your extensions, themes, and preferences from your GitHub account.

**Once it's running, it's fast.** The delay is only on the first launch of the day (or after you've manually stopped the Codespace). If you keep it open between sessions, there's no wait.

### **Tips**

* **Don't close your Codespace mid-session.** Just leave the tab open. If you close it, stop the Codespace from the GitHub dashboard so it doesn't eat into your monthly usage hours.  
* **Your work is saved automatically.** Even if the Codespace stops, the files are stored on GitHub. You won't lose anything.  
* **You get a fixed number of free hours per month** through the GitHub Student Developer Pack. A cold start uses some of those hours just booting up, so it's worth keeping one Codespace alive while you're actively working.  
* **If you need to work offline,** you can always install VS Code and Git locally instead but it does take some set up — Codespaces is a convenience, not a requirement.

### Weekly Documentation & Reflection

### Mockup Link
(https://drive.google.com/file/d/1Imd3wAeQElK4PI4scnKYGs9DMGUVvE3k/view?usp=sharing)

### Data Displayed
I created a challenge,js containing 8 distinct presentation practice scenarios (e.g., *Slides Break Down*, *Blank Moment*, *Confused Audience*). Each item is an object structured with a `name` and a `description`.

### How JavaScript Creates the HTML
Using the array and DOM manipulation methods learned in class:
1. JavaScript references the `#challenge-gallery` container in `challenge.html`.
2. A `forEach` loop iterates through the `challenge` array.
3. Inside the loop, `document.createElement("div")` creates a container card with the class `challenge`.
4. It creates `<h2>` and `<p>` elements, populates their text using `.textContent`, and appends them into the `challenge` card.
5. Finally, each completed card is appended to `#challenge-gallery` using `.appendChild()`.

### Challenges Encountered
Currently, the script displays all 8 challenge cards on the page simultaneously to fulfill the assignment's dynamic rendering requirements. However, this does not reflect my final visual and interactive design intent. 

My goal for the app is to display only one challenge card at a time as a flashcard/prompt. In the upcoming iteration, I plan to refactor the display logic so that clicking the "Doesn’t make sense? Shuffle" button picks a single random challenge from the array and renders only that card on the screen.

### **Structure Audit — [10.26]**

### **Fixed Today**

1. Resolved script linking on challenge.html so JavaScript loads and executes properly.
2. Created and linked the main style.css stylesheet across all HTML pages.

### **Still Missing (Building Before the Layout Assignment)**

1. Slide mockups and presentation background image assets.
2. Random challenge card pop-up functionality during active practice.

### **Technical Challenges / Questions**

1. **Dynamic Challenge Cards:** How to dynamically overlay or insert the challenge card onto the practice screen rather than navigating to a separate HTML page.
2. **Interactive Button Logic:** How to triggering file uploads for slides and shuffling random challenge prompts.


### **Weekly Summary of Changes — Layout & CSS Grid**

1. Add css layout for the home page
2. Used Flexbox to align header titles and countdown timer.
3. Linked Mooli and DM Sans in HTML with `sans-serif` fallback declarations.
4. Added media block at the bottom of style.css. Transformed desktop multi-column grids into single-column stacks. 

### **Assignment8-Weekly Updates**

1. Added Progress Counter: Integrated a dynamic slide counter (`Slide X of 15`) and updated `practice.html` to follow the change.
2. State-Driven Interactions: mapping out the steps of change and what the user will see in `script.js`.
3. Conditional Program Response: Programmed the button to automatically change its label to `"Finish Practice"` and apply a highlighted completion style once the user reaches slide 15 (the final slide).

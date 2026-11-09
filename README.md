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

### **What Was Done

- **Added Progress Counter:** Integrated a dynamic slide step counter (`Slide X of 15`) and interactive state-tracking logic into `practice.html`.
- **State-Driven Interactions:** Implemented state management using `currentSlide` and `totalSlides` in `script.js` following the classroom pattern: **User Action** → **State Change** → **Page Update** → **Program Response**.
- **Script Error Fix & Guarding:** Wrapped page-specific elements (like `gallery` and `nextButton`) in conditional checks (`if (nextButton)`) so JavaScript runs without errors across all HTML pages.
- **Conditional Program Response:** Programmed the button to automatically change its label to `"Finish Practice"` and apply a highlighted completion style once the user reaches slide 15.


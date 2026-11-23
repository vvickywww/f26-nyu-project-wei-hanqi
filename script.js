// 1. STATE VARIABLES
let currentSlide = 1;
const totalSlides = 15;

// Start at a random challenge index when challenge.html loads
let currentChallengeIndex = 0;
if (typeof challenges !== "undefined" && challenges.length > 0) {
  currentChallengeIndex = Math.floor(Math.random() * challenges.length);
}

// 2. DOM ELEMENTS

const challengeDisplay = document.getElementById("challenge-display");
const challengeCount = document.getElementById("challenge-count");
const shuffleButton = document.getElementById("shuffle-button");

const slideCount = document.getElementById("slide-count");
const slideTitle = document.getElementById("slide-title");
const nextButton = document.getElementById("next-button");
const message = document.getElementById("message");

// 3. RENDER FUNCTION

// render: draws the active challenge card and updates slide progress from state
function render() {
  // 1. Redraw the active challenge card on challenge.html (replaces old #challenge-gallery loop)
  if (challengeDisplay && typeof challenges !== "undefined") {
    challengeDisplay.innerHTML = "";

    challenges.forEach(function (challenge, index) {
      if (index === currentChallengeIndex) {
        const challengeDiv = document.createElement("div");
        challengeDiv.className = "challenge";

        const challengeName = document.createElement("h2");
        challengeName.textContent = challenge.name;

        const challengeDesc = document.createElement("p");
        challengeDesc.textContent = challenge.description;

        challengeDiv.appendChild(challengeName);
        challengeDiv.appendChild(challengeDesc);

        challengeDisplay.appendChild(challengeDiv);
      }
    });

    if (challengeCount) {
      challengeCount.textContent =
        "Challenge #" + (currentChallengeIndex + 1) + " of " + challenges.length;
    }
  }

  // 2. Redraw slide progress and Next Slide button from state
  if (slideCount) {
    slideCount.textContent = "Slide " + currentSlide + " of " + totalSlides;
  }

  if (slideTitle) {
    slideTitle.textContent = "Slide " + currentSlide;
  }

  if (nextButton && message) {
    if (currentSlide === totalSlides) {
      nextButton.style.display = "none";
      message.textContent =
        "You reached the last slide! Click End Practice to view your report.";
    } else {
      nextButton.style.display = "inline-flex";
      message.textContent =
        "Keep going! You are currently on slide " + currentSlide + ".";
    }
  }
}

// 4. CLICK HANDLERS (Only change state and call render)

// Pick a new random challenge index (avoiding back-to-back repeats)
if (shuffleButton) {
  shuffleButton.addEventListener("click", () => {
    if (typeof challenges !== "undefined" && challenges.length > 1) {
      let nextIndex = Math.floor(Math.random() * challenges.length);
      while (nextIndex === currentChallengeIndex) {
        nextIndex = Math.floor(Math.random() * challenges.length);
      }
      currentChallengeIndex = nextIndex;
    }
    render();
  });
}

// Advance slide state
if (nextButton) {
  nextButton.addEventListener("click", () => {
    if (currentSlide < totalSlides) {
      currentSlide = currentSlide + 1;
    }
    render();
  });
}

// Homepage: start practice with the selected duration
if (startPracticeLink) {
  startPracticeLink.addEventListener("click", (event) => {
    if (!isValidPracticeTime(practiceMinutes)) {
      event.preventDefault();
      render();
      return;
    }
    const selectedTime = Number(practiceMinutes);
    window.location.href =
      "practice.html?minutes=" + selectedTime;
  });
}

// 6. START COUNTDOWN ON PRACTICE PAGE
if (timerDisplay) {
  // Show the initial countdown
  render();
  const timerInterval = setInterval(() => {
    if (remainingSeconds > 0) {
      remainingSeconds--;
      render();
    }
    if (remainingSeconds === 0) {
      clearInterval(timerInterval);
    }
  }, 1000);
}
// 7. INITIAL RENDER
render();

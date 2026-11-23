// Is the typed timer value a valid number between 1 and 60 minutes? Returns true or false.
function isValidTimer(minutesValue) {
  const cleanText = String(minutesValue).trim();
  const numericMinutes = Number(cleanText);
  return (
    cleanText !== "" &&
    !Number.isNaN(numericMinutes) &&
    numericMinutes >= 1 &&
    numericMinutes <= 60
  );
}

// currentSlide: tracks which slide the presenter is currently viewing
let currentSlide = 1;
const totalSlides = 15;

// challengeSlide: picks a random slide between 2 and 14 where the interruption appears
const challengeSlide = Math.floor(Math.random() * (totalSlides - 2)) + 2;

// currentChallengeIndex: which interruption the presenter is practicing right now
let currentChallengeIndex = 0;
if (typeof challenges !== "undefined" && challenges.length > 0) {
  currentChallengeIndex = Math.floor(Math.random() * challenges.length);
}

// targetMinutes: stores the practice time in minutes typed on index.html
let targetMinutes = localStorage.getItem("targetMinutes") || "";

// secondsLeft: remaining countdown seconds on practice.html (defaults to 15 minutes)
let secondsLeft = 15 * 60;
if (isValidTimer(targetMinutes)) {
  secondsLeft = Number(targetMinutes.trim()) * 60;
}

// Find elements across index.html and practice.html
const practiceTimeInput = document.getElementById("practice-time");
const timerStatus = document.getElementById("timer-status");
const timeDisplay = document.getElementById("time-display");

const challengeDisplay = document.getElementById("challenge-display");
const challengeCount = document.getElementById("challenge-count");
const shuffleButton = document.getElementById("shuffle-button");

const slideCount = document.getElementById("slide-count");
const slideTitle = document.getElementById("slide-title");
const nextButton = document.getElementById("next-button");
const message = document.getElementById("message");

// render() draws the timer, challenge popup, and slide progress from state
function render() {
  // 1. Keep the input box on index.html synced with saved state
  if (practiceTimeInput && practiceTimeInput.value !== targetMinutes) {
    practiceTimeInput.value = targetMinutes;
  }

  // 2. Show confirmation or empty-box guidance on index.html using isValidTimer()
  if (timerStatus) {
    if (isValidTimer(targetMinutes)) {
      timerStatus.textContent =
        "Timer set to " + targetMinutes.trim() + " minutes.";
    } else {
      timerStatus.textContent =
        "Enter a practice time between 1 and 60 minutes.";
    }
  }

  // 3. Draw the live MM:SS countdown in the header of practice.html
  if (timeDisplay) {
    const minutes = Math.floor(secondsLeft / 60);
    const seconds = secondsLeft % 60;
    const formattedSeconds = seconds < 10 ? "0" + seconds : seconds;

    if (secondsLeft === 0) {
      timeDisplay.textContent = "0:00 (Time's up!)";
    } else {
      timeDisplay.textContent = minutes + ":" + formattedSeconds;
    }
  }

  // 4. Draw the active challenge card and reveal it once currentSlide reaches challengeSlide
  if (challengeDisplay && typeof challenges !== "undefined") {
    challengeDisplay.innerHTML = "";
    challengeDisplay.hidden = currentSlide < challengeSlide;

    if (challengeCount) {
      challengeCount.hidden = currentSlide < challengeSlide;
    }
    if (shuffleButton) {
      shuffleButton.hidden = currentSlide < challengeSlide;
    }

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

  // 5. Draw slide progress and Next Slide button from state
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

// "input" event: reads event.target.value from #practice-time on index.html and redraws
if (practiceTimeInput) {
  practiceTimeInput.addEventListener("input", (event) => {
    targetMinutes = event.target.value;
    localStorage.setItem("targetMinutes", targetMinutes);
    render();
  });
}

// Start the 1-second countdown automatically when practice.html loads
if (timeDisplay) {
  const countdownInterval = setInterval(() => {
    if (secondsLeft > 0) {
      secondsLeft = secondsLeft - 1;
      render();
    } else {
      clearInterval(countdownInterval);
      render();
    }
  }, 1000);
}

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

// Initial render on page load
render();

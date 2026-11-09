// ==========================================================================
// 1. CHALLENGE GALLERY LOGIC (runs only on pages with #challenge-gallery)
// ==========================================================================
const gallery = document.getElementById("challenge-gallery");

// Only run gallery creation if the gallery container AND data array exist
if (gallery && typeof challenges !== "undefined") {
  challenges.forEach(function(challenge) {
    const challengeDiv = document.createElement("div");
    challengeDiv.className = "challenge";

    const challengeName = document.createElement("h2");
    challengeName.textContent = challenge.name;

    const challengeDesc = document.createElement("p");
    challengeDesc.textContent = challenge.description;

    challengeDiv.appendChild(challengeName);
    challengeDiv.appendChild(challengeDesc);

    gallery.appendChild(challengeDiv);
  });
}


// ==========================================================================
// 2. SLIDE COUNTER LOGIC (runs on practice.html)
// ==========================================================================

// STEP 3: Create the state
let currentSlide = 1;
const totalSlides = 15;

// STEP 4: Find the elements on the page
const slideCount = document.getElementById("slide-count");
const slideTitle = document.getElementById("slide-title");
const nextButton = document.getElementById("next-button");
const message = document.getElementById("message");

// STEP 5: Add event listener
if (nextButton) {
  nextButton.addEventListener("click", () => {
    console.log("Button clicked! Old slide:", currentSlide);

    // 1. Change state
    if (currentSlide < totalSlides) {
      currentSlide = currentSlide + 1;
    }

    console.log("New slide:", currentSlide);

    // 2. Update page elements
    if (slideCount) {
      slideCount.textContent = "Slide " + currentSlide + " of " + totalSlides;
    }
    if (slideTitle) {
      slideTitle.textContent = "Slide " + currentSlide;
    }

    // 3. Program response
    if (currentSlide === totalSlides) {
      nextButton.textContent = "Finish Practice";
      nextButton.classList.add("btn-finish");
      if (message) message.textContent = "You reached the last slide!";
    } else {
      if (message) message.textContent = "Keep going! You are currently on slide " + currentSlide + ".";
    }
  });
}

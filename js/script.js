document.addEventListener("DOMContentLoaded", () => {
  const main = document.querySelector("main");

  // Joy
  const butterflies = document.querySelectorAll(".butterfly");
  let joyIntervalId = null;
  let fearIntervalId = null;
  let loveIntervalId = null;

  const positions = Array.from(butterflies).map((butterfly) => ({
    top: butterfly.offsetTop,
    left: butterfly.offsetLeft,
  }));

  function getRandomSidePosition() {
    return Math.random() < 0.5
      ? Math.floor(Math.random() * 10) + 0
      : Math.floor(Math.random() * 10) + 85;
  }

  function moveButterfly(butterfly, index) {
    butterfly.style.opacity = "1";

    const prevTop = positions[index].top;
    const prevLeft = positions[index].left;

    const randomTop = Math.floor(Math.random() * 80) + 10;
    const randomLeft = getRandomSidePosition();

    const deltaX = randomLeft - prevLeft;
    const deltaY = randomTop - prevTop;
    const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI) + 90;

    butterfly.style.top = randomTop + "%";
    butterfly.style.left = randomLeft + "%";
    butterfly.style.transform = `rotate(${angle}deg)`;

    positions[index] = { top: randomTop, left: randomLeft };
  }

  function isSectionVisible(sectionId) {
    const section = document.getElementById(sectionId);
    if (!section) return false;

    const rect = section.getBoundingClientRect();
    return rect.top >= 0 && rect.bottom <= window.innerHeight;
  }

  // Joy
  function checkJoyVisibility() {
    if (isSectionVisible("joy-section") && !joyIntervalId) {
      document.body.style.backgroundImage =
        "url('../img/background/Joy-bg.png')";
      document.body.style.opacity = "1";
      butterflies.forEach((butterfly, index) =>
        moveButterfly(butterfly, index)
      );

      joyIntervalId = setInterval(() => {
        butterflies.forEach((butterfly, index) =>
          moveButterfly(butterfly, index)
        );
      }, 2000);
    } else if (!isSectionVisible("joy-section") && joyIntervalId) {
      clearInterval(joyIntervalId);
      joyIntervalId = null;
      butterflies.forEach((butterfly) => (butterfly.style.opacity = "0"));
      document.body.style.opacity = "0";
    }
  }

  const sunflowers = document.querySelectorAll(".flower-container");
  sunflowers.forEach((sunflower) => {
    sunflower.style.scale = Math.random() + 0.5;
    if (sunflower.style.scale <= 0.9) {
      sunflower.style.top = "30px";
    }
  });

  //Fear Effect
  let screamerTimeout;

  function screamerFear() {
    const screamerFear = document.getElementById("screamer");
    const scarySound = new Audio("./sound/scarysound.mp4");

    if (isSectionVisible("fear-section")) {
      screamerTimeout = setTimeout(() => {
        if (isSectionVisible("fear-section")) {
          screamerFear.style.visibility = "visible";
          scarySound.play();

          setTimeout(() => {
            screamerFear.style.visibility = "hidden";
            screamerFear.style.animation = "none";
            scarySound.pause();
            scarySound.currentTime = 0;
          }, 4000);
        }
      }, 6000);
    } else {
      clearTimeout(screamerTimeout);
    }
  }
  // Fear
  function checkFearVisibility() {
    if (isSectionVisible("fear-section") && !fearIntervalId) {
      document.body.style.backgroundImage =
        "url('../img/background/Fear-bg.png')";
      document.body.style.opacity = "1";
      fearIntervalId = true;
      screamerFear();
    } else if (!isSectionVisible("fear-section") && fearIntervalId) {
      fearIntervalId = null;
      document.body.style.opacity = "0";
      clearTimeout(screamerTimeout); // Annuler le timeout si on quitte la section
      const screamerElement = document.getElementById("screamer");
      screamerElement.style.visibility = "hidden";
      screamerElement.style.animation = "none";
      const scarySound = new Audio("./sound/scarysound.mp4");
      scarySound.pause();
      scarySound.currentTime = 0;
    }
  }

  // Love
  function checkLoveVisibility() {
    if (isSectionVisible("love-section") && !loveIntervalId) {
      document.body.style.backgroundImage =
        "url('../img/background/Love-bg.png')";
      document.body.style.opacity = "1";
      loveIntervalId = true;
    } else if (!isSectionVisible("love-section") && loveIntervalId) {
      loveIntervalId = null;
      document.body.style.opacity = "0";
    }
  }

  checkJoyVisibility();
  checkFearVisibility();
  checkLoveVisibility();

  main.addEventListener("scroll", () => {
    checkJoyVisibility();
    checkFearVisibility();
    checkLoveVisibility();
  });
});

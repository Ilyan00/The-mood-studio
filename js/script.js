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
      }, 5000);
    } else if (!isSectionVisible("joy-section") && joyIntervalId) {
      clearInterval(joyIntervalId);
      joyIntervalId = null;
      butterflies.forEach((butterfly) => (butterfly.style.opacity = "0"));
      document.body.style.opacity = "0";
    }
  }

  const sunflowers = document.querySelectorAll(".flower-container");
  sunflowers.forEach((sunflower) => {
    //
    const scaleY_random = Math.random() + 2;
    sunflower.style.transform = `scaleY(${scaleY_random}) scaleX(2)`;
    if (scaleY_random < 2.5) {
      sunflower.style.top = "0px";
    } else {
      sunflower.style.top = "-40px";
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


//Fear Eyeball
function pupilmouse() {
  const eye = document.querySelector('.eyeball');
  const pupil = document.querySelector('.pupil');

  document.addEventListener('mousemove', (e) => {
    const eyeRect = eye.getBoundingClientRect();
    const eyeCenterX = eyeRect.left + eyeRect.width / 2;
    const eyeCenterY = eyeRect.top + eyeRect.height / 2;

    const angle = Math.atan2(e.clientY - eyeCenterY, e.clientX - eyeCenterX);
    const distance = Math.min(
      eyeRect.width / 4,
      Math.sqrt(Math.pow(e.clientX - eyeCenterX, 2) + Math.pow(e.clientY - eyeCenterY, 2))
    );

    const pupilX = Math.cos(angle) * distance - 50;
    const pupilY = Math.sin(angle) * distance;

    pupil.style.transform = `translate(${pupilX}px, ${pupilY}px)`;
  });
};


  // Fear
  function checkFearVisibility() {
    if (isSectionVisible("fear-section") && !fearIntervalId) {
      document.body.style.backgroundImage =
        "url('../img/background/Fear-bg.png')";
      document.body.style.opacity = "1";
      fearIntervalId = true;
      pupilmouse();
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
  };

  function heart_spawn() {
    for (let i = 0; i < 20; i++) {
      const heart = document.createElement("img");
      heart.className = "heart";
      heart.src = "./img/heart/heart.svg";

      heart.style.position = "absolute";
      heart.style.left = `${Math.random() * 80}vw`;
      heart.style.zIndex = Math.floor(Math.random() * 2) * 2;
      heart.style.animationDelay = `${Math.random() * 8}s`;

      document.body.appendChild(heart);
    }
  }

  // Love
  function checkLoveVisibility() {
    if (isSectionVisible("love-section") && !loveIntervalId) {
      document.body.style.backgroundImage =
        "url('../img/background/Love-bg.png')";
      document.body.style.opacity = "1";
      loveIntervalId = true;
      heart_spawn();
    } else if (!isSectionVisible("love-section") && loveIntervalId) {
      loveIntervalId = null;
      document.body.style.opacity = "0";
      const hearts = document.querySelectorAll(".heart");

      hearts.forEach((heart) => {
        heart.style.opacity = 0;
        setTimeout(() => {
          heart.remove();
        }, 500);
      });
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


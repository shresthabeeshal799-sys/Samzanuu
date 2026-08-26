/* =====================================================
   SAMZANA BIRTHDAY WEBSITE
   Main JavaScript
===================================================== */


/* ================= BASIC SELECTORS ================= */

const $ = selector =>
  document.querySelector(selector);

const $$ = selector =>
  [...document.querySelectorAll(selector)];


/* ================= PAGE LOADING ================= */

window.addEventListener("load", () => {

  setTimeout(() => {

    $("#loader").classList.add("hide");

  }, 900);

  createParticles();

  initReveal();

  initMemoryGame();

  initGuessGame();

});


/* ================= HERO BUTTON ================= */

$("#startBtn").addEventListener("click", () => {

  $("#memories").scrollIntoView({
    behavior: "smooth"
  });

});


/* ================= FLOATING PARTICLES ================= */

function createParticles() {

  const container =
    $("#particles");

  const symbols = [
    "✦",
    "✧",
    "•",
    "❀",
    "✿",
    "♡"
  ];

  for (let i = 0; i < 38; i++) {

    const particle =
      document.createElement("span");

    particle.className =
      "particle";

    particle.textContent =
      symbols[
        Math.floor(
          Math.random() *
          symbols.length
        )
      ];

    particle.style.left =
      Math.random() * 100 + "%";

    particle.style.fontSize =
      8 + Math.random() * 15 + "px";

    particle.style.animationDuration =
      7 + Math.random() * 13 + "s";

    particle.style.animationDelay =
      -Math.random() * 15 + "s";

    particle.style.opacity =
      .25 + Math.random() * .55;

    container.appendChild(
      particle
    );

  }

}


/* ================= SCROLL REVEAL ================= */

function initReveal() {

  const observer =
    new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (
            entry.isIntersecting
          ) {

            entry.target.classList.add(
              "visible"
            );

          }

        });

      },
      {
        threshold: .12
      }
    );

  $$(".reveal").forEach(
    element =>
      observer.observe(element)
  );

}


/* ================= PHOTO LIGHTBOX ================= */

$$(".photo-card").forEach(card => {

  card.addEventListener(
    "click",
    () => {

      $("#lightboxImage").src =
        card.dataset.photo;

      $("#lightbox")
        .classList
        .add("show");

    }
  );

});


$("#lightboxClose").onclick = () => {

  $("#lightbox")
    .classList
    .remove("show");

};


$("#lightbox").addEventListener(
  "click",
  event => {

    if (
      event.target.id ===
      "lightbox"
    ) {

      $("#lightbox")
        .classList
        .remove("show");

    }

  }
);


/* =====================================================
   MEMORY MATCH GAME
===================================================== */

function initMemoryGame() {

  const icons = [
    "🌸",
    "🌙",
    "✨",
    "💖",
    "🌸",
    "🌙",
    "✨",
    "💖"
  ];

  const board =
    $("#memoryBoard");

  let first = null;

  let lock = false;

  let matches = 0;


  function renderBoard() {

    board.innerHTML = "";

    const shuffled =
      [...icons].sort(
        () => Math.random() - .5
      );


    shuffled.forEach(icon => {

      const card =
        document.createElement(
          "button"
        );

      card.className =
        "memory-card";

      card.textContent =
        "❔";

      card.dataset.icon =
        icon;


      card.addEventListener(
        "click",
        () => {

          if (lock) return;

          if (
            card.classList.contains(
              "flipped"
            )
          ) return;

          if (
            card.classList.contains(
              "matched"
            )
          ) return;


          card.classList.add(
            "flipped"
          );

          card.textContent =
            icon;


          if (!first) {

            first = card;

            return;

          }


          lock = true;


          if (
            first.dataset.icon ===
            card.dataset.icon
          ) {

            first.classList.add(
              "matched"
            );

            card.classList.add(
              "matched"
            );

            matches++;

            first = null;

            lock = false;


            if (matches === 4) {

              setTimeout(() => {

                alert(
                  "You found every memory! ✨"
                );

              }, 250);

            }

          }

          else {

            setTimeout(() => {

              first.classList.remove(
                "flipped"
              );

              card.classList.remove(
                "flipped"
              );

              first.textContent =
                "❔";

              card.textContent =
                "❔";

              first = null;

              lock = false;

            }, 650);

          }

        }
      );


      board.appendChild(card);

    });

  }


  renderBoard();


  $("#resetMemory").onclick =
    () => {

      matches = 0;

      first = null;

      lock = false;

      renderBoard();

    };

}


/* =====================================================
   GUESS THE MEMORY GAME
===================================================== */

function initGuessGame() {

  const options =
    $("#guessOptions");

  const result =
    $("#guessResult");


  const choices = [

    "A quiet evening",

    "A random adventure",

    "A silly little moment"

  ];


  const correct = 1;


  choices.forEach(
    (choice, index) => {

      const button =
        document.createElement(
          "button"
        );

      button.className =
        "guess-option";

      button.textContent =
        choice;


      button.addEventListener(
        "click",
        () => {

          if (index === correct) {

            result.textContent =
              "✨ That one feels right!";

          }

          else {

            result.textContent =
              "🌙 Maybe another memory...";

          }

        }
      );


      options.appendChild(
        button
      );

    }
  );

}


/* =====================================================
   HEART COLLECTOR GAME
===================================================== */

let heartInterval;


let heartTime;


$("#heartStart").onclick =
  () => {

    clearInterval(
      heartInterval
    );


    let score = 0;

    heartTime = 20;


    $("#heartScore")
      .textContent = 0;


    $("#heartTimer")
      .textContent = 20;


    const arena =
      $("#heartArena");


    function spawnHeart() {

      const heart =
        document.createElement(
          "span"
        );

      heart.className =
        "floating-heart";

      heart.textContent =
        "♥";


      heart.style.left =
        8 + Math.random() * 82 + "%";

      heart.style.top =
        35 + Math.random() * 55 + "%";


      heart.onclick = () => {

        score++;

        $("#heartScore")
          .textContent =
          score;

        heart.remove();


        if (score >= 10) {

          finishGame();

        }

      };


      arena.appendChild(
        heart
      );


      setTimeout(() => {

        heart.remove();

      }, 900);

    }


    const spawner =
      setInterval(() => {

        if (heartTime > 0) {

          spawnHeart();

        }

        else {

          clearInterval(
            spawner
          );

        }

      }, 500);


    function finishGame() {

      clearInterval(
        heartInterval
      );

      clearInterval(
        spawner
      );

      $("#heartTimer")
        .textContent = "♥";

    }


    heartInterval =
      setInterval(() => {

        heartTime--;

        $("#heartTimer")
          .textContent =
          heartTime;


        if (
          heartTime <= 0
        ) {

          clearInterval(
            heartInterval
          );

          clearInterval(
            spawner
          );

        }

      }, 1000);

  };


/* =====================================================
   FINAL YES / NO EXPERIENCE
===================================================== */

function endExperience(answer) {

  const ending =
    $("#ending");

  const title =
    $("#endingTitle");

  const text =
    $("#endingText");

  const symbol =
    $("#endingSymbol");

  const audio =
    $("#endingAudio");


  /* ================= YES ================= */

  if (answer === "yes") {

    symbol.textContent =
      "♥";


    title.textContent =
      "Maybe some stories aren't completely finished yet. ❤️";


    text.textContent =
      "Whatever tomorrow brings, thank you for the memories, the laughter, and the chapter we once shared. Happy Birthday, Samzana.";


    audio.src =
      "audio/yes-song.mp3";


    createEndingParticles([
      "♥",
      "✿",
      "✦",
      "❀"
    ]);

  }


  /* ================= NO ================= */

  else {

    symbol.textContent =
      "☾";


    title.textContent =
      "Your answer is okay. 🌙";


    text.textContent =
      "Whatever your answer is, I hope you have a beautiful life and a beautiful birthday. Thank you for being a meaningful part of my story.";


    audio.src =
      "audio/no-song.mp3";


    createEndingParticles([
      "✦",
      "☾",
      "•",
      "✧"
    ]);

  }


  ending.classList.add(
    "show"
  );


  /*
    Browsers can block autoplay.
    Since this runs after a button click,
    the audio normally works.
  */

  audio.play().catch(() => {

    console.log(
      "Audio autoplay was blocked by the browser."
    );

  });

}


/* ================= BUTTONS ================= */

$("#yesBtn").onclick =
  () => {

    endExperience(
      "yes"
    );

  };


$("#noBtn").onclick =
  () => {

    endExperience(
      "no"
    );

  };


/* ================= REPLAY ================= */

$("#replayBtn").onclick =
  () => {

    $("#ending")
      .classList
      .remove("show");


    $("#endingAudio")
      .pause();


    window.scrollTo({

      top: 0,

      behavior: "smooth"

    });

  };


/* =====================================================
   ENDING PARTICLES
===================================================== */

function createEndingParticles(
  symbols
) {

  const box =
    $("#endingParticles");


  box.innerHTML = "";


  for (
    let i = 0;
    i < 45;
    i++
  ) {

    const particle =
      document.createElement(
        "span"
      );

    particle.className =
      "particle";


    particle.textContent =
      symbols[
        Math.floor(
          Math.random() *
          symbols.length
        )
      ];


    particle.style.left =
      Math.random() * 100 + "%";


    particle.style.fontSize =
      9 + Math.random() * 20 + "px";


    particle.style.animationDuration =
      5 + Math.random() * 8 + "s";


    particle.style.animationDelay =
      -Math.random() * 7 + "s";


    box.appendChild(
      particle
    );

  }

}


/* =====================================================
   CUSTOM CURSOR
===================================================== */

document.addEventListener(
  "mousemove",
  event => {

    const cursor =
      $(".cursor-glow");


    if (cursor) {

      cursor.style.left =
        event.clientX + "px";

      cursor.style.top =
        event.clientY + "px";

    }

  }
);


/* =====================================================
   MAGNETIC BUTTONS
===================================================== */

$$(".magnetic").forEach(
  button => {

    button.addEventListener(
      "mousemove",
      event => {

        const rect =
          button.getBoundingClientRect();


        const x =
          (
            event.clientX -
            rect.left -
            rect.width / 2
          ) * .12;


        const y =
          (
            event.clientY -
            rect.top -
            rect.height / 2
          ) * .12;


        button.style.transform =
          `translate(${x}px, ${y}px)`;

      }
    );


    button.addEventListener(
      "mouseleave",
      () => {

        button.style.transform =
          "";

      }
    );

  }
);

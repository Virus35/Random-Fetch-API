const randomParagraph = document.querySelector(".random-paragraph");
const author = document.querySelector(".author");
const volume = document.querySelector(".volume");
const clipboard = document.querySelector(".clipboard");
const twitter = document.querySelector(".tweet");
const button = document.querySelector("button");

const randomParagraphGenerator = async () => {
  loading();
  disableClicks();
  button.innerHTML = "Loading...";
  let response = await fetch("https://api.quotable.io/random");
  let responseJson = await response.json();
  randomParagraph.innerHTML = responseJson.content;
  author.innerHTML = responseJson.author;
  removeLoading();
  enableClicks();
  button.innerHTML = "New Quote";
};

const loading = () => {
  button.classList.add("loading");
};

const removeLoading = () => {
  button.classList.remove("loading");
};

const speechText = () => {
  loading();
  let speech = new SpeechSynthesisUtterance(
    `${randomParagraph.innerHTML} by ${author.innerHTML}`
  );
  speechSynthesis.speak(speech);
  setInterval(() => {
    if (speechSynthesis.speaking) {
      volume.style.background = "#5372F0";
      volume.style.color = "white";
      disableClicks();
      volume.classList.remove("disable");
      clipboard.classList.remove("disable");
    } else {
      volume.style.background = "white";
      volume.style.color = "#5372F0";
      removeLoading();
      enableClicks();
    }
  }, 10);
};

const copyToClipBoard = () => {
  Swal.fire({
    title: "Do you want to copy the quote?",
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: "Yes!",
    denyButtonText: `Don't Copy`,
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      Swal.fire("Copied!", "", "success");
      navigator.clipboard.writeText(randomParagraph.innerHTML);
    } else if (result.isDenied) {
      Swal.fire("Not Copied!", "", "info");
    }
  });
};

const copyTweet = () => {
  window.open(
    `https://twitter.com/intent/tweet?url=${randomParagraph.innerHTML}`,
    "_blank"
  );
};

const disableClicks = () => {
  volume.classList.add("disable");
  clipboard.classList.add("disable");
  twitter.classList.add("disable");
};

const enableClicks = () => {
  volume.classList.remove("disable");
  clipboard.classList.remove("disable");
  twitter.classList.remove("disable");
};

randomParagraphGenerator();

button.addEventListener("click", () => {
  randomParagraphGenerator();
});

volume.addEventListener("click", () => {
  speechText();
});

clipboard.addEventListener("click", () => {
  copyToClipBoard();
});

twitter.addEventListener("click", () => {
  copyTweet();
});

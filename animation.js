//this is for animation page linked to index.html
// select the class named letters
const text = document.querySelectorAll(".letters");

//chech if it works
for (let i = 0; i < text.length; i++) {
  console.log(`text number ${i} length is ${text[i].getTotalLength()}`);
}

const lastWord = document.querySelector("#eleventh");
// console.log(lastWord);
const animation = document.querySelector("div.animation");
// console.log(animation.style);
//make the animation page disappeared
lastWord.addEventListener("animationend", () => {
  animation.style =
    "transition: all 1.5s ease; opacity: 0; pointer-events: none;";
});

// console.log(animation.style);

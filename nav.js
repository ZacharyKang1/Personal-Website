//this is for navigation bar dynamic performance
let nav = document.querySelector("nav");
let ul = nav.querySelector("ul");
window.addEventListener("scroll", (e) => {
  console.log(window.pageYOffset);
  if (window.pageYOffset != 0) {
    ul.style = "background-color: rgb(96, 5, 112, 0.5)";
  } else {
    ul.style = "";
  }
});

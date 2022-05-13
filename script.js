const checkmark = "<span class='checkmark'>&#x2713;</span>";
const btn = document.getElementById("submit");
let answers = document.getElementsByClassName("answer");

Array.from(answers).forEach((answer) => {
  answer.addEventListener("click", function (event) {
    Array.from(answers).forEach((answer) => {
      if (answer.querySelector("span.checkmark"))
        answer.querySelector("span.checkmark").remove();
      answer.querySelector("p").classList.remove("selected");
    });
    this.innerHTML += checkmark;
    this.querySelector("p").classList.add("selected");
  });
});

btn.addEventListener("click", function (event) {
  const isAnswerSlected = document.querySelector("div.answer > span.checkmark");
  if (isAnswerSlected) {
    let answer = isAnswerSlected.previousElementSibling
    if (answer.getAttribute("data-is-correct") === "true") alert("Correct!");
    else alert("Wrong answer!");
  } else {
    alert("Please choose an answer!");
  }
});

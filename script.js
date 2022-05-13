const checkmark = "<span class='checkmark'>&#x2713;</span>";
const btn = document.getElementById("submit");
let answerGroup = document.getElementsByClassName("answers");
let data = [];
let alphabet = ["A", "B", "C", "D"];

window.onload = () => {
  fetch(
    "https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple"
  )
    .then((res) => res.json()) // convert
    .then((res) => {
      data = res.results;
      let wrap = document.querySelector("div.questions");
      data.forEach((d, i) => {
        let q = d.question;
        let idxCorrectAns = Math.round(Math.random() * 3);
        let ans = [
          ...d.incorrect_answers.slice(0, idxCorrectAns),
          d.correct_answer,
          ...d.incorrect_answers.slice(idxCorrectAns),
        ];
        wrap.innerHTML += `<div class="question"><p>${i + 1}. ${q}</p></div>
        <div class="answers">
          ${ans
            .map(
              (a, i) =>
                `<div class="answer">
                  <span>${alphabet[i]}</span><p data-is-correct=${
                  i == idxCorrectAns ? "true" : "false"
                }>${a}</p>
              </div>`
            )
            .join("\n")}
        </div>`;
      });

      Array.from(answerGroup).forEach((answer4) => {
        answer4 = Array.from(answer4.childNodes).filter(
          (child) => child.nodeName !== "#text"
        );
        answer4.forEach((answer) => {
          answer.addEventListener("click", function (event) {
            Array.from(answer4).forEach((answer) => {
              if (answer.querySelector("span.checkmark"))
                answer.querySelector("span.checkmark").remove();
              answer.querySelector("p").classList.remove("selected");
            });
            this.innerHTML += checkmark;
            this.querySelector("p").classList.add("selected");
          });
        });
      });

      btn.addEventListener("click", function () {
        const isAnswerSlected = document.querySelector(
          "div.answer > span.checkmark"
        );
        if (isAnswerSlected) {
          alert(
            `${
              Array.from(document.querySelectorAll("span.checkmark"))
                .map(
                  a => a.previousElementSibling.getAttribute("data-is-correct") === "true"
                ).filter(Boolean).length} / ${answerGroup.length}`
          );
        } else {
          alert("Please choose an answer!");
        }
      });
    });
};

// dom question

// dom answers
// a b c d
// correct_answer incorrect_answers -> [0,1,2]

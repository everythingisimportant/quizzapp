const urlSample =
  "https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple";
const checkmark = "<span class='checkmark'>&#x2713;</span>";
const btnSubmitResult = document.getElementById("submitResult");
const answerGroup = document.getElementsByClassName("answers");
const form = document.getElementsByTagName("form")[0];
const alphabet = ["A", "B", "C", "D"];
const categories = [
  "General Knowledge",
  "Books",
  "Film",
  "Music",
  "Musicals & Theatres",
  "Television",
  "Video Games",
  "Board Games",
  "Science & Nature",
  "Science: Computers",
  "Science: Mathematics",
  "Mythology",
  "Sports",
  "Geography",
  "History",
  "Politics",
  "Art",
  "Celebrities",
  "Animals",
  "Vehicles",
  "Comics",
  "Science: Gadgets",
  "Japanese Anime & Manga",
  "Cartoon & Animations",
];
let data = [];

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let formData = new FormData(e.target);
  formData = Object.fromEntries(formData);
  fetchData(formData.category, formData.amount, formData.level);
  btnSubmitResult.classList.remove("toggleDisplay");
});

const fetchData = (category, amount, level) => {
  let url = `https://opentdb.com/api.php?`;
  category = category === "Any" ? "" : categories.indexOf(category) + 9;
  if (category)
    url += `amount=${amount}&category=${category}&difficulty=${level}&type=multiple`;
  else url += `amount=${amount}&difficulty=${level}&type=multiple`;
  fetch(url)
    .then((res) => res.json()) // convert
    .then((res) => {
      const wrap = document.querySelector("div.questions");
      data = res.results;
      wrap.innerHTML = "";
      data.forEach((d, i) => {
        let q = d.question;
        let idxCorrectAns = Math.round(Math.random() * 3);
        // let ans = [
        //   ...d.incorrect_answers.slice(0, idxCorrectAns),
        //   d.correct_answer,
        //   ...d.incorrect_answers.slice(idxCorrectAns),
        // ];
        let ans = d.incorrect_answers;
        ans.splice(idxCorrectAns, 0, d.correct_answer);
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

      btnSubmitResult.addEventListener("click", function () {
        const isAnswerSlected = document.querySelector(
          "div.answer > span.checkmark"
        );
        if (isAnswerSlected) {
          alert(
            `${
              Array.from(document.querySelectorAll("span.checkmark"))
                .map(
                  (a) =>
                    a.previousElementSibling.getAttribute("data-is-correct") ===
                    "true"
                )
                .filter(Boolean).length
            } / ${answerGroup.length}`
          );
        } else {
          alert("Please choose an answer!");
        }
      });
    });
};

window.onload = () => {
  document.querySelector("input[type=range]").value = 1;
};

// New data API - designed by myself
// const dataURL = "https://627e155c271f386ceff0efb8.mockapi.io/api/quiz/question";

// async function loadData() {
//   try {
//     const response = await fetch(dataURL);
//     let data = await response.json();
//     let wrap = document.querySelector("div.questions");
//     data.map((d) => console.log(d.question));
//     data.map((d, i) => {
//       wrap.innerHTML += `<div class="question"><p>${i + 1}. ${
//         d.question
//       }</p></div>
//       <div class="answers">
//         ${d.answers
//           .map(
//             (a, i) =>
//               `<div class="answer">
//                 <span>${alphabet[i]}</span><p data-is-correct="${
//                 d.correct == i + 1 ? "true" : "false"
//               }">${a}</p>
//             </div>`
//           )
//           .join("\n")}
//       </div>`;
//     });
//   } catch (e) {
//     console.log(e);
//   }
// }

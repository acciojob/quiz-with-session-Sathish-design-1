// Do not change code below this line
const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

// Load saved answers from session storage
let userAnswers = JSON.parse(sessionStorage.getItem("progress")) || {};

function renderQuestions() {
    const questionsElement = document.getElementById("questions");
    questionsElement.innerHTML = "";

    for (let i = 0; i < questions.length; i++) {
        const question = questions[i];

        const questionElement = document.createElement("div");
        const questionText = document.createTextNode(question.question);
        questionElement.appendChild(questionText);

        for (let j = 0; j < question.choices.length; j++) {
            const choice = question.choices[j];

            const choiceElement = document.createElement("input");
            choiceElement.setAttribute("type", "radio");
            choiceElement.setAttribute("name", `question-${i}`);
            choiceElement.setAttribute("value", choice);

            // Restore saved answer (Cypress requires attribute checked="true")
            if (userAnswers[i] === choice) {
                choiceElement.setAttribute("checked", "true");
            }

            // Save selected answer
            choiceElement.addEventListener("change", function () {
                userAnswers[i] = choice;
                sessionStorage.setItem("progress", JSON.stringify(userAnswers));
            });

            const choiceText = document.createTextNode(choice);

            questionElement.appendChild(choiceElement);
            questionElement.appendChild(choiceText);
            questionElement.appendChild(document.createElement("br"));
        }

        questionsElement.appendChild(questionElement);
    }
}

renderQuestions();

// Submit button handler — calculate score
document.getElementById("submit").addEventListener("click", function () {
    let score = 0;

    for (let i = 0; i < questions.length; i++) {
        if (userAnswers[i] === questions[i].answer) {
            score++;
        }
    }

    // Show score
    document.getElementById("score").innerText = `Your score is out of 5: ${score}`;

    // Save score in local storage
    localStorage.setItem("score", score);
});
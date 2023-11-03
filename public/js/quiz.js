const card = document.querySelector(".card");
const questionNum = document.querySelector("#question-text");
const questionTitle = document.getElementById("question");
const reponsesCont = document.querySelector(".reponses");
const nextButton = document.querySelector("#next");
const scoreText = document.getElementById("score");
const scoreInput = document.getElementById("score-input");
const submitButton = document.getElementById("submit");
const questions = JSON.parse(document.getElementById("questions").textContent);

let currentId = 0;
let score = 0;

function resetScore() {
	scoreText.innerHTML = "Score : " + score;
	scoreInput.value = score;
}

function reset() {
	questionNum.innerHTML = "Question : " + (currentId + 1);
	const color = card.classList[1];
	card.classList.remove(color);
	card.classList.add(questions[currentId].color);
	questionTitle.textContent = questions[currentId].titre;
	resetScore();
	while (reponsesCont.firstChild) {
		reponsesCont.removeChild(reponsesCont.firstChild);
	}
	ajouterButtons();
}

function ajouterButtons() {
	nextButton.style.display = "none";
	questions[currentId].reponses.forEach((item) => {
		const button = document.createElement("button");
		button.innerHTML = item.rep;
		button.classList.add("reponse");
		reponsesCont.appendChild(button);
		if (item.correct) {
			button.dataset.correct = item.correct;
		}
		button.addEventListener("click", selectAnswer);
	});
}

function selectAnswer(e) {
	const selectedAnswer = e.target;
	const isCorrect = selectedAnswer.dataset.correct === "true";
	if (isCorrect) {
		selectedAnswer.classList.add("success");
		score += 1;
		resetScore();
	} else {
		selectedAnswer.classList.add("failure");
	}
	Array.from(reponsesCont.children).forEach((button) => {
		if (button.dataset.correct == "true") {
			button.classList.add("success");
		}
		button.disabled = true;
	});
	if (currentId < questions.length - 1) {
		nextButton.style.display = "block";
	} else {
		submitButton.classList.remove("hide");
	}
}

nextButton.addEventListener("click", (e) => {
	e.preventDefault();
	currentId += 1;
	reset();
});

reset();

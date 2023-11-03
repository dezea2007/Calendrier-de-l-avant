// const questionsContainer = document.querySelector("#questions");
// const addButton = document.querySelector("#add");
// let questions = [];
// let inputs = [];

// addButton.addEventListener("click", (e) => {
// 	e.preventDefault();
// 	questions.push({
// 		title: "",
// 		reponses: [
// 			{ rep: "", valide: false },
// 			{ rep: "", valide: false },
// 			{ rep: "", valide: false },
// 			{ rep: "", valide: false },
// 		],
// 	});
// 	const id = questions.length;
// 	const newLabel = document.createElement("label");
// 	newLabel.setAttribute("for", id);
// 	newLabel.textContent = `Question ${id}`;
// 	questionsContainer.appendChild(newLabel);
// 	const newQuestionTitle = document.createElement("input");
// 	newQuestionTitle.setAttribute("name", id);
// 	newQuestionTitle.setAttribute(
// 		"placeholder",
// 		"Entrer l'intitulé de la question"
// 	);
// 	questionsContainer.appendChild(newQuestionTitle);
// 	inputs.push({ id, input: newQuestionTitle });
// 	const reponseLabel = document.createElement("label");
// 	reponseLabel.textContent = "Réponses";
// 	questionsContainer.appendChild(reponseLabel);
// 	for (let i = 0; i < 4; i++) {
// 		const rep = document.createElement("label");
// 		rep.setAttribute("for", `{id}-rep-${i + 1}`);
// 		rep.textContent = `Réponse ${i + 1}`;
// 		questionsContainer.appendChild(rep);
// 		const newRepInput = document.createElement("input");
// 		newRepInput.setAttribute("name", `{id}-rep-${i + 1}`);
// 		newRepInput.setAttribute("placeholder", "Entrer la réponse");
// 		questionsContainer.appendChild(newRepInput);
// 	}
// });

// setInterval(() => {
// 	inputs.forEach((input) => {
// 		console.log(inputs);
// 		input.input.addEventListener("change", (e) => titleChange(e, input.id));
// 	});
// }, 1000);

// function titleChange(e, id) {
// 	console.log(e.target.value);
// }

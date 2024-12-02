const axios = require("axios");
const instance = axios.create({
	baseURL: "https://calendrier-de-l-avent.onrender.com/api",
});

exports.index_get = (req, res) => {
	res.render("index");
};

exports.calendrier_get = async (req, res) => {
	try {
		let jours = [];
		const { data } = await instance.get("/all");
		for (let i = 0; i < 24; i++) {
			if (data[i]) {
				jours.push([i + 1, data[i].score, data[i].valide]);
			} else {
				jours.push([i + 1, 0, false]);
			}
		}

		let ordreHasard = [];
		for (let i = 0; i < 24; i++) {
			nbAleatoire = Math.floor(Math.random() * jours.length);
			jourRandom = jours[nbAleatoire];
			ordreHasard.push(jourRandom);
			jours.splice(nbAleatoire, 1);
		}
		res.render("calendrier", {
			jours: ordreHasard,
		});
	} catch (err) {
		res.json({ error: err.message });
	}
};

exports.score_get = (req, res) => {
	instance.get("/all").then((data) => {
		let score = 0;
		let max = 0;
		data.data.forEach((day) => {
			score += day.score;
			if (day.valide) {
				max += 5;
			}
		});
		res.render("score", {
			score,
			nbQuestions: max,
		});
	});
};

exports.quiz_get = (req, res) => {
	const jour = parseInt(req.params.jour);
	if (jour < 0 || jour > 24) {
		return res.redirect("/calendrier");
	}
	let questions = [];
	instance
		.get(`/day/${jour}`)
		.then((data) => {
			questions = data.data.questions;
			if (data.data.valide) {
				res.render("interdit", {
					valide: true,
				});
			} else if (
				new Date().getDate() != data.data.jour &&
				data.data.jour != 1
			) {
				res.render("interdit", {
					valide: false,
					jour,
				});
			} else {
				res.render("quiz", {
					jour: req.params.jour,
					questions,
				});
			}
		})
		.catch((err) => console.log({ error: err.message }));
};

exports.quiz_post = (req, res) => {
	instance
		.patch(`/update-day/${req.params.jour}`, {
			valide: true,
			score: req.body.score,
		})
		.then((data) => {
			res.redirect("/score");
		})
		.catch((err) => {
			res.json({ error: err.message });
		});
};

exports.quiz_editor_get = (req, res) => {
	res.render("quizEditor", {
		method: "post",
	});
};

exports.new_day_post = (req, res) => {
	const body = req.body;
	let obj = {
		jour: body.jour,
		valide: false,
		score: 0,
		questions: [],
	};
	for (let i = 1; i < 6; i++) {
		let question = {
			titre: body[`${i}`],
			color: body[`${i}-couleur`],
			reponses: [
				{
					rep: body[`${i}-rep-1`],
					correct: body[`${i}-rep`] == 1 ? true : false,
				},
				{
					rep: body[`${i}-rep-2`],
					correct: body[`${i}-rep`] == 2 ? true : false,
				},
				{
					rep: body[`${i}-rep-3`],
					correct: body[`${i}-rep`] == 3 ? true : false,
				},
				{
					rep: body[`${i}-rep-4`],
					correct: body[`${i}-rep`] == 4 ? true : false,
				},
			],
		};
		obj.questions.push(question);
	}
	instance
		.post("/new-day", obj)
		.then((data) => res.redirect("/editor"))
		.catch((err) => res.json({ error: err.message }));
};

// const questions = [
// 	{
// 		titre: "Quel est le nom de l'amoureux de Barbie ?",
// 		color: "pink",
// 		reponses: [
// 			{
// 				rep: "Kent",
// 				correct: false,
// 			},
// 			{
// 				rep: "Ken",
// 				correct: true,
// 			},
// 			{
// 				rep: "Kyle",
// 				correct: false,
// 			},
// 			{
// 				rep: "Kory",
// 				correct: false,
// 			},
// 		],
// 	},
// 	{
// 		titre: "Qui est le meilleur tennisman de tous les temps ?",
// 		color: "blue",
// 		reponses: [
// 			{
// 				rep: "Rafael Nadal",
// 				correct: true,
// 			},
// 			{
// 				rep: "Novak Djokovic",
// 				correct: false,
// 			},
// 			{
// 				rep: "Roger Federer",
// 				correct: false,
// 			},
// 			{
// 				rep: "Bjorn Borg",
// 				correct: false,
// 			},
// 		],
// 	},
// 	{
// 		titre: "Qui est le président américain ?",
// 		color: "yellow",
// 		reponses: [
// 			{
// 				rep: "Donald Trump",
// 				correct: false,
// 			},
// 			{
// 				rep: "Hillary Clinton",
// 				correct: false,
// 			},
// 			{
// 				rep: "John F. Kennedy",
// 				correct: false,
// 			},
// 			{
// 				rep: "Joe Biden",
// 				correct: true,
// 			},
// 		],
// 	},
// 	{
// 		titre: "De quand date la première apparition de Mario dans un jeu vidéo ?",
// 		color: "purple",
// 		reponses: [
// 			{
// 				rep: "1981",
// 				correct: true,
// 			},
// 			{
// 				rep: "1983",
// 				correct: false,
// 			},
// 			{
// 				rep: "1985",
// 				correct: false,
// 			},
// 			{
// 				rep: "1987",
// 				correct: false,
// 			},
// 		],
// 	},
// 	{
// 		titre: "Qui a remporté le plus de ballons d'or ?",
// 		color: "purple",
// 		reponses: [
// 			{
// 				rep: "Cristiano Ronaldo",
// 				correct: false,
// 			},
// 			{
// 				rep: "Lionel Messi",
// 				correct: true,
// 			},
// 			{
// 				rep: "Kylian Mbappe",
// 				correct: false,
// 			},
// 			{
// 				rep: "Karim Benzema",
// 				correct: false,
// 			},
// 		],
// 	},
// 	// {
// 	// 	titre: 'Qui a rempoté la coupe de feu dans "Harry Potter et la coupe de feu" ?',
// 	// 	color: "brown",
// 	// 	reponses: [
// 	// 		{
// 	// 			rep: "Cedric Digori",
// 	// 			correct: true,
// 	// 		},
// 	// 		{
// 	// 			rep: "Fleur Delacour",
// 	// 			correct: false,
// 	// 		},
// 	// 		{
// 	// 			rep: "Igo Karkarov",
// 	// 			correct: false,
// 	// 		},
// 	// 		{
// 	// 			rep: "Harry Potter",
// 	// 			correct: true,
// 	// 		},
// 	// 	],
// 	// },
// 	// {
// 	// 	titre: "Qui a trouvé le vaccin contre la rage ?",
// 	// 	color: "black",
// 	// 	reponses: [
// 	// 		{
// 	// 			rep: "Marie Curie",
// 	// 			correct: false,
// 	// 		},
// 	// 		{
// 	// 			rep: "Louis Pasteur",
// 	// 			correct: true,
// 	// 		},
// 	// 		{
// 	// 			rep: "Amy Farah Fowler",
// 	// 			correct: false,
// 	// 		},
// 	// 		{
// 	// 			rep: "Pierre Curie",
// 	// 			correct: false,
// 	// 		},
// 	// 	],
// 	// },
// 	// {
// 	// 	titre: 'Qui a composé le fameux opéra "La flute enchentée" ?',
// 	// 	color: "orange",
// 	// 	reponses: [
// 	// 		{
// 	// 			rep: "Frederic Chopin",
// 	// 			correct: false,
// 	// 		},
// 	// 		{
// 	// 			rep: "George Bizet",
// 	// 			correct: false,
// 	// 		},
// 	// 		{
// 	// 			rep: "Ludwig von Beethoven",
// 	// 			correct: false,
// 	// 		},
// 	// 		{
// 	// 			rep: "Wolfgang Amadeus Mozart",
// 	// 			correct: true,
// 	// 		},
// 	// 	],
// 	// },
// 	// {
// 	// 	titre: "A quelle vitesse a été enregistré le volant le plus rapide au badminton ?",
// 	// 	color: "blue",
// 	// 	reponses: [
// 	// 		{
// 	// 			rep: "384km/h",
// 	// 			correct: false,
// 	// 		},
// 	// 		{
// 	// 			rep: "484km/h",
// 	// 			correct: false,
// 	// 		},
// 	// 		{
// 	// 			rep: "493km/h",
// 	// 			correct: true,
// 	// 		},
// 	// 		{
// 	// 			rep: "501km/h",
// 	// 			correct: false,
// 	// 		},
// 	// 	],
// 	// },
// 	// {
// 	// 	titre: "Quelle relique appartienait à Holga Poufsouffle ?",
// 	// 	color: "brown",
// 	// 	reponses: [
// 	// 		{
// 	// 			rep: "Le médaillon",
// 	// 			correct: false,
// 	// 		},
// 	// 		{
// 	// 			rep: "L'épée",
// 	// 			correct: false,
// 	// 		},
// 	// 		{
// 	// 			rep: "Le diadème",
// 	// 			correct: false,
// 	// 		},
// 	// 		{
// 	// 			rep: "La coupe",
// 	// 			correct: true,
// 	// 		},
// 	// 	],
// 	// },
// ];

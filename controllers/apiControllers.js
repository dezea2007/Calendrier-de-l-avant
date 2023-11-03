const Jour = require("../schemas/jour");

exports.api_get_all_controller = (req, res) => {
	try {
		Jour.find()
			.then((data) => res.json(data))
			.catch((err) => res.json({ error: err.message }));
	} catch (err) {
		res.json({ error: err.message });
	}
};

exports.api_get_one = (req, res) => {
	Jour.findOne({ jour: req.params.jour })
		.then((data) => {
			if (data) {
				res.json(data);
			} else {
				res.json({});
			}
		})
		.catch((err) => res.json({ error: err.message }));
};

exports.api_new_day_controller = (req, res) => {
	const newDay = new Jour(req.body);
	newDay
		.save()
		.then((data) => res.status(200).json(data))
		.catch((err) => res.json({ error: err.message }));
};

exports.api_update_day_controller = (req, res) => {
	const updatedDay = req.body;
	Jour.findOneAndUpdate({ jour: req.params.jour }, updatedDay, { new: true })
		.then((data) => res.json(data))
		.catch((err) => res.json({ error: err.message }));
};

exports.api_delete_day_controller = (req, res) => {
	const _id = req.params._id;
	Jour.findOneAndDelete({ _id: _id })
		.then((data) => res.json(data))
		.catch((err) => res.json({ error: err.message }));
};

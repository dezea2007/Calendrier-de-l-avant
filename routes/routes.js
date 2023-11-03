const express = require("express");
const {
	index_get,
	calendrier_get,
	score_get,
	quiz_get,
	quiz_post,
	quiz_editor_get,
	new_day_post,
} = require("../controllers/controllers");
const router = express.Router();

router.get("/", index_get);
router.get("/calendrier", calendrier_get);
router.get("/score", score_get);
router.get("/editor", quiz_editor_get);
router.post("/new-day", new_day_post);
router.get("/quiz/:jour", quiz_get);
router.post("/quiz/:jour", quiz_post);

module.exports = router;

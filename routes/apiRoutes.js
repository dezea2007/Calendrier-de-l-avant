const express = require("express");
const router = express.Router();
const {
	api_get_all_controller,
	api_get_one,
	api_new_day_controller,
	api_update_day_controller,
	api_delete_day_controller,
} = require("../controllers/apiControllers");

router.get("/all", api_get_all_controller);
router.get("/day/:jour", api_get_one);
router.post("/new-day", api_new_day_controller);
router.patch("/update-day/:jour", api_update_day_controller);
router.delete("/delete-day/:_id", api_delete_day_controller);

module.exports = router;

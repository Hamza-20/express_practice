const express = require("express");
const router = express.Router();
const {
  getPlayers,
  addPlayers,
  updatePlayers,
  deletingPlayers,
} = require("../controllers/playerController");

router.get("/", getPlayers);
router.get("/:id", getPlayers);

router.post("/", addPlayers);

//router.route("/").get(getPlayers).post(addPlayers); //above 2 lines in one  line

/* router.put("/:id", updatePlayers);

router.delete("/:id", deletingPlayers);
 */
router.route("/:id").put(updatePlayers).delete(deletingPlayers); //above 2 lines in one  line

module.exports = router;

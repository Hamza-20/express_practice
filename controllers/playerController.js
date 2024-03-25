const asyncHandler = require("express-async-handler");

const { pool } = require("../config/db");
//@desc   getting player data
//@route  GET /api/players

const getPlayers = asyncHandler(async (req, res) => {
  //res.json({ message: "kaka" });

  const keyCheck = Object.keys(req.params);

  if (keyCheck.length === 0) {
    const result = await pool.query("SELECT * FROM curd_db");
    res.json(result.rows);
  } else {
    const { id } = req.params;

    const result = await pool.query("SELECT * FROM curd_db WHERE id = $1", [
      id,
    ]);
    res.json(result.rows);
  }
});

//@desc   updating player data
//@route   PUT  /api/players/:id

const updatePlayers = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, age } = req.body;

  const result = await pool.query(
    `
  UPDATE curd_db
  SET name = $1, age = $2
  WHERE id = $3
`,
    [name, age, id]
  );
  res.json(result.rows);
  //res.json({ message: `updating player at ${req.params.id}` });
});

//@desc   adding player data
//@route   POST  /api/players/add

const addPlayers = asyncHandler(async (req, res) => {
  const { id, name, age } = req.body;
  const result = await pool.query(
    `INSERT INTO curd_db(id,name,age) VALUES ($1,$2,$3)`,
    [id, name, age]
  );
  res.json(result.rows);
});

//@desc   deleting player data
//@route   DELETE /api/players/:id

const deletingPlayers = asyncHandler(async (req, res) => {
  // const id = req.params.id;
  console.log(req.params);

  const { id } = req.params;

  if (!req.params.id) {
    res.status(400);
    throw new Error("Player id not found");
  }
  const result = await pool.query(`DELETE FROM curd_db WHERE id = $1`, [id]);
  res.json(result.rows);
});

module.exports = { getPlayers, updatePlayers, addPlayers, deletingPlayers };

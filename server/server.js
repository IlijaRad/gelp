require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./db");
const app = express();

app.use(cors());

app.use(express.json());

//Get restaurants

app.get("/api/v1/restaurants", async (req, res) => {
  try {
    const result = await db.query("SELECT * from restaurants");
    res.status(200).json({
      status: "success",
      results: result.rows.length,
      data: {
        restaurants: result.rows,
      },
    });
    ``;
  } catch (error) {
    console.log(error);
  }
});

//Get a restaurant

app.get("/api/v1/restaurants/:id", async (req, res) => {
  try {
    const result = await db.query("SELECT * from restaurants where id = $1", [
      req.params.id,
    ]);
    res.status(200).json({
      status: "success",
      data: {
        restaurant: result.rows[0],
      },
    });
  } catch (error) {
    console.log(error);
  }
});

//Create a restaurant

app.post("/api/v1/restaurants/", async (req, res) => {
  const { name, location, price_range } = req.body;
  try {
    const result = await db.query(
      "INSERT INTO restaurants (name, location, price_range) values ($1, $2, $3) returning *",
      [name, location, price_range]
    );
    res.status(201).json({
      status: "success",
      data: {
        restaurant: result.rows[0],
      },
    });
  } catch (error) {
    console.log(error);
  }
});

//Update restaurants

app.put("/api/v1/restaurants/:id", async (req, res) => {
  const { name, location, price_range } = req.body;
  try {
    const result = await db.query(
      "UPDATE restaurants SET name = $1, location = $2, price_range = $3 where id = $4 returning *",
      [name, location, price_range, req.params.id]
    );
    res.status(200).json({
      status: "success",
      data: {
        restaurant: result.rows[0],
      },
    });
  } catch (error) {
    console.log(error);
  }
});

//Delete a restaurant

app.delete("/api/v1/restaurants/:id", async (req, res) => {
  try {
    await db.query("DELETE FROM restaurants where id = $1", [req.params.id]);
    res.status(204).json({
      status: "success",
    });
  } catch (error) {
    console.log(error);
  }
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`server is up and listening on port ${port}`);
});

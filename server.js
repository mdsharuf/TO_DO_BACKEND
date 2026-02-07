import express from "express";
import cors from "cors";

import mysql from "mysql2/promise";

const db = await mysql.createConnection({
  host: "todo-db.co9ceaemm5an.us-east-1.rds.amazonaws.com",
  user: "admin",
  password: "1234.Abbu",
  database: "tododb"
});

const app = express();
app.use(cors());
app.use(express.json());

app.get("/tasks", async (req, res) => {
  const [rows] = await db.query("SELECT * FROM tasks");
  res.json(rows);
});

app.post("/tasks", async (req, res) => {
  const { title } = req.body;
  await db.query("INSERT INTO tasks (title) VALUES (?)", [title]);
  res.json({ message: "Task added" });
});


app.put("/tasks/:id", async (req, res) => {
  const id = req.params.id;
  await db.query(
    "UPDATE tasks SET completed = NOT completed WHERE id=?",
    [id]
  );
  res.json({ message: "updated" });
});


app.delete("/tasks/:id", async (req, res) => {
  const id = req.params.id;
  await db.query("DELETE FROM tasks WHERE id=?", [id]);
  res.json({ message: "deleted" });
});


const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
app.get("/", (req, res) => {
  res.send("Backend API is running");
});
app.get("/api/health", (req, res) => {
  res.json({ status: "Backend healthy" });
});



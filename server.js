import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

let tasks = []; // store tasks in memory

app.get("/tasks", (req, res) => {
  res.json(tasks);
});

app.post("/tasks", (req, res) => {
  const newTask = { id: Date.now(), title: req.body.title, completed: false };
  tasks.push(newTask);
  res.json(newTask);
});

app.put("/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  tasks = tasks.map(task =>
    task.id === taskId ? { ...task, completed: !task.completed } : task
  );
  res.json({ message: "Task updated" });
});

app.delete("/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  tasks = tasks.filter(task => task.id !== taskId);
  res.json({ message: "Task deleted" });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
app.get("/", (req, res) => {
  res.send("Backend API is running");
});
app.get("/api/health", (req, res) => {
  res.json({ status: "Backend healthy" });
});



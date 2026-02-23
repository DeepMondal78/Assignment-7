const express = require("express");
const connectToDb = require("./src/db/db");
const cors = require("cors");
const taskRouter = require("./src/routes/taskRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// DB connect
connectToDb()
  .then(() => console.log("Database connected"))
  .catch(err => console.log("DB error:", err));

// home route
app.get("/", (req, res) => {
  res.json({ message: "Home page working" });
});

app.use("/", taskRouter);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
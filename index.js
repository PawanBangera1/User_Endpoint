import express from "express";
import connectDB from "./src/config/index.js";
import userRoutes from "./src/routes/users.js";
import logHistory from "./src/middlewares/logHistory.js";

const app = express();
const PORT = process.env.PORT || 3000;

connectDB()
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });

  app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logHistory);

app.use("/users", userRoutes);  

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

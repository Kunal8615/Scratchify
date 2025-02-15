import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import multer from "multer"
const app = express()
app.use(cors({
  origin: "http://localhost:8000",
  credentials: true,


}));

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static("public"));

app.use(cookieParser());

//Root route to display a message
app.get("/", (req, res) => {
    res.send("Welcome to the demo API! Use the available routes to interact with the platform.");
});
import userRouter from "../src/routes/user.route.js"
import cardRoute from "../src/routes/card.route.js"

app.use("/api/v3/users", userRouter);
app.use("/api/v3/cards", cardRoute);

export { app };
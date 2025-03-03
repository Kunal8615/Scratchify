import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

// ✅ Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

// ✅ Root route to check API status
app.get("/", (req, res) => {
    res.send("Welcome to the demo API! Use the available routes to interact with the platform.");
});

// ✅ Import Routes (Check path correctness)
import userRouter from "./routes/user.route.js";
import cardRoute from "./routes/card.route.js";

// ✅ Use Routes
app.use("/api/v3/users", userRouter);
app.use("/api/v3/cards", cardRoute);

export { app };

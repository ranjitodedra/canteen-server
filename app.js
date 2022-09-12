require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
const combineRouter = require("./router");

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

combineRouter(app);

app.get("/status", (req, res) => {
   res.json({ isActive: true });
});

app.listen(process.env.PORT, () => {
   console.log("App is listening at port ", process.env.PORT);
});

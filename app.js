require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
const combineRouter = require("./router");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

combineRouter(app);

app.get("/status", async (req, res) => {
   //    const user = await prisma.user.create({
   //       data: {
   //          id: "1",
   //          email: "test@test.com",
   //          password: "test",
   //          name: "name",
   //       },
   //    });
   //    console.log(user);
   res.json({ isActive: true });
});

app.listen(process.env.PORT, async () => {
   console.log("Connecting to mongodb please wait...");
   await prisma.$connect();
   console.log("Connected\nApp is listening at port ", process.env.PORT);
});

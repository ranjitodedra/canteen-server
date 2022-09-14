const combineRouter = (app) => {
   app.use("/api/auth", require("./api/auth"));
   app.use("/api/payment", require("./api/payment"));
};

module.exports = combineRouter;
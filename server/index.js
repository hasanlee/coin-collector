const express = require("express");
const dotenv = require("dotenv");
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");
const { auth } = require("./middlewares/auth");
const { pageNotFoundHandler } = require("./middlewares/pageNotFoundHandler");
const { errorHandler } = require("./middlewares/globalErrorHandler");
const app = express();
dotenv.config();

app.use(express.json());

//Routes
app.use("/", userRoutes);
app.use("/admin", auth, adminRoutes);

//Middlewares
app.use(pageNotFoundHandler);
app.use(errorHandler);

//App Start
app.listen(process.env.SERVER_PORT, () => {
  console.log(`App listening on port ${process.env.SERVER_PORT}`);
});

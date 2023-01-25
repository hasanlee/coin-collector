const express = require("express");
const fileUpload = require("express-fileupload");
const path = require("path");
const dotenv = require("dotenv");
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const { auth } = require("./middlewares/auth");
const { pageNotFoundHandler } = require("./middlewares/pageNotFoundHandler");
const { errorHandler } = require("./middlewares/globalErrorHandler");
const app = express();
dotenv.config();

app.use(express.json());
app.use(
  fileUpload({
    limits: { fileSize: 5 * 1024 * 1024 },
    safeFileNames: true,
    preserveExtension: true,
    abortOnLimit: true,
    responseOnLimit: true,
  })
);
app.use("/static", express.static(path.join(__dirname, "public")));

//Routes
app.use("/", userRoutes);
app.use("/auth", authRoutes);
app.use("/admin", auth, adminRoutes);

//Middlewares
app.use(pageNotFoundHandler);
app.use(errorHandler);

//App Start
app.listen(process.env.SERVER_PORT || 3000, () => {
  console.log(`App listening on port ${process.env.SERVER_PORT || 3000}`);
});

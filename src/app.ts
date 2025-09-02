import express from "express";
import connectDB from "./database";
import notFound from "./middlewares/NotFound";
import errorHandler from "./middlewares/ErrorHandler";
import morgan from "morgan";
import usersRouter from "./apis/users/users.routes";
import urlsRouter from "./apis/urls/urls.routes";

const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.use("/api/users", usersRouter);
app.use("/api/urls", urlsRouter);

app.use(notFound);
app.use(errorHandler);

connectDB();
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

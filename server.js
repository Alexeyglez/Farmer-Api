import "dotenv/config";
import "express-async-errors";
import morgan from "morgan";
import express from "express";
import cookieParser from "cookie-parser";

const app = express();

import helmet from "helmet";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";

//connectdb
import connectdb from "./db/connectdb.js";

//middlewares
import errorHandlerMiddleware from "./middleware/error-handler.js";
import notFoundMiddleware from "./middleware/not-found.js";

//routes
import authRouter from "./routes/authRoute.js";
import farmersRouter from "./routes/farmerRoute.js";
import productsRouter from "./routes/productRoute.js";

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());

app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/farmers", farmersRouter);
app.use("/api/v1/products", productsRouter);

app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectdb(process.env.MONGO_URL);
    app.listen(port, () => console.log(`Server listene on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();

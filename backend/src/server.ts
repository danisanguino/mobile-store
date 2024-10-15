import express from "express";
import cors from 'cors';
import productRouter from "./routes/product.routes";

const appExpress = express();

appExpress.use(cors());

appExpress.use(express.json());
appExpress.use("/products", productRouter)

export default appExpress;
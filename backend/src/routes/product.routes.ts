import { Router } from "express";
import {  getAllProductsRandom, 
          createProduct,
          getAllProductsSortSkus,
          getAllProductsSortPriceAscen,
          getAllProductsSortPriceDescen,
          // updateProduct,
          // deleteProduct
        } from "../controllers/product.controllers";

const productRouter = Router();

productRouter.get("/", getAllProductsRandom);
productRouter.get("/skus", getAllProductsSortSkus);
productRouter.get("/priceAs", getAllProductsSortPriceAscen);
productRouter.get("/priceDes", getAllProductsSortPriceDescen);
 

productRouter.post("/", createProduct);
// productRouter.patch("/:sku", updateProduct);
// productRouter.delete("/:sku", deleteProduct);

export default productRouter;
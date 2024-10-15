import { Request, Response } from "express";
import ProductModel from "../models/product.model";


export const getAllProductsRandom = async (req: Request, res:Response)=> {
    try {
        const allProducts = await ProductModel.aggregate([
                                                            { $addFields: { random: { $rand: {} } } },  
                                                            { $sort: { random: 1 } }                   
                                                         ]);
                   
        res.status(201).send(allProducts)
    } catch (error) {
        res.status(400).send(error);
    }
};


export const getAllProductsSortSkus = async (req: Request, res:Response)=> {
    try {
        const allProductsBySkus = await ProductModel.find().sort({ sku: 1 });
        res.status(202).send(allProductsBySkus);
    } catch (error) {
        res.status(400).send(error);
    };
};


export const getAllProductsSortPriceAscen = async (req: Request, res:Response)=> {
    try {
        const allProductsByPricesAscen = await ProductModel.find().sort({ price: 1 });
        res.status(202).send(allProductsByPricesAscen);
    } catch (error) {
        res.status(400).send(error);
    };
};


export const getAllProductsSortPriceDescen = async (req: Request, res:Response)=> {
    try {
        const allProductsByPricesDescen = await ProductModel.find().sort( { price: -1 } );
        res.status(202).send(allProductsByPricesDescen);
    } catch (error) {
        res.status(400).send(error);
    }
}



// No necesito esto de momento
export const createProduct = async (req: Request, res:Response)=> {
    const { sku, name, price } = req.body;

    try {
        const newProduct = await ProductModel.create({ sku, name, price });
        res.status(201).send(`${newProduct} has been created`);
    } catch (error) {
        res.status(400).send(error);
    }
};

// export const updateProduct = (req: Request, res:Response)=> {
//     console.log(req.params)
//     res.send("product updeated")
// };

// export const deleteProduct = (req: Request, res:Response)=> {
//     const { sku } = req.params
//     res.send(`product with ${ sku } sku has been deleted`)
// };
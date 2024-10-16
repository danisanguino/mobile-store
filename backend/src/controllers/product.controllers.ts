import { Request, Response } from "express";
import ProductModel from "../models/product.model";



export const getAllProductsRandom = async (req: Request, res:Response)=> {
    try {
        //OTRA LOGICA PARA CARGAR DE MANERA ALEATORIA LOS PRODUCTOS
        // const allProducts = await ProductModel.aggregate([
        //                                                     { $addFields: { random: { $rand: {} } } },  
        //                                                     { $sort: { random: 1 } }                   
        //                                                  ]);

        const page = Number(req.query.page) || 0;
        const productPerPage = 100;
            
        const allProducts = await ProductModel.find().skip(page).limit(productPerPage);
        const productsList = allProducts.sort(() => Math.random() - 0.5);
        const total = await ProductModel.countDocuments();
                   
        res.status(201).send({
                            ok: true,
                            productsList,
                            page: {
                                page,
                                productPerPage,
                                total
                            }});
    } catch (error) {
        res.status(400).send(error);
    }
};


export const getAllProductsSortSkus = async (req: Request, res:Response)=> {
    try {

        const page = Number(req.query.page) || 0;
        const quantyPerPage = 10;

        //Meter los 2 en la misma promesa con el video https://www.youtube.com/watch?v=5gWjzK2e-Sg
        const allProductsBySkus = await ProductModel.find().sort({ price: 1 }).skip(page).limit(quantyPerPage);
        const total = await ProductModel.countDocuments();
        
        res.status(202).send({
                            ok: true,
                            allProductsBySkus,
                            page: {
                                page,
                                quantyPerPage,
                                total
                            }});
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
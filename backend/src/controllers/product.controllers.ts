import { Request, Response } from "express";
import ProductModel from "../models/product.model";


//GET PRODUCTS IN RANDOM MODE
export const getAllProductsRandom = async (req: Request, res:Response)=> {
    try {
        const page = Number(req.query.page) || 0;
        const productPerPage = 100;
            
        const allProducts = await ProductModel.find().skip(page * productPerPage).limit(productPerPage);
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

//ORDER BY SKUS
export const getAllProductsSortSkus = async (req: Request, res:Response)=> {
    try {

        const page = Number(req.query.page) || 0;
        const productPerPage = 100;

        const productsList = await ProductModel.find().sort({ sku: 1 }).skip(page * productPerPage).limit(productPerPage);
        const total = await ProductModel.countDocuments();
        
        res.status(202).send({
                            ok: true,
                            productsList,
                            page: {
                                page,
                                productPerPage,
                                total
                            }});
    } catch (error) {
        res.status(400).send(error);
    };
};

//ORDER BY PRICE ASCEN
export const getAllProductsSortPriceAscen = async (req: Request, res:Response)=> {
    try {

        const page = Number(req.query.page) || 0;
        const productPerPage = 100;

        const productsList = await ProductModel.find().sort({ price: 1 }).skip(page * productPerPage).limit(productPerPage);
        const total = await ProductModel.countDocuments();
        
        res.status(202).send({
                            ok: true,
                            productsList,
                            page: {
                                page,
                                productPerPage,
                                total
                            }});
    } catch (error) {
        res.status(400).send(error);
    };
};

//ORDER BY PRICE DESCEN
export const getAllProductsSortPriceDescen = async (req: Request, res:Response)=> {
    try {

        const page = Number(req.query.page) || 0;
        const productPerPage = 100;

        const productsList = await ProductModel.find().sort({ price: -1 }).skip(page * productPerPage).limit(productPerPage);
        const total = await ProductModel.countDocuments();
        
        res.status(202).send({
                            ok: true,
                            productsList,
                            page: {
                                page,
                                productPerPage,
                                total
                            }});
    } catch (error) {
        res.status(400).send(error);
    };
};


// INSERT PRODUCT
export const createProduct = async (req: Request, res:Response)=> {
    const { sku, name, price } = req.body;

    try {
        const newProduct = await ProductModel.create({ sku, name, price });
        res.status(201).send(`${newProduct} has been created`);
    } catch (error) {
        res.status(400).send(error);
    }
};
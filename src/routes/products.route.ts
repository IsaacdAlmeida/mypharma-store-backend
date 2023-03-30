import { Router } from 'express';
import ProductController from '../controllers/products.controller';
import ProductModel from '../models/products.model';
import ProductService from '../services/products.service';

const productRoute = Router();

const product = new ProductModel();
const productService = new ProductService(product);
const productController = new ProductController(productService);
const PRODUCT_URL = '/products';
const PRODUCT_URL_ID = '/products/:id';

productRoute.post(PRODUCT_URL, (req, res) => productController.create(req, res));
productRoute.get(PRODUCT_URL, (req, res) => productController.read(req, res));
productRoute.get(PRODUCT_URL_ID, (req, res) => productController.readOne(req, res));
productRoute.put(PRODUCT_URL_ID, (req, res) => productController.update(req, res));
productRoute.delete(PRODUCT_URL_ID, (req, res) => productController.delete(req, res));

export default productRoute;

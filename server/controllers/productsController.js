import dotenv from 'dotenv';
import Validator from 'validatorjs';
import db from '../models';
import Validations from '../middleware/validations';
import generatePagination from '../utils/helpers';

dotenv.config();

const { Product } = db;


export default class ProductsController {
    static async addProduct(req, res) {
        try {
            const productDetails = req.body;
            const validation = new Validator(productDetails, Validations().productRules)
            if (validation.passes()) {
                const newProduct = await Product.create(productDetails);
                return res.status(201).json({
                    status: 'success',
                    data: {
                        message: 'Product Created Successfully',
                        newProduct
                    }
                });
            }
            return res.status(400).json({
                status: 'error',
                error: validation.errors.all()
            });
        } catch (error) {
            return res.status(500).json({
                status: 'error',
                error: error.toString()
            });
        }
    }

    static async getProduct(req, res) {
        try {
            const {
              limit,
              offset
            } = req.query;
            const products = await Product.findAndCountAll({
              limit: limit || 10,
              offset: offset || 0,
              order: [
                ['createdAt', 'DESC']
              ]
            });
            if (!products) {
              return res.status(404).json({
                  status: 'error',
                  error: 'No product found'
              });
            }
            return res.status(200).json({
                status: 'success',
                data: {
                    message: 'All products displayed',
                    paginate: generatePagination(limit, offset, products),
                    products: products.rows
                }
            });
          } catch (error) {
            return res.status(500).json({
                status: 'error',
                error: error.toString()
            });
          }
    }

    static async deleteProduct(req, res) {
        try {
            const productId = parseInt(req.params.id, 10);
            if (!(Number.isInteger(productId)) && (Number.isNaN(productId))) {
              return res.status(400).json({
                status: 'error',
                error: 'Provide valid meal id'
              });
            }
            const product = await Product.findByPk(productId);
            if (product) {
              await product.destroy({
                force: false,
                cascade: true
              });
              return res.status(200).json({
                status: 'success',
                data: {
                    message: 'Product successfully deleted'
                }
              });
            }
            return res.status(404).json({
              status: 'error',
              error: 'Product not found'
            });
          } catch (error) {
            return res.status(500).json({
              status: 'error',
              error: error.toString()
            });
          }
    }

    static async editProduct(req, res) {
        try {
            const productDetails = req.body;
            const validation = new Validator(productDetails, Validations().productRules)
            if (validation.passes()) {
                const productId = parseInt(req.params.id, 10);
                if (!(Number.isInteger(productId)) && (Number.isNaN(productId))) {
                return res.status(400).json({
                    status: 'error',
                    error: 'Provide valid product id'
                });
                }
                const productExist = await Product.findByPk(productId);
                if (productExist) {
                    const product = await productExist.update({
                        name: req.body.name ? req.body.name.trim() : productExist.name,
                        price: req.body.price || productExist.price,
                        imageUrl: req.body.imageUrl || productExist.image,
                        description: req.body.description || productExist.description,
                        inStock: req.body.inStock || productExist.inStock,
                        category: req.body.category || productExist.category
                      });
                    return res.status(200).json({
                        status: 'success',
                        data: {
                            message: 'Product successfully updated',
                            product
                        }
                      });
                }
                return res.status(404).send({
                    status: 'error',
                    error: 'Product Not Found'
                  });
            }
            return res.status(400).json({
                status: 'error',
                error: validation.errors.all()
              });
        }
        catch (error) {
            return res.status(500).json({
                status: 'error',
                error: error.toString()
              });
        }
    }
}
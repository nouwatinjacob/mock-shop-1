import dotenv from 'dotenv';
import Validator from 'validatorjs';
import db from '../models';
import Validations from '../middleware/validations';

dotenv.config();

const { Product, Cart, User } = db;


export default class CartsController {
    static async addToCart(req, res) {
        try {
             const { productId } = req.body;
             const validation = new Validator(req.body, Validations().cartRules)
             if (validation.passes()) {
                const userId = req.decoded.id;
                const productExist = await Product.findByPk(productId);
                if(productId) {
                    const cart = await Cart.create({
                        productId: productId,
                        userId: userId
                    });
                    return res.status(201).json({
                        status: 'success',
                        data: {
                            message: 'Product added Cart successfully',
                            cart
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

    static async getCartProducts(req, res) {
        try {
            const userId = req.decoded.id;
            const cartProducts = await Cart.findAll({
                where: {userId},
                include: [{model:Product}]
            });
            return res.status(200).json({
                status: 'success',
                data: {
                    message: 'All cart products displayed',
                    cartProducts
                }
            })
        }
        catch (error) {
            return res.status(500).json({
                status: 'error',
                error: error.toString()
            })
        }
    }

    static async deleteProductInCart(req, res) {
        try {
            const userId = req.decoded.id;
            const cartId = parseInt(req.params.id, 10);
            if (!(Number.isInteger(cartId)) && (Number.isNaN(cartId))) {
              return res.status(400).json({
                status: 'error',
                error: 'Provide valid cart id'
              });
            }
            const cartExist = await Cart.findByPk(cartId);
            if(cartExist) {
                if(cartExist.userId !== userId) {
                    return res.status(400).json({
                        status: 'error',
                        error: 'This cart does not belong this user'
                      });
                }
                await cartExist.destroy({
                    force: false,
                    cascade: true
                  });
                return res.status(200).json({
                status: 'success',
                data: {
                    message: 'Product successfully removed from cart'
                }
                });
            }
            return res.status(404).json({
                status: 'error',
                error: 'Cart not found'
              });
        }
        catch (error) {
            return res.status(500).json({
                status: 'error',
                error: error.toString()
            })
        }
    }
}
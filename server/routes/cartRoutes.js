import cartsController from '../controllers/CartsController';
import AuthMiddleware from '../middleware/AuthMiddleware';

const cartRoutes = (router) => {
    router.route('/cart')
        .post(
            AuthMiddleware.verifyToken,
            cartsController.addToCart
        )
        .get(
            AuthMiddleware.verifyToken,
            cartsController.getCartProducts
        );

    router.route('/cart/:id')
        .delete(
            AuthMiddleware.verifyToken,
            cartsController.deleteProductInCart
        );
}

export default cartRoutes;
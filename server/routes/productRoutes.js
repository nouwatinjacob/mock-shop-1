import productsController from '../controllers/productsController';
import AuthMiddleware from '../middleware/AuthMiddleware';

const productRoutes = (router) => {
    router.route('/product')
      .post(
          AuthMiddleware.verifyToken,
          AuthMiddleware.isAdmin,
          productsController.addProduct
          )
      .get(
          AuthMiddleware.verifyToken,
          productsController.getProduct
      );
    router.route('/product/:id')
        .delete(
            AuthMiddleware.verifyToken,
            AuthMiddleware.isAdmin,
            productsController.deleteProduct
        )
        .put(
            AuthMiddleware.verifyToken,
            AuthMiddleware.isAdmin,
            productsController.editProduct
        )
  };
  
export default productRoutes;
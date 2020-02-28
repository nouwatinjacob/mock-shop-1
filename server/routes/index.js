
import userRoutes from './userRoutes';
import productRoutes from './productRoutes';
import cartRoutes from './cartRoutes';

const routes = (router) => {
    router.route('/')
      .get((req, res) => res.status(200).json({
        message: 'Welcome to the mock-shop API!',
      }));

    userRoutes(router);

    productRoutes(router);

    cartRoutes(router);

    };

export default routes;

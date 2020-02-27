
import userRoutes from './userRoutes';
import productRoutes from './productRoutes';

const routes = (router) => {
    router.route('/')
      .get((req, res) => res.status(200).json({
        message: 'Welcome to the mock-shop API!',
      }));

    /* Users Routes */
    userRoutes(router);

    productRoutes(router);
    
    };

export default routes;

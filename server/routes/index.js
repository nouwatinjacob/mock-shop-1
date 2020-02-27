
import userRoutes from './userRoutes';

const routes = (router) => {
    router.route('/')
      .get((req, res) => res.status(200).json({
        message: 'Welcome to the mock-shop API!',
      }));

    /* Users Routes */
    userRoutes(router);
    
    };

export default routes;

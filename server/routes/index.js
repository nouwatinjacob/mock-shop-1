
const routes = (router) => {
    router.route('/')
      .get((req, res) => res.status(200).json({
        message: 'Welcome to the mock-shop API!',
      }));
    };

export default routes;
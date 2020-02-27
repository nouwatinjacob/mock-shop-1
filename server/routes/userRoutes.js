import usersController from '../controllers/UsersController';

const userRoutes = (router) => {
  router.route('/auth/signup')
    .post(usersController.createUser);
};

export default userRoutes;
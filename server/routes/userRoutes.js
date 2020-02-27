import usersController from '../controllers/UsersController';

const userRoutes = (router) => {
  router.route('/auth/signup')
    .post(usersController.createUser);

  router.route('/auth/signin')
    .post(usersController.userSignin);
};

export default userRoutes;
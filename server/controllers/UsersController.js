import dotenv from 'dotenv';
import lodash from 'lodash';
import jwt from 'jsonwebtoken';
import Validator from 'validatorjs';
import db from '../models';
import Validations from '../middleware/validations';

dotenv.config();

const secret = process.env.SECRET_TOKEN;

const { User } = db;

export default class UsersController {
 
  static async createUser(req, res) {
    try {
        const obj = req.body;
        const userDetails = lodash.pick(
          obj,
          ['email', 'password', 'firstName', 'lastName', 'password_confirmation', 'isAdmin']
        );
        const validation = new Validator(userDetails,  Validations().userRules);
        if (validation.passes()) {
          const { email } = userDetails;
          const foundUser = await User.findOne({ where: { email } });
          if (!foundUser) {
            const newUser = await User.create(obj);
            const user = lodash.pick(
              newUser, ['id', 'email', 'isAdmin']
            );
            const token = jwt.sign(user, secret, { expiresIn: 86400 });
            return res.status(201).json({
              status: 'success',
              data: {
                message: 'Registration Successful',
                user,
                token
              }
            });
          }
          return res.status(409).json({
            status: 'error',
            data: {
              message: 'email or password already exists'
            }
          });  
        }
        return res.status(400).json({
          status: 'error',
          data: {
            message: validation.errors.all()
          }
        }); 
      } catch (error) {
        return res.status(500).json({
          status: 'error',
          data: {
            message: 'Error processing request', error: error.toString()
          }
        });
    };
};

  static async userSignin(req, res) {
    try {
      const { email, password } = req.body;
      const validation = new Validator(req.body, Validations().signinRules);
      if (validation.passes()) {
        const userExist = await User.findOne({ where: { email } });
        if (userExist) {
          const verifyPassword = userExist.comparePassword(userExist, password);
          if (!verifyPassword) {
            return res.status(400).json({
              status: 'error',
              data: {
                message: 'Invalid login credentials'
              }
            });
          }
          const user = lodash.pick(userExist, ['id', 'email', 'isAdmin']);
          const token = jwt.sign(user, secret);
          return res.status(200).json({
            status: 'success',
            data: {
              message: 'Log in successful',
              token,
              user
            }
          });
        }
        return res.status(404).json({
          status: 'error', 
          data: {
          message: 'Invalid credentials'
        }
      });
      }
      return res.status(400).json({
        status: 'error',
        data: {
          message: validation.errors.all()
        }
      });
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        data: {
          message: 'Error processing request', error: error.toString()
        }
      });
    }
  }

};

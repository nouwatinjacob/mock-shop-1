import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import db from '../models';

dotenv.config();
const secret = process.env.SECRET_TOKEN;
const { User } = db;

/**
 * Auth class declaration
 *
 * @class Auth
 *
 */
export default class AuthMiddleware {
  /**
   * @description - Verify User Token
   *
   * @param { object }  req
   * @param { object }  res
   * @param { object }  next
   *
   * @returns { object } object
   */
  static verifyToken(req, res, next) {
    const token = req.body.token ||
    req.query.token || req.headers['x-access-token'];
    if (token) {
      jwt.verify(token, secret, (error, decoded) => {
        if (error) {
          return res.status(401).json({
            message: 'Invalid authorization token'
          });
        }
        User.findByPk(decoded.id)
          .then((user) => {
            if (!user) {
              return res.status(400).json({
                message: 'This user does not exist'
              });
            }
            req.decoded = decoded;
            return next();
          })
          .catch(err => res.status(404).json(err));
      });
    } else {
      res.status(403).json({
        message: 'Token not provided'
      });
    }
  }

  /**
   * @description - Verify User
   *
   * @param { object }  req
   * @param { object }  res
   * @param { object }  next
   *
   * @returns { object } object
   */
  static async verifyUser(req, res, next) {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        req.user = user;
        return next();
      }
      return res.status(404).json({ message: 'User not found' });
    } catch (error) {
      return res.status(400).json({
        message: 'Error processing request', error
      });
    }
  }
  

  /**
   * @description - Verify if User is a Customer
   *
   * @param { object }  req
   * @param { object }  res
   * @param { object }  next
   *
   * @returns { object } object
   */
  static isAdmin(req, res, next) {
    if (req.decoded && req.decoded.isAdmin === true) return next();
    return res.status(403).json({
      message: 'You must be an admin to perform this operation'
    });
  }
}
import bcrypt from 'bcrypt-nodejs';

const userModel = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      default: false
    },
  });

  User.associate = (models) => {
    // associations can be defined here
    User.hasMany(models.Cart, {
      foreignKey: 'userId',
    });
  };


  /**
   * Method for comparing passwords
   */
  User.prototype.comparePassword = (user, password) =>
    bcrypt.compareSync(password, user.password);
  /**
   * Hook for hashing password before creating a new user
   */
  User.beforeCreate(user => {
    user.password = bcrypt.hashSync(
      user.password,
      bcrypt.genSaltSync(10),
      null
    );
  });

  return User;
};

export default userModel;

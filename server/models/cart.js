
const cartModel = (sequelize, DataTypes) => {
  const Cart = sequelize.define('Cart', {
    productId:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId:{
      type:  DataTypes.INTEGER,
      allowNull: false
    }
  });
  Cart.associate = (models) => {
    // associations can be defined here
    Cart.hasMany(models.Product, {
      as: 'product'
    });
    Cart.belongsTo(models.User, {
      foreignKey: 'userId'
    });
  };
  return Cart;
};

export default cartModel;

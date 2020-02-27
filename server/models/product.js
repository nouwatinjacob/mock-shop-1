
const productModel = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name:{
      type: DataTypes.STRING,
      allowNull: false
    },
    description:{
      type: DataTypes.STRING,
      allowNull: false
    },
    category:{
      type: DataTypes.STRING,
      allowNull: false
    },
    price:{
      type: DataTypes.FLOAT,
      allowNull: false
    },
    imageUrl:{
      type: DataTypes.STRING,
      allowNull: false
    },
    inStock:{
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
  });
  
  Product.associate = (models) => {
    // associations can be defined here
    Product.belongsTo(models.Cart, {
      foreignKey: 'productId',
      onDelete: 'CASCADE'
    });
  };
  return Product;
};

export default productModel;

module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      uniqeu: true,
    },
    link: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    timestamps: false,
    classMethods: {
      associate(models) {
        Image.hasMany(models.State, { 
          foreignKey: 'imageId',
          as: 'states',
        });
      },
    },
  });

  return Image;
};

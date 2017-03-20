module.exports = function(sequelize, DataTypes) {
  const Parameter = sequelize.define('Parameter', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Параметр'
    },
    value: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    classMethods: {
      associate: (models) => {
        Parameter.belongsTo(models.State);
      }
    }
  });

  return Parameter;
}

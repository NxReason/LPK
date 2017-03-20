module.exports = function(sequelize, DataTypes) {
  const ActionTools = sequelize.define('ActionTools', {
    minValue: DataTypes.INTEGER,
    maxValue: DataTypes.INTEGER,
    boolValue: DataTypes.BOOLEAN
  }, {

  });

  return ActionTools;
}

module.exports = function(sequelize, DataTypes) {
  const Action = sequelize.define('Action', {
    inactive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    nextState: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {

  });

  return Action;
}

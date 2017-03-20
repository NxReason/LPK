module.exports = function(sequelize, DataTypes) {
  const Tool = sequelize.define('Tool', {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      type: {
        type: DataTypes.ENUM('switch', 'range'),
        allowNull: false
      },
      min: DataTypes.INTEGER,
      max: DataTypes.INTEGER
  }, {

  });

  return Tool;
}

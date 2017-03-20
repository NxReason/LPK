module.exports = function(sequelize, DataTypes) {
  const Event = sequelize.define('Event', {
    name: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    underscored: true,
    classMethods: {
      associate: (models) => {
        Event.belongsTo(models.State);
      }
    }
  });

  return Event;
}

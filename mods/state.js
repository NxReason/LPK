module.exports = function(sequelize, DataTypes) {
  const State = sequelize.define('State', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Состояние'
    },
    img: {
      type: DataTypes.STRING,
      allowNull: false
      // TODO добавить дефолтное изображение
    }
  }, {
    underscored: true,
    classMethods: {
      associate: (models) => {
        State.belongsTo(models.Model);
        State.hasMany(models.Parameter);
      }
    }
  });
  return State;
}

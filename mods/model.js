module.exports = function(sequelize, DataTypes) {
  const Model = sequelize.define('Model', {
    // fields configuration
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    breakTime: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1000
    },
    steps: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    initialState: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    // other stuff like class methods indexes etc.
    underscored: true,
    classMethods: {
      associate: (models) => {
        Model.hasMany(models.State);
      }
    }
  });
  return Model;
}

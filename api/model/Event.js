const { DataTypes } = require('sequelize')

export default {
  fio: DataTypes.STRING,
  subdivision: DataTypes.STRING,
  topic: DataTypes.STRING,
  content: DataTypes.STRING
}

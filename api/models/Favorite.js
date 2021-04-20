const Sequelize = require("sequelize")
const db = require("../db")

class Favorite extends Sequelize.Model {}
Favorite.init(
  {
    apiId: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    Title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    Year: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    Poster: {
      type: Sequelize.STRING,
    },
  },
  { sequelize: db, modelName: "favorite" }
)

module.exports = Favorite

const User = require('./User');
const Favorite = require('./Favorite');

Favorite.belongsTo(User);

module.exports = { User, Favorite };
var meals = require('../controllers/meals.server.controller');

module.exports = function(app) {
	app.route('/addmeal').get(meals.renderAddmeal).post(meals.addmeal);
	app.route('/api/meals').get(meals.list);
	app.route('/api/meals/:mealId').get(meals.read).put(meals.update).delete(meals.delete);
	app.param('mealId', meals.mealByID);
};
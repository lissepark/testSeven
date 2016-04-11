var mongoose = require('mongoose');
var	Schema = mongoose.Schema;

var MealSchema = new Schema({
	name: {
		type: String,
		required: true,
		validate: [
		function(name) {
			return true;
		},
		'Field Name must be filled'
		]
	},
	price: {
		type: Number,
		required: true,
		validate: [
		function(price) {
			return true;
		},
		'Field Price must be filled'
		]
	},
});

mongoose.model('Meal', MealSchema);
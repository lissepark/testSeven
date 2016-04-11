var Meal = require('mongoose').model('Meal');

exports.create = function(req, res) {
	var meal = new Meal(req.body);
	meal.save(function(err) {
		if (err) {
			return next(err);
		} else {
			res.json(meal);
		}
	});
};

exports.list = function(req, res, next) {
	Meal.find().sort('name').exec(function(err, meals) {
		if (err) {
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			res.json(meals);
		}
	});
};

exports.read = function(req, res) {
	res.json(req.meal);
};

exports.mealByID = function(req, res, next, id) {
	Meal.findById(id).exec(function(err, meal) {
		if (err) return next(err);
		if (!meal) return next(new Error('Failed to load meal ' + id));
		req.meal = meal;
		next();
	});
};

exports.update = function(req, res) {
	var meal = req.meal;
	meal.name = req.body.name;
	meal.price = req.body.price;
	meal.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: "Error in update method"
			});
		} else {
			res.json(meal);
		}
	});
};

exports.delete = function(req, res, next) {
	req.meal.remove(function(err) {
		if (err) {
			return next(err);
		} else {
			res.json(req.meal);
		}
	})
};

var getErrorMessage = function(err) {
	var message = '';
	if (err.code) {
		message = 'Something went wrong, Error code: '+err.code;
	} else {
		for (var errName in err.errors) {
		if (err.errors[errName].message) message = err.errors[errName].message;
		}
	}
	return message;
};

exports.renderAddmeal = function(req, res, next) {
	if (!req.meal) {
		res.render('addmeal', {
			title: 'Add-Meal Form',
			messages: req.flash('error')
		});
	} else {
	return res.redirect('/');
	}
};

exports.addmeal = function(req, res, next) {
	if (!req.meal) {
		var meal = new Meal(req.body);
		var message = null;
		meal.save(function(err) {
			if (err) {
				var message = getErrorMessage(err);
				req.flash('error', message);
				return res.redirect('/addmeal');
			}
		return res.redirect('/');
		});
	} else {
		return res.redirect('/');
	}
};
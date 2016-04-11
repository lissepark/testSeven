var User = require('mongoose').model('User');

exports.create = function(req, res) {
	var user = new User(req.body);
	user.save(function(err) {
		if (err) {
			return next(err);
		} else {
			res.json(user);
		}
	});
};

exports.list = function(req, res, next) {
	User.find().sort('lastName').exec(function(err, users) {
		if (err) {
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			res.json(users);
		}
	});
};

exports.read = function(req, res) {
	res.json(req.user);
};


exports.userByID = function(req, res, next, id) {
	User.findById(id).exec(function(err, user) {
		if (err) return next(err);
		if (!user) return next(new Error('Failed to load user ' + id));
		req.user = user;
		next();
	});
};

exports.update = function(req, res) {
	var user = req.user;
	user.lastName = req.body.lastName;
	user.firstName = req.body.firstName;
	user.email = req.body.email;
	user.age = req.body.age;
	user.gender = req.body.gender;
	user.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: "Error in update method"
			});
		} else {
			res.json(user);
		}
	});
};

exports.delete = function(req, res, next) {
	req.user.remove(function(err) {
		if (err) {
			return next(err);
		} else {
			res.json(req.user);
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

exports.renderAdduser = function(req, res, next) {
	if (!req.user) {
		res.render('adduser', {
			title: 'Add-User Form',
			messages: req.flash('error')
		});
	} else {
	return res.redirect('/');
	}
};

exports.adduser = function(req, res, next) {
	if (!req.user) {
		var user = new User(req.body);
		var message = null;
		user.save(function(err) {
			if (err) {
				var message = getErrorMessage(err);
				req.flash('error', message);
				return res.redirect('/adduser');
			}
		return res.redirect('/');
		});
	} else {
		return res.redirect('/');
	}
};
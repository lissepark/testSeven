angular.module('meals').controller('MealsController', ['$scope', '$routeParams', '$location', '$uibModal', '$window', 'Meals', 'localStorageService',
	function($scope, $routeParams, $location, $uibModal, $window, Meals, localStorageService) {
		
		$scope.create = function() {
			var meal = new Meals({
				name: this.name,
				price: this.price
			});
			meal.$save(function(response) {
				$location.path('meals/' + response._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.find = function() {
			$scope.meals = Meals.query(function() {
				$scope.showMeals = $scope.meals.slice(0, 20);
			});
		};

		$scope.findOne = function() {
			$scope.meal = Meals.get({
				mealId: $routeParams.mealId
			});
		};

		$scope.update = function() {
			$scope.meal.$update(function() {
				$location.path('meals/' + $scope.meal._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.delete = function(meal) {
			if (meal) {
				meal.$remove(function() {
					for (var i in $scope.meals) {
						if ($scope.meals[i] === meal) {
							$scope.meals.splice(i, 1);
						}
					}
				});
			} else {
				$scope.meal.$remove(function() {
					$location.path('meals/');
				});
			}
		};

		$scope.nameNumber = 1;
		$scope.predicate = 'name';
  		$scope.reverse = false;

  		$scope.order = function(predicate, isNumber) {
	    	$scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : true;
	    	$scope.predicate = predicate;
	    	if(angular.isDefined(isNumber)) {
            	angular.forEach($scope.meals, function (obj) {
            		for(var i in obj ) {
               			if(i == predicate && obj[i] != '') {
                  			obj[i] =  parseInt(obj[i]);       
               			}
            		}
           		});
        	}
  		};

	$scope.currentPage = 1;
	$scope.numPerPage = 20;
	$scope.maxSize = 8;
	$scope.$watch('currentPage + numPerPage', function() {
		var begin = (($scope.currentPage - 1) * $scope.numPerPage)
		end = begin + $scope.numPerPage;
		$scope.showMeals = $scope.meals.slice(begin, end);
	});

	$scope.mealsToOrder = [];
	$scope.totalPrice = 0;

	$scope.addToOrder = function(meal) {
		if (!$scope.mealsToOrder.includes(meal)) {
			meal.nubexSelect=1;
			meal.itemTotal = (meal.nubexSelect*meal.price).toFixed(2);
			$scope.mealsToOrder.push(meal);			
		}else{
			var index = $scope.mealsToOrder.indexOf(meal);
	        $scope.mealsToOrder[index].nubexSelect=$scope.mealsToOrder[index].nubexSelect+1;
			$scope.mealsToOrder[index].itemTotal = ($scope.mealsToOrder[index].nubexSelect * $scope.mealsToOrder[index].price).toFixed(2);
		};
		$scope.totalPrice = (parseFloat($scope.totalPrice) + parseFloat(meal.price)).toFixed(2);
	};

	$scope.delFromOrder = function(meal) {
		var index = $scope.mealsToOrder.indexOf(meal);
		if ($scope.mealsToOrder[index].nubexSelect == 1) {
			$scope.mealsToOrder[index].itemTotal = 0;
			$scope.mealsToOrder.splice(index,1);
		}else{
		$scope.mealsToOrder[index].nubexSelect-=1;
		$scope.mealsToOrder[index].itemTotal = ($scope.mealsToOrder[index].nubexSelect * $scope.mealsToOrder[index].price).toFixed(2);	
		};
		$scope.totalPrice = ($scope.totalPrice - meal.price).toFixed(2);
	};

	$scope.printIt = function(){
	   var table = document.getElementById('printSection').innerHTML;
	   var myWindow = $window.open('', '', 'width=800, height=600');
	   myWindow.document.write(table);
	   myWindow.print();
	};

/*
	var storageKey = "meals";
	$scope.mealsToOrder = localStorageService.get(storageKey) || [];

	$scope.addToOrder = function(meal) {
		$scope.mealsToOrder.push(meal);
		localStorageService.add(storageKey, $scope.mealsToOrder);
		$scope.mealsToOrder = localStorageService.get(storageKey);
	};
	//$scope.mealsToOrder = [];
	$scope.getOrderFromLocalStorage = function() {
        localStorageService.clearAll();    	
	};

	$scope.orderLength = $scope.mealsToOrder.length;
*/

}]);
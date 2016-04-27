var movieList = angular.module('movieList', ['ngRoute','moviesController']);

var moviesController = angular.module('moviesController', []);

//config app & pages
movieList.config(['$routeProvider', function($routeProvider){$routeProvider.

    when('/movies', {
      templateUrl: 'pages/movie-list.html',
      controller: 'ListMovie'

    }).when('/detail/:movieId', { 
      templateUrl: 'pages/detail.html',
      controller: 'DetailMovie'  

    }).otherwise({
      redirectTo: '/movies'
    });

}]);

//list controller
moviesController.controller('ListMovie', ['$scope', '$http', function ($scope, $http){

  $scope.loading = true; //for show loading
  $http.get('https://dl.dropboxusercontent.com/s/eunjr4op0aj3kia/movies.json').success(function(data){

  $scope.movies = data; // insert json data to movies
  $scope.loading = false; // for hide loading

  }).error(function(){
        $scope.error = true; //for show error
    }); 

}]);

//detail controller
moviesController.controller('DetailMovie', [
  '$scope', '$http', '$routeParams', function ($scope, $http, $routeParams){

  $scope.loading = true; //for show loading
  $scope.error = false; //for error
  $http.get('https://dl.dropboxusercontent.com/s/eunjr4op0aj3kia/movies.json').success(function(data){

  $scope.movies = data; // insert json data to movies
  $scope.movieId = $routeParams.movieId; //set id to movieId


  // for nex & prev page
  if($routeParams.movieId > 0){
    $scope.prevMovie = Number($routeParams.movieId) - 1;
  } else{
    $scope.prevMovie = $scope.movies.length - 1;
  }

  if($routeParams.movieId < $scope.movies.length - 1){
    $scope.nextMovie = Number($routeParams.movieId) + 1;
  } else{
    $scope.nextMovie = 0;
  }

  $scope.loading = false; //for hide loading

  }).error(function(){
        $scope.error = true; //for show error
    });
  
}]);



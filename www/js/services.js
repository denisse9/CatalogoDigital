angular.module('app.services', [])

  .factory('Api', ['$http','$q','$ionicLoading','$ionicPopup',function($http, $q, $ionicLoading, $ionicPopup){


    var currentLabId;
    var url ='http://elite-schedule.net/api/leaguedata/'

    function getData(){

      var deferred =$q.defer();

      $ionicLoading.show({ templateUrl: 'templates/loading.html'});

      $http.get(url).success(function(data){
        window.localStorage.setItem("Api", JSON.stringify(data));
        $ionicLoading.hide();
        deferred.resolve(data);
        console.log("Recebeu via HTTP.", data);
      }).error(function(data){

        $ionicLoading.hide();
        // An alert dialog
        $ionicPopup.alert({ title: 'Erro!!!', template: 'Verifique a ligação à Internet.'});
        if(window.localStorage.getItem("Api") !== undefined) {
          data = JSON.parse(window.localStorage.getItem("Api"));
        }
        //deferred.reject(data); para regeitar a data usar sem LocalStorage
        deferred.resolve(data);
      });
      return deferred.promise;
    }

    function getDataById() {

      var deferred =$q.defer();

      $ionicLoading.show({ templateUrl: 'templates/loading.html'});

      $http.get(url + currentLabId).success(function(data, status){
        window.localStorage.setItem("ApiDet", JSON.stringify(data, status));
        $ionicLoading.hide();
        deferred.resolve(data);
        console.log("Recebeu via HTTP.", data, status);
      })
        .error(function(data, status){
          $ionicLoading.hide();
          // An alert dialog
          $ionicPopup.alert({ title: 'Erro!!!', template: 'Verifique a ligação à Internet.'});
          if(window.localStorage.getItem("ApiDet") !== undefined) {
            data = JSON.parse(window.localStorage.getItem("ApiDet"));
          }
          //deferred.reject(data); para regeitar a data usar sem LocalStorage
          deferred.resolve(data);
        });
      return deferred.promise;
    };


    function setLabId(labId) {
      currentLabId = labId;
    }

    return{
      getData: getData,
      getDataById: getDataById,
      setLabId : setLabId
    };

  }])

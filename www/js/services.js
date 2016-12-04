angular.module('app.services', [])

  .factory('Api', ['$http','$q','$ionicLoading','$ionicPopup',function($http, $q, $ionicLoading, $ionicPopup){


    var currentLabId;
    var url ='http://elite-schedule.net/api/leaguedata/'

    function getData(){

      var deferred =$q.defer();

      $ionicLoading.show({ templateUrl: 'templates/loading.html'});

      $http.get(url).success(function(data){
        var dataHttp = {'dataHttp': data, 'dataAtual': new Date()};
        window.localStorage.setItem("dataHttp", JSON.stringify(dataHttp));
        $ionicLoading.hide();
        deferred.resolve(dataHttp);
        console.log("Serviço Http com sucesso...");
      }).error(function(data){
        $ionicLoading.hide();
        // An alert dialog
        $ionicPopup.alert({ title: 'Erro!!!', template: 'Verifique a ligação à Internet.'});
        if(window.localStorage.getItem("dataHttp") !== undefined) {
          data = JSON.parse(window.localStorage.getItem("dataHttp"));
        }
        //deferred.reject(data); para regeitar a data usar sem LocalStorage
        deferred.resolve(data);
        console.log("Serviço Http com Erro...");
      });
      return deferred.promise;
    }

    function getDataById() {

      var deferred =$q.defer();

      $ionicLoading.show({ templateUrl: 'templates/loading.html'});

      $http.get(url + currentLabId).success(function(data, status){
        var dataHttpDet = {'dataHttpDet': data.games, 'dataAtual': new Date()};
        window.localStorage.setItem("dataHttpDet", JSON.stringify(dataHttpDet, status));
        $ionicLoading.hide();
        deferred.resolve(dataHttpDet);
        console.log("Serviço Http detalhes Com Sucesso....");
      }).error(function(data){
        $ionicLoading.hide();
        // An alert dialog
        $ionicPopup.alert({ title: 'Erro!!!', template: 'Verifique a ligação à Internet.'});
        if(window.localStorage.getItem("dataHttpDet") !== undefined) {
          data = JSON.parse(window.localStorage.getItem("dataHttpDet"));
        }
        //deferred.reject(data); //para regeitar a data usar sem LocalStorage
        deferred.resolve(data);
        console.log("Serviço Http detalhes Com Erro....");
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

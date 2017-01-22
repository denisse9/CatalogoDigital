angular.module('app.services', [])

.factory('Api', ['$http','$q','$ionicLoading','$ionicPopup','$rootScope','$interval',function($http, $q, $ionicLoading, $ionicPopup, $rootScope, $interval){


    var currentLabId;
    var url ='http://rds.confidentia.pt:8585/CatalogoAPI/rest/v1/info/';
    var url2 ='http://rds.confidentia.pt:8585/CatalogoAPI/rest/v1/grupos/';

    function getAllData(){

      var deferred =$q.defer();

      $ionicLoading.show({ templateUrl: 'templates/loading.html'});

      $http.get(url).success(function(data){
        var dataAllData = {'dataAllData': data, 'dataAtual': new Date()};
        window.localStorage.setItem("dataAllData", JSON.stringify(dataAllData));

        $ionicLoading.hide();

        deferred.resolve(dataAllData);

        console.log("Serviço Http com sucesso..." + dataAllData);
      }).error(function(data){

        $ionicLoading.hide();
      
        // An alert dialog
        $ionicPopup.alert({ title: 'Erro!!!', template: 'Verifique a ligação à Internet.'});
        if(window.localStorage.getItem("dataAllData") !== undefined) {
          data = JSON.parse(window.localStorage.getItem("dataAllData"));
        }
        //deferred.reject(data); para regeitar a data usar sem LocalStorage
        deferred.resolve(data);
        console.log("Serviço Http com Erro..." + data);
      });
      return deferred.promise;
    }








    function getData(){

      var deferred =$q.defer();

      $ionicLoading.show({ templateUrl: 'templates/loading.html'});

      $http.get(url2).success(function(data){
        var dataHttp = {'dataHttp': data, 'dataAtual': new Date()};
        window.localStorage.setItem("dataHttp", JSON.stringify(dataHttp));

        $ionicLoading.hide();

        deferred.resolve(dataHttp);
        $rootScope.progressval = 0;
        console.log("Serviço Http com sucesso...");
      }).error(function(data){
        $ionicLoading.hide();
        $rootScope.progressval = 0;
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

  $ionicLoading.show({ templateUrl: 'templates/loading.html'});

  var deferred =$q.defer();

  $http.get(url2 + currentLabId + '/analises').success(function(data, status){
    var dataHttpDet = {'dataHttpDet': data, 'dataAtual': new Date()};
    window.localStorage.setItem("dataHttpDet", JSON.stringify(dataHttpDet, status));
    $ionicLoading.hide();
    
    deferred.resolve(dataHttpDet);
    console.log("Serviço Http detalhes Com Sucesso...." + dataHttpDet);
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
      getAllData: getAllData,
      getData: getData,
      getDataById: getDataById,
      setLabId : setLabId
    };

  }])

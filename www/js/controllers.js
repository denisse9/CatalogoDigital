angular.module('app.controllers', [])

.controller('pesquisaCtrl', ['$scope','$ionicScrollDelegate','$rootScope','$stateParams', '$state', '$ionicPopup','Api',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $ionicScrollDelegate, $rootScope, $stateParams, $state, $ionicPopup, Api) {

  $scope.show = true;

   $scope.onSearchChange = function () {
     $scope.show = false;
}

    // passa informação para o scope
    Api.getData().then(function(data) {
        $scope.confidentia = data.dataHttp;
        $scope.dataAtual = data.dataAtual;
        console.log("Informação da Api...");
  })

      Api.getAllData().then(function(data){
        $scope.pesquisa = data.dataAllData;
      })

   

 $scope.doRefresh =function() {
    Api.getData().then(function(data) {
      if(data !== null) {
        $scope.confidentia = data.dataHttp;
        $scope.dataAtual = data.dataAtual;
        console.log("Informação da Api...");
      }else{
          $scope.confidentia = window.localStorage.getItem("dataHttp");
          $scope.pesquisa = window.localStorage.getItem("dataAllData");
          console.log("Atuliza do ficheiro localStorage.... ");
      }
    })
      $scope.$broadcast("scroll.refreshComplete");
    };


  // passa id para a Api e muda para pagina detalhes
  $scope.PassaId = function(id){
    Api.setLabId(id);
    $state.go('page1.detalhes');
  }

$scope.apagar = function () {
  $scope.search ='';
  $scope.show = true;
}


}])

.controller('favoritosCtrl', ['$scope', '$stateParams','$ionicPopup', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $ionicPopup) {

var fav = JSON.parse(window.localStorage.getItem("favoritos"))||[];

if (fav.length == 0) {
    $ionicPopup.alert({
      title: 'Informação...',
      template: 'Ainda não adicionou analises aos favoritos!!!'
    });
    console.log(fav);
  } else {
    $scope.favoritos = fav;
    console.log(fav);
  }

// adiciona e remove favoritos do ficheiro JSON-Favoritos
$scope.GuardaFavorito = function(item) {
  var favoritos = JSON.parse(window.localStorage.getItem("favoritos")) || [];
  if (item.added) {
    favoritos.push(item);
    window.localStorage.setItem("favoritos", JSON.stringify(favoritos));
    console.log("Adicionei artigo", favoritos);
  } else {
    var index = favoritos.indexOf(item);
    favoritos.splice(index, 1);
    window.localStorage.setItem("favoritos", JSON.stringify(favoritos));
    console.log("Removi artigo", favoritos);
  }
  item.added = !item.added;
}


// atualiza os dados no tab favoritos
$scope.doRefresh = function() {
  var fav = JSON.parse(window.localStorage.getItem("favoritos")) || [];
  if (fav.length == 0) {
    $ionicPopup.alert({
      title: 'Informação...',
      template: 'Ainda não adicionou analises aos favoritos!!!'
    });
    $scope.favoritos = JSON.parse(window.localStorage.getItem("favoritos"));
    console.log(fav);
  } else {
    $scope.favoritos = JSON.parse(window.localStorage.getItem("favoritos"));
    console.log(fav);
  }
  $scope.$broadcast("scroll.refreshComplete");
};

}])

.controller('atualizarCtrl', ['$scope', '$stateParams','$interval', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $interval) {

  $scope.progressval = 0;
  $scope.stopinterval = null;


  function startprogress()
  {
    $scope.progressval = 0;

    if ($scope.stopinterval)
    {
      $interval.cancel($scope.stopinterval);
    }

    $scope.stopinterval = $interval(function() {
      $scope.progressval = $scope.progressval + 1;
      if( $scope.progressval >= 100 ) {
        $interval.cancel($scope.stopinterval);
        //$state.go('second');
        return;
      }
    }, 100);
  }
  startprogress();


  $scope.doRefresh = function()
  {
    startprogress();
    $scope.$broadcast("scroll.refreshComplete");
  }



}])

.controller('menuCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('perfilCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('sobreCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('laboratorioCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('centrosDeColheitaCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('detalhes2Ctrl', ['$scope','$state', '$stateParams','Api', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope,$state, $stateParams, Api) {

   Api.getDataById().then(function(data) {
      $scope.confidentia = data.dataHttpDet;
      $scope.grupo=data.dataHttpDet.grupo;
      console.log("Usar Http para detalhes222..." + data.grupo);
  });


    

}])


.controller('detalhesCtrl', ['$scope','$state','$stateParams','$ionicPopup','Api',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $state, $stateParams, $ionicPopup, Api) {

  $scope.apagar = function () {
    $scope.search = '';
  }

//passa informação para a pagina com id
  Api.getDataById().then(function(data) {
      $scope.confidentia = data.dataHttpDet;
      console.log("Usar Http para detalhes...");
  });


/*$scope.Go = function(codigo){
  Api.getAid
  $state.go('detalhes2');
}*/


// passa id para a Api e muda para pagina detalhes
  $scope.Go = function(codigo){
    Api.setLabId(codigo);
    $state.go('page1.detalhes2');
  }

// adiciona e remove favoritos no ficheiro JSON-Favoritos
$scope.GuardaFavorito = function(item) {
  var favoritos = JSON.parse(window.localStorage.getItem("favoritos")) || [];

  if (!item.added) {
    favoritos.push(item);
    window.localStorage.setItem("favoritos", JSON.stringify(favoritos));
    console.log("Adicionei artigo", favoritos);
  } else {
    var index = favoritos.indexOf(item);
    favoritos.splice(index, 1);
    window.localStorage.setItem("favoritos", JSON.stringify(favoritos));
    console.log("Removi artigo", favoritos);
  }
  item.added = !item.added;
}

}])

.controller('loginCtrl', ['$scope', '$stateParams',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {

  $scope.Email = function() {
          if(window.plugins && window.plugins.emailComposer) {
              window.plugins.emailComposer.showEmailComposerWithCallback(function(result) {
                  console.log("Response -> " + result);
              },
              "Pedido de acesso!", // Subject
              "",                      // Body
              ["suporte@confidentia.pt"],    // To
              null,                    // CC
              null,                    // BCC
              false,                   // isHTML
              null,                    // Attachments
              null);                   // Attachment Data
          }
      };

}])

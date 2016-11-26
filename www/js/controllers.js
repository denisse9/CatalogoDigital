angular.module('app.controllers', [])

.controller('pesquisaCtrl', ['$scope','$stateParams','$state','$ionicFilterBar','$ionicPopup','Api',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state, $ionicFilterBar,$ionicPopup,Api) {

    // passa informação para o scope
    Api.getData().then(function(data) {
      if(data !== null) {
        $scope.confidentia = data;
        console.log("Usar http");
      }else{
          $scope.confidentia = JSON.parse(window.localStorage.getItem("Api"));
          console.log("Usar LocalStorage");
      }
  })

  $scope.doRefresh =function() {
    $scope.confidentia = JSON.parse(window.localStorage.getItem("Api"));
    $scope.$broadcast("scroll.refreshComplete");
    console.log(Api);
  };


  // passa id para a Api e muda para pagina detalhes
  $scope.PassaId = function(id){
    Api.setLabId(id);
    $state.go('page1.detalhes');
  }


      //barra de pesquisa
    var filterBarInstance;
    $scope.showFilterBar = function () {
        filterBarInstance = $ionicFilterBar.show({
          items: $scope.confidentia,
          update: function (filteredItems, filterText) {
            $scope.confidentia = filteredItems;
            if (filterText) {
              console.log(filterText);
            }
          }
        });
      };
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

.controller('atualizarCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


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

.controller('detalhesCtrl', ['$scope', '$stateParams','$ionicFilterBar','$ionicPopup','Api',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $ionicFilterBar, $ionicPopup,Api) {



  //barra de pesquisa
var filterBarInstance;
$scope.showFilterBar = function () {
    filterBarInstance = $ionicFilterBar.show({
      items: $scope.confidentia,
      update: function (filteredItems, filterText) {
        $scope.confidentia = filteredItems;
        if (filterText) {
          console.log(filterText);
        }
      }
    });
  };

//passa informação para a pagina com id
  Api.getDataById().then(function(data) {
    if(data !== null) {
      $scope.confidentia = data.games;
        console.log("Usar Http");
      }else {
        $scope.confidentia = JSON.parse(window.localStorage.getItem("ApiDet"));
        console.log("Usar LocalStorage");
      }

  });

 // atualiza com informação guardada do ficheiro JSON-ApiDet
  $scope.doRefresh =function() {
    $scope.confidentia = JSON.parse(window.localStorage.getItem("ApiDet"));
    $scope.$broadcast("scroll.refreshComplete");
  };


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

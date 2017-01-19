angular.module('app.directives', [])

.directive('scrollWatch', [function($rootScope){
  return function(scope, elem, attr) {
          var start = 0;
          var threshold = 150;

          elem.bind('scroll', function(e) {
              if(e.detail.scrollTop - start > threshold) {
                  $rootScope.slideHeader = true;
              } else {
                  $rootScope.slideHeader = false;
              }
              console.log('e'+ e.detail.scrollTop);
              if ($rootScope.slideHeaderPrevious  >= e.detail.scrollTop - start) {
                  $rootScope.slideHeader = false;
              }
              console.log($rootScope.slideHeader);
              $rootScope.slideHeaderPrevious = $(document).height()-e.detail.scrollTop - e.detail.height();
              $rootScope.$apply();
          });
      };
}]);

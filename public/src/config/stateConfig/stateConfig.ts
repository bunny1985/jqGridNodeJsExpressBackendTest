export function provideState($stateProvider, $urlRouterProvider, $locationProvider){
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/");

  // Now set up the states
  $stateProvider
    .state('home', {
      url: '/',
      component: "ingApp"
    })
    .state('home.grid', {
      url: 'grid',
      component: "grid"
    });

    var errorResolves  = { msg: function ($stateParams) {return  $stateParams.message; }};
    errorResolves.msg.$inject = ['$stateParams'];
    
    $stateProvider.state('error', {
      url: '/err/:message',
      component: "ingError" , 
      resolve: errorResolves
    });
}
provideState.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
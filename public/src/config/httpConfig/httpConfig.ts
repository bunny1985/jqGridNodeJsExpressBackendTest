export function appHttpConfig($httpProvider) {
  $httpProvider.defaults.withCredentials = true;
  $httpProvider.defaults.headers.common['Content-Type'] = 'application/json';
}
appHttpConfig.$inject = ['$httpProvider'];
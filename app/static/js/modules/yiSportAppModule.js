/**
 * Created by Calin on 7/23/2016.
 */
angular.module('yiSportApp', [])
    .factory('loginService', loginService)
    .controller('loginController', loginController)
    .controller('indexController', indexController)
    .directive('editField', editField)
    .directive('customLayout', customLayout);
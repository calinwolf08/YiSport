/**
 * Created by Calin on 7/23/2016.
 */
angular.module('yiSportApp', [])
    .factory('postsService', ['$http', postsService])

    .controller('indexController', indexController)

    .directive('editField', editField)
    .directive('customLayout', customLayout);
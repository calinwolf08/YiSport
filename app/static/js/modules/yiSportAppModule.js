/**
 * Created by Calin on 7/23/2016.
 */
angular.module('yiSportApp', [])
    .factory('postsService', ['$http', postsService])

    .filter('capitalize', capitalize)

    .controller('indexController', indexController)
    .controller('aboutController', aboutController)
    .controller('contactController', contactController)

    .directive('slideShow', ['postsService', slideShow])
    .directive('editField', ['postsService', editField])
    .directive('customLayout', customLayout);
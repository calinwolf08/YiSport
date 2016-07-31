/**
 * Created by Calin on 7/19/2016.
 */
function loginController($scope, $http, loginService) {

    $scope.loginForm = {
        email: '',
        password: ''
    };

    /*$scope.submitLoginForm = function () {
        loginService.submitLoginForm($scope.loginForm)
            .then(function (data) {
                alert(data);
            });
    }*/
}

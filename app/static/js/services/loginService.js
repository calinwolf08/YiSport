/**
 * Created by Calin on 7/19/2016.
 */
function loginService($q, $http) {

    return {
        submitLoginForm: function (loginForm) {
            return $http.post("/signIn", loginForm)
                .then(function (response) {
                        return response.data;
                    }
                    , function (response) {
                        console.log('failed to login');
                        return response.data;
                    });
        }
    }
}
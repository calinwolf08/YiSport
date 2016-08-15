/**
 * contact page controller
 */
function contactController($scope) {
    $scope.nameSubject = "";
    $scope.emailAddress = "";
    $scope.emailMessage = "";

    $scope.errorMessage = "";
    $scope.showErrorMessage = false;

    $scope.sendEmail = function() {
        $scope.errorMessage = "";

        if ($scope.nameSubject.trim() == "" ||
            $scope.emailAddress.trim() == "" ||
            $scope.emailMessage.trim() == "") {
            
            $scope.errorMessage = "Please fill out all fields.";
        }

        if ($scope.errorMessage.length) {
            $scope.showErrorMessage = true;
        } else {
            $scope.showErrorMessage = false;
        }

    }
}
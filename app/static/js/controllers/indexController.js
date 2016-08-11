/**
 * index page controller
 */
function indexController($scope, postsService) {
    $scope.posts = [];

    $scope.welcomeText = "";
    $scope.welcomeImg = "";

    $scope.valuesText = "";
    $scope.valuesImg = "";

    $scope.testemonialOne = {text : '', author: ''};
    $scope.testemonialTwo = {text : '', author: ''};
    $scope.testemonialThree = {text : '', author: ''};

    $scope.newsText = "";
    $scope.newsImg = "";

    var fetchPosts = function () {
        param = {
            page: 'index'
        };

        postsService.getPostsByPage(param).then(function (data) {
            if (data) {
               $scope.posts = data;
                initializeTextFields();
            } else {
                console.log("error");
            }
        });
    };

    fetchPosts();

    var initializeTextFields = function() {

        for (var i=0; i<$scope.posts.length; i++) {
            var cur = $scope.posts[i];

            switch (cur.title) {
                case 'welcome':
                    if (cur.tag == 'text')
                        $scope.welcomeText = cur.text;
                    else
                        $scope.welcomeImg = cur.text;
                    break;
                case 'values':
                    if (cur.tag == 'text')
                        $scope.valuesText = cur.text;
                    else
                        $scope.valuesImg = cur.text;
                    break;
                case 'testemonial':
                    if ($scope.testemonialOne.text == '') {
                        $scope.testemonialOne.text = cur.text;
                        $scope.testemonialOne.author = cur.author;
                    } else if ($scope.testemonialTwo.text == '') {
                        $scope.testemonialTwo.text = cur.text;
                        $scope.testemonialTwo.author = cur.author;
                    } else if ($scope.testemonialThree.text == '') {
                        $scope.testemonialThree.text = cur.text;
                        $scope.testemonialThree.author = cur.author;
                    }
                    break;
                case 'news':
                    if (cur.tag == 'text')
                        $scope.newsText = cur.text;
                    else
                        $scope.newsImg = cur.text;
                    break;
                default:
                    console.log('Unknown Post: ' + cur);
            }
        }
    }
}
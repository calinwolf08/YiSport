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
            tag: 'index'
        };

        postsService.fetchAllPosts(param).then(function (data) {
            if (data) {
               $scope.posts = data;
                initializeTextFields();
            } else {
                alert("error");
            }
        });
    };

    fetchPosts();

    var initializeTextFields = function() {
        console.log($scope.posts);

        for (var i=0; i<$scope.posts.length; i++) {
            var cur = $scope.posts[i];

            switch (cur.title) {
                case 'welcome':
                    $scope.welcomeText = cur.text;
                    $scope.welcomeImg = cur.img;
                    break;
                case 'values':
                    $scope.valuesText = cur.text;
                    $scope.valuesImg = cur.img;
                    break;
                case 'testemonialOne':
                    $scope.testemonialOne.text = cur.text;
                    $scope.testemonialOne.author = cur.author;
                    break;
                case 'testemonialTwo':
                    $scope.testemonialTwo.text = cur.text;
                    $scope.testemonialTwo.author = cur.author;
                    break;
                case 'testemonialThree':
                    $scope.testemonialThree.text = cur.text;
                    $scope.testemonialThree.author = cur.author;
                    break;
                case 'news':
                    $scope.newsText = cur.text;
                    $scope.newsImg = cur.img;
                    break;
                default:
                    console.log('Unknown Post: ' + cur);
            }
        }
    }
}
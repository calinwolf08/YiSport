/**
 * index page controller
 */
function indexController($scope, postsService) {
    $scope.posts = [];

    $scope.welcomeText = "welcome to yisport tkd welcome to yisport tkd welcome to yisport tkd";
    $scope.welcomeImg = "static/images/slideshow/kick.jpg";

    $scope.valuesText = "being good and stuff";
    $scope.valuesImg = "static/images/slideshow/bow.jpg";

    $scope.testemonialOne = {text : 'While I’m sure there are many caring coaches and instructors ' +
    'in Seattle, Yi Sport TKD stood out to my wife and I after watching our first class, and ' +
    'seeing the high level of instruction. After seeing the Yi Sport team compete at a local ' +
    'Seattle Tae Kwon Do tournament, we haven’t looked back since and have no doubt about the ' +
    'choice we made for our kids.',
        author: 'Graeme Gibson'};
    $scope.testemonialTwo = {text : 'My son Dante has been with Yi Sports for over two years. ' +
    'He loves being a part of the team. I love it because Coach Lee’s practice focuses on fitness, ' +
    'respect and good sportsmanship. Not only will my son do well at Taekwondo he will excel at any ' +
    'sport he does because of the strength and fitness that Yi Sports is building in him.',
        author: 'Parvana Saladino'};
    $scope.testemonialThree = {text : 'Definitively the best TKD school in Washington. Not just ' +
    'for Sport TKD but for conditioning of the mind and body for kids. One of my favorite aspects ' +
    'of the training are the life lessons that are taught at the end of every class. Respect, confidence, ' +
    'motivation, and self belief are the core teachings at Yi Sport TKD.',
        author: 'Gene Shin'};

    $scope.newsText = "news, dates, etc";
    $scope.newsImg = "static/images/slideshow/trophy.jpg";

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
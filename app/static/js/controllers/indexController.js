/**
 * index page controller
 */
function indexController($scope, postsService) {
    $scope.posts = [];

    $scope.bannerImg = "static/images/post/test.jpg"

    $scope.welcomeText = "welcome to yisport tkd welcome to yisport tkd welcome to yisport tkd";
    $scope.welcomeImg = "static/images/post/kick.jpg";

    $scope.valuesText = "being good and stuff";
    $scope.valuesImg = "static/images/post/bow.jpg";

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
    $scope.newsImg = "static/images/post/trophy.jpg";

    $scope.programText = "just show up";
    $scope.programImg = "static/images/post/bow.jpg";

    $scope.aboutYiSport = "Taekwondo school etc etc taekwondo school etc etc " +
        "taekwondo school etc etc taekwondo school etc etc taekwondo school etc " +
        "etc taekwondo school etc etc taekwondo school etc etc taekwondo school " +
        "etc etc taekwondo school etc etc taekwondo school etc etc taekwondo school " +
        "etc etc taekwondo school etc etc taekwondo school etc etc taekwondo school " +
        "etc etc taekwondo school etc etc taekwondo school etc etc taekwondo school " +
        "etc etc taekwondo school etc etc taekwondo school etc etc taekwondo school " +
        "etc etc taekwondo school etc etc taekwondo school etc etc taekwondo school " +
        "etc etc taekwondo school etc etc taekwondo school etc etc taekwondo school " +
        "etc etc taekwondo school etc etc taekwondo school etc etc taekwondo school " +
        "etc etc taekwondo school etc etc.";

    $scope.lionelLeeText = "Lionel Lee Lionel Lee Lionel Lee Lionel Lee Lionel Lee " +
        "Lionel Lee Lionel Lee Lionel Lee Lionel Lee Lionel Lee Lionel Lee Lionel Lee " +
        "Lionel Lee Lionel Lee Lionel Lee Lionel Lionel Lee Lionel Lee Lionel Lee " +
        "Lionel Lee Lionel Lee Lionel Lionel Lee Lionel Lee Lionel Lee Lionel Lee " +
        "Lionel Lee Lionel Lionel Lee Lionel Lee Lionel Lee Lionel Lee Lionel Lee " +
        "Lionel Lionel Lee Lionel Lee Lionel Lee Lionel Lee Lionel Lee Lionel Lee " +
        "Lionel Lee Lionel Lee Lionel Lee Lionel Lee Lionel Lee Lionel";
    $scope.lionelLeeImage = "static/images/post/bow.jpg";

    $scope.saraGrayText = "Sara Gray Sara Gray Sara Gray Sara Gray Sara Gray Sara Gray" +
        " Sara Gray Sara Gray Sara Gray Sara Gray Sara Gray Sara Gray Sara Gray Sara Gray" +
        " Sara Gray Sara Gray Sara Gray Sara Gray Sara Gray Sara Gray Sara Gray Sara Gray " +
        "Sara Gray Sara Gray Sara Gray Sara Gray Sara Gray Sara Gray Sara Gray Sara Gray " +
        "Sara Gray Sara Gray Sara Gray Sara Gray Sara Gray Sara Gray Sara Gray Sara Gray " +
        "Sara Gray Sara Gray Sara Gray Sara Gray Sara Gray Sara Gray Sara Gray";
    $scope.saraGrayImage = "static/images/post/bow.jpg";

    $scope.khalilButlerText = "Khalil Butler Khalil Butler Khalil Butler Khalil Butler " +
        "Khalil Butler Khalil Butler Khalil Butler Khalil Butler Khalil Butler Khalil Butler " +
        "Khalil Butler Khalil Butler Khalil Butler Khalil Butler Khalil Butler Khalil Butler " +
        "Khalil Butler Khalil Butler Khalil Butler Khalil Butler Khalil Butler";
    $scope.khalilButlerImage = "static/images/post/bow.jpg";

    $scope.isaakBoyanceText = "Isaak Boyance Isaak Boyance Isaak Boyance Isaak Boyance " +
        "Isaak Boyance Isaak Boyance Isaak Boyance Isaak Boyance Isaak Boyance Isaak Boyance " +
        "Isaak Boyance Isaak Boyance Isaak Boyance Isaak Boyance";
    $scope.isaakBoyanceImage = "static/images/post/bow.jpg";

    $scope.images = [];

    var fetchPosts = function (page) {
        param = {
            page: page
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

    fetchPosts('index');
    fetchPosts('about');

    var initializeTextFields = function() {

        for (var i=0; i<$scope.posts.length; i++) {
            var cur = $scope.posts[i];

            switch (cur.title) {
                case 'banner':
                    if ($scope.bannerImg !== cur.text) {
                        $scope.bannerImg = cur.text;
                    }
                    break;
                case 'welcome':
                    if (cur.tag == 'text' && $scope.welcomeText !== cur.text)
                        $scope.welcomeText = cur.text;
                    else if (cur.tag == 'image' && $scope.welcomeImg !== cur.text)
                        $scope.welcomeImg = cur.text;
                    break;
                case 'values':
                    if (cur.tag == 'text' && $scope.valuesText !== cur.text)
                        $scope.valuesText = cur.text;
                    else if (cur.tag == 'image' && $scope.valuesImg !== cur.text)
                        $scope.valuesImg = cur.text;
                    break;
                case 'testemonial':
                    if ($scope.testemonialOne.text == ''  && $scope.testemonialOne !== cur.text) {
                        $scope.testemonialOne.text = cur.text;
                        $scope.testemonialOne.author = cur.author;
                    } else if ($scope.testemonialTwo.text == '' && $scope.testemonialTwo !== cur.text) {
                        $scope.testemonialTwo.text = cur.text;
                        $scope.testemonialTwo.author = cur.author;
                    } else if ($scope.testemonialThree.text == '' && $scope.testemonialThree !== cur.text) {
                        $scope.testemonialThree.text = cur.text;
                        $scope.testemonialThree.author = cur.author;
                    }
                    break;
                case 'news':
                    if (cur.tag == 'text' && $scope.newsText !== cur.text)
                        $scope.newsText = cur.text;
                    else if (cur.tag == 'image' && $scope.newsImg !== cur.text)
                        $scope.newsImg = cur.text;
                    break;
                case 'program':
                    if (cur.tag == 'text' && $scope.programText !== cur.text)
                        $scope.programText = cur.text;
                    else if (cur.tag == 'image' && $scope.programImg !== cur.text)
                        $scope.programImg = cur.text;
                    break;
                case 'about':
                    $scope.aboutYiSport = cur.text;
                    break;
                case 'lionelLee':
                    if (cur.tag == 'text')
                        $scope.lionelLeeText = cur.text;
                    else
                        $scope.lionelLeeImage = cur.text;
                    break;
                case 'saraGray':
                    if (cur.tag == 'text')
                        $scope.saraGrayText = cur.text;
                    else
                        $scope.saraGrayImage = cur.text;
                    break;
                case 'khalilButler':
                    if (cur.tag == 'text')
                        $scope.khalilButlerText = cur.text;
                    else
                        $scope.khalilButlerImage = cur.text;
                    break;
                case 'isaakBoyance':
                    if (cur.tag == 'text')
                        $scope.isaakBoyanceText = cur.text;
                    else
                        $scope.isaakBoyanceImage = cur.text;
                    break;
                default:
                    console.log('Unknown Post: ' + JSON.stringify(cur));
            }
        }
    }
}
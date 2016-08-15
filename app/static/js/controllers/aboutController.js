/**
 * Created by Calin on 8/12/2016.
 */
function aboutController($scope, postsService) {
    $scope.posts = [];

    /**
     * Default posts for about page
     */
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

    var fetchPosts = function () {
        param = {
            page: 'about'
        };

        postsService.getPostsByPage(param).then(function (data) {
            if (data) {
               $scope.posts = data;
                initializeTextFields();
            } else {
                console.log("error loading posts");
            }
        });
    };

    fetchPosts();

    var initializeTextFields = function() {

        for (var i=0; i<$scope.posts.length; i++) {
            var cur = $scope.posts[i];
            switch (cur.title) {
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
                    console.log('Unknown Post: ' + cur);
            }
        }
    }
}
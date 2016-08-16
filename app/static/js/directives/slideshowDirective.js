/**
 * Created by Calin on 8/15/2016.
 */
function slideShow(postsService) {
    return {
        scope : {
            images : '='
        },
        compile : function (scope, element, attributes) {
            return {
                pre : function(scope, elem, attr) {
                    scope.index = 0;
                    scope.pause = false;
                    scope.timeout = 4500;

                    postsService.fetchSlideshowImages()
                        .then(function(data) {
                            if (data.length) {
                                for(var i = 0; i < data.length; i++) {
                                    scope.images.push(data[i]);
                                }
                                
                                $(elem).css('background-image', 'url(' + scope.images[0]['path'] + ')');
                                console.log(scope.images);
                            }
                        });
                },
                post : function(scope, elem, attr) {
                    scope.slideIt = function() {
                        if (scope.pause) {
                            return;
                        }

                        $(elem).fadeOut(750, function() {
                            $(elem).css('background-image', 'url(' + scope.images[scope.index]['path'] + ')');
                            $(elem).fadeIn(750);
                        });

                        scope.index = (scope.index < scope.images.length - 1 ? scope.index + 1 : 0);

                        setTimeout(function() {
                            scope.slideIt();
                        }, scope.timeout);
                    }

                    $(elem).click(function () {
                        if (scope.images.length > 1) {
                            scope.pause = !scope.pause;
                            scope.slideIt();
                        }
                    });

                    setTimeout(function() {
                        if (scope.images.length > 1) {
                            scope.slideIt();
                        }
                    }, scope.timeout);
                }
            }

        }
    }
}
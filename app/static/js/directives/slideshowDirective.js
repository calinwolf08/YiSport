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
                    scope.timeout = 8000;
                    scope.lastPath = '';

                    postsService.fetchSlideshowImages({'getActive' : true})
                        .then(function(data) {
                            if (data && data.length) {
                                for(var i = 0; i < data.length; i++) {
                                    scope.images.push(data[i]);
                                }

                                scope.lastPath = scope.images[0]['path'];
                                $(elem).css('background-image', 'url(' + scope.images[0]['path'] + ')');
                            }
                        });
                },
                post : function(scope, elem, attr) {
                    /**
                     * function to transition to next image in slideshow
                     */
                    scope.slideIt = function() {
                        //don't transition if paused
                        if (scope.pause) {
                            return;
                        }

                        scope.index = (scope.index < scope.images.length - 1 ? scope.index + 1 : 0);

                        var path = scope.images[scope.index]['path'].replace(/[\\]/g, '\\\\');

                        //only change image if paths are different
                        if (scope.lastPath != path) {
                            $(elem).fadeTo(1000, 0, function() {
                                $(elem).css('background-image', 'url(' + path + ')');
                                $(elem).fadeTo(1000, 1, function() {});
                            });

                            scope.lastPath = path;
                        }

                        //call again after set timeout
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
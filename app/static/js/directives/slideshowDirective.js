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
                    scope.index = 1;
                    scope.pause = false;
                    scope.timeout = 4500;

                    postsService.fetchSlideshowImages({'getActive' : true})
                        .then(function(data) {
                            if (data && data.length) {
                                for(var i = 0; i < data.length; i++) {
                                    scope.images.push(data[i]);
                                }
                                
                                $(elem).css('background-image', 'url(' + scope.images[0]['path'] + ')');
                            }
                        });
                },
                post : function(scope, elem, attr) {
                    scope.slideIt = function() {
                        if (scope.pause) {
                            return;
                        }

                        if (scope.images.length > 1) {
                            var path = '';

                            if (scope.index >= scope.images.length) {
                                scope.index = 0;
                            }

                            path = scope.images[scope.index]['path'].replace(/[\\]/g, '\\\\');

                            $(elem).fadeTo(750, 0, function() {
                                $(elem).css('background-image', 'url(' + path + ')');
                                $(elem).fadeTo(750, 1, function() {});
                            });
                        }

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
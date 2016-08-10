/**
 * Created by Calin on 7/26/2016.
 * <div edit-field="text" title="welcome" model="welcomText"></div>
 */
function editField(postsService) {

    return {
        scope : {
            model : '=',    //object that will be edited
            author: '=',    //set if testemonial post or author needed for some reason
            title : '@',    //title of object in database
            tag : '@',      //type of object - img or text
        },
        transclude: true,
        templateUrl: "editField.html",
        compile : function (scope, element, attributes) {
            return {
                pre : function(scope, elem, attr) {
                    $(elem).addClass('editable');
                    scope.posts = [];
                    scope.showNewPostField = false;
                    scope.newPostError = false;

                    scope.selectedRow = 0;

                    scope.imageField = false;
                    scope.textField = false;
                    scope.testemonialField = false;

                    scope.originalModel = scope.model;

                    if (scope.tag == 'text') {
                        scope.textField = true;
                    } else if (scope.tag == 'image') {
                        scope.imageField = true;
                    } else if (scope.tag = 'testemonial') {
                        scope.testemonialField = true;
                        scope.originalAuthor = scope.author;
                    }
                },
                post : function(scope, elem, attr) {

                    elem.bind('mouseenter', function(e) {
                        //show glyphicon
                        $(elem).find('.icon').css('visibility', 'visible');
                    });

                    elem.bind('mouseleave', function(e) {
                        //hide glyphicon
                        $(elem).find('.icon').css('visibility', 'hidden');
                    });

                    var setInitialActive = function(){
                        for (var i = 0; i < scope.posts.length; i++) {
                            if (scope.posts[i].active == true) {
                                var curVal = '';
                                var curModel = '';

                                if (scope.imageField) {
                                    curVal = scope.posts[i].path;
                                } else {
                                    curVal = scope.posts[i].text;
                                }

                                //set row to selected and move to front of list
                                if (curVal == scope.model) {
                                    if (i != 0) {
                                        var curPost = scope.posts[i];
                                        scope.posts.splice(i, 1);
                                        scope.posts.unshift(curPost);
                                    }
                                }
                            }
                        }
                    }
                    
                    scope.savePostChanges = function () {
                        postsService.saveUpdatePosts({'posts' : scope.posts});
                    }
                    
                    scope.addNewPost = function() {
                        var newPost = {};

                        if (scope.testemonialField) {
                            var author = $(elem).find('.newAuthor');

                            if (!author.val()) {
                                scope.newPostError = true;
                                return;
                            } else {
                                scope.newPostError = false;
                            }

                            newPost.author = author.val();
                        }

                        var input = $(elem).find('.newPost');

                        if (!input.val()) {
                            scope.newPostError = true;
                            return;
                        } else {
                            scope.newPostError = false;
                        }

                        newPost.text = input.val();
                        newPost.date_created = 'now';
                        scope.posts.unshift(newPost);

                        scope.toggleSelected(0);
                    }

                    scope.enableNewPostField = function() {
                        scope.showNewPostField = true;
                    }

                    scope.removeNewPosts = function() {
                        for (var i = 0; i < scope.posts.length; i++) {
                            //at the start of original posts
                            if (scope.posts[i].date_created !== 'now') {
                                break;
                            }
                        }

                        scope.posts.splice(0, i);
                        scope.toggleSelected(0);
                    }

                    scope.toggleSelected = function(row) {
                        scope.selectedRow = row;

                        var post = scope.posts[row];

                        if (scope.imageField) {
                            scope.model = post.path;
                        } else {
                            scope.model = post.text;
                        }
                        
                        if (scope.testemonialField) {
                            scope.author = post.author;
                        }
                    }

                    scope.loadPopupData = function() {
                        //load data based on title and tag
                        postsService.fetchPostsByTitleTag({'title': scope.title, 'tag' : scope.tag})
                            .then(function (data) {
                                scope.posts = data;

                                setInitialActive();
                            });
                        
                        $(elem).find('.editFieldModal').modal('show');
                        scope.showNewPostField = false;
                        scope.newPostError = false;
                    };
                }
            }

        }
    }
}
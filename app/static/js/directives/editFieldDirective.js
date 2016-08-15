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
        templateUrl: "directives/editField.html",
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
                    scope.originalPage = '';       //never initialized if no posts have ever been made

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
                                //save original page for new posts
                                if (scope.originalPage == '') {
                                    scope.originalPage = scope.posts[i].page;
                                }

                                var curVal = '';
                                var curModel = '';

                                curVal = scope.posts[i].text;

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
                        if (scope.textField || scope.testemonialField) {
                            postsService.saveUpdatePosts({'posts' : scope.posts});
                        } else if (scope.imageField) {

                            //initialize
                            if (!scope.originalImagePost) {
                                scope.originalImagePost = [fillOutNewPost({})];
                            }

                            scope.originalImagePost[0].active = true;
                            scope.originalImagePost[0].text = scope.model;
                            postsService.saveUpdatePosts({'posts' : scope.originalImagePost});
                        }
                    }

                    var initText = function() {
                        var newPost = {};

                        var input = $(elem).find('.newPost');

                        if (!input.val()) {
                            scope.newPostError = true;
                            scope.errorMessage = "Can't submit empty fields";
                            return null;
                        } else if (input.val().length >= 1500) {
                            scope.newPostError = true;
                            scope.errorMessage = "Message must be less than 1500 characters.\nCurrently at " + input.val().length;
                            return null;
                        }

                        scope.newPostError = false;

                        newPost.text = input.val();

                        return newPost;
                    }

                    var initTestemonial = function() {
                        var newPost = initText();

                        if (!newPost) {
                            return;
                        }

                        var author = $(elem).find('.newAuthor');

                        if (!author.val()) {
                            scope.newPostError = true;
                            scope.errorMessage = "Can't submit empty fields";
                            return;
                        }
                        
                        scope.newPostError = false;

                        newPost.author = author.val();

                        return newPost;
                    }

                    var fillOutNewPost = function(newPost) {
                        newPost.active = true;
                        newPost.date_created = 'now';
                        newPost.title = scope.title;
                        newPost.tag = scope.tag;
                        newPost.page = scope.originalPage;

                        return newPost;
                    }

                    scope.addNewImage = function() {
                        //get image file
                        var file = $(elem).find('.newFile')[0].files[0];
                        var form = new FormData();

                        form.append('file', file);
                        
                        var newPost = {};

                        postsService.saveNewImage(form)
                            .then(function(data) {
                                newPost.text = data;

                                //set this post to original post if it hasn't already been set
                                if (!scope.originalImagePost) {
                                    scope.originalImagePost = [newPost];
                                }

                                newPost = fillOutNewPost(newPost);

                                //add new row
                                scope.posts.unshift(newPost);
                                scope.selectedRow = 0;
                                //update  model
                                scope.toggleSelected(0);

                                return newPost;
                            });
                    }

                    scope.addNewPost = function() {
                        var newPost = {};

                        if (scope.textField) {
                            newPost = initText();
                        }

                        if (scope.testemonialField) {
                            newPost = initTestemonial();
                        }

                        //deselect current row
                        if (scope.posts.length) {
                            scope.posts[scope.selectedRow].active = false;
                        }

                        newPost = fillOutNewPost(newPost);

                        //add new row
                        scope.posts.unshift(newPost);
                        scope.selectedRow = 0;
                        //update  model
                        scope.toggleSelected(0);

                        return newPost;
                    }

                    scope.enableNewPostField = function() {
                        scope.showNewPostField = true;
                    }

                    scope.enterNewPost = function() {
                        scope.showNewPostField = true;
                    }

                    scope.removeNewPosts = function() {
                        for (var i = 0; i < scope.posts.length; i++) {
                            //at the start of original posts
                            if (scope.posts[i].date_created !== 'now') {
                                break;
                            }
                        }

                        if (scope.imageField) {
                            //drop new images from database
                            var imagesToRemove = scope.posts.slice(0, i);

                            postsService.removeImages({'posts' : imagesToRemove})
                                .then(function(data) {
                                    scope.posts.splice(0, i);
                                    scope.posts[0].text = scope.originalModel;
                                    scope.toggleSelected(0);
                                });
                        } else {
                            scope.posts.splice(0, i);
                            scope.toggleSelected(0);
                        }
                    }

                    scope.toggleSelected = function(row) {
                        scope.posts[scope.selectedRow].active = false;
                        scope.selectedRow = row;

                        var post = scope.posts[row];

                        scope.model = post.text;
                        
                        if (scope.testemonialField) {
                            scope.author = post.author;
                        }

                        post.active = true;
                    }

                    scope.loadPopupData = function() {
                        //load data based on title and tag
                        postsService.fetchPostsByTitleTag({'title': scope.title, 'tag' : scope.tag})
                            .then(function (data) {
                                scope.posts = data;
                                setInitialActive();

                                //also fetch images if currently editing an image post
                                if (scope.imageField) {
                                    //only post that should be updated for images, initialize as list for consistency
                                    if (scope.posts.length) {
                                        scope.originalImagePost = [scope.posts[0]];
                                        var param = {'active' : scope.posts[0].text};
                                    } else {
                                        scope.originalImagePost = null;
                                        var param = {'active' : null};
                                    }

                                    //pass in path of current image to avoid refetching it
                                    postsService.fetchImages(param)
                                        .then(function(data) {
                                            //add images to list of data
                                            for (var i = 0; i < data.length; i++) {
                                                scope.posts.push(data[i]);
                                            }
                                        });
                                }
                            },
                            function(data) {
                                console.log('error: ' + data);
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
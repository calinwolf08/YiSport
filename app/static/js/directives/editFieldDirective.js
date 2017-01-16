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
                    scope.slideshowField = false;

                    scope.originalModel = scope.model;
                    scope.originalPage = '';       //never initialized if no posts have ever been made

                    if (scope.tag == 'text') {
                        scope.textField = true;
                    } else if (scope.tag == 'image') {
                        scope.imageField = true;
                    } else if (scope.tag == 'testemonial') {
                        scope.testemonialField = true;
                        scope.originalAuthor = scope.author;
                    } else if (scope.tag == 'slideshow') {
                        scope.slideshowField = true;
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

                    /**
                     * Organizes posts for pop up and stores current page
                     */
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

                    /**
                     * updates posts in database
                     * for images:
                     *      update original image to current selected image
                     */
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

                    /**
                     * Fetch images that arent already in the slideshow
                     */
                    scope.selectExistingImage = function() {

                        postsService.fetchAvailableImages()
                            .then(function(data) {
                                if (data) {
                                    scope.posts = data;
                                }

                                $(elem).find('.selectImageModal').modal('show');
                            });
                    }

                    /**
                     * add existing image to slideshowImages
                     */
                    scope.addExistingImage = function() {
                        var curImage = scope.posts[scope.selectedRow];
                        scope.slideshowImages.push(
                            {
                                'path' : curImage.text,
                                'active' : true,
                                'isNew' : true,
                                'exists' : true
                            });
                    }

                    /**
                     * Add new file to database and modal lists
                     */
                    scope.addNewImage = function() {
                        //get image file
                        var file = $(elem).find('.newFile')[0].files[0];

                        if (!file) {
                            return;
                        }

                        var form = new FormData();

                        form.append('file', file);

                        postsService.saveNewImage(form)
                            .then(function(data) {
                                if (scope.imageField) {
                                    var newPost = {text : data};

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
                                } else if (scope.slideshowField) {
                                    scope.slideshowImages.unshift({'path' : data, 'active' : true, 'isNew' : true});
                                }
                            });
                    }

                    /**
                     * create new text or image post
                     */
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

                    /**
                     * for text fields:
                     *      just remove new posts
                     *      reset original selected post
                     * for image fields:
                     *      remove new images from database
                     *      reset original selected image
                     * for slideshow fields:
                     *      remove new images from database
                     *      remove new images from slideshowImages
                     */
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
                        } else if (scope.textField || scope.testemonialField) {
                            scope.posts.splice(0, i);
                            scope.toggleSelected(0);
                        } else if (scope.slideshowField) {
                            var imagesToRemove = [];

                            //remove images from slideshowImages
                            for (var i = scope.slideshowImages.length - 1; i >= 0; i--) {
                                if (scope.slideshowImages[i].isNew) {
                                    if (!scope.slideshowImages[i].exists) {
                                        imagesToRemove.push({'text' : scope.slideshowImages[i].path});
                                    }

                                    scope.slideshowImages.splice(i, 1);
                                }
                            }

                            //remove image from database
                            postsService.removeImages({'posts' : imagesToRemove});
                        }
                    }

                    /**
                     * replace model images with active images from slideshowImages
                     * update values in slideshow table
                     */
                    scope.updateImageList = function() {
                        var imagesToUpdate = [];
                        scope.model.splice(0, scope.model.length);

                        //update images used in slideshow
                        for (var i = 0; i < scope.slideshowImages.length; i++) {
                            if (scope.slideshowImages[i].active) {
                                scope.model.push(scope.slideshowImages[i]);
                            }
                        }

                        postsService.updateSlideshowImages({'images' : scope.slideshowImages})
                            .then(function() {
                                for (var i = 0; i < scope.slideshowImages.length; i++) {
                                    scope.slideshowImages[i].isNew = false;
                                }
                            });
                    }

                    /**
                     * toggle selected image or post - which updates main view
                     */
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

                    /**
                     * load data for pop ups
                     */
                    scope.loadPopupData = function() {
                        if (!scope.slideshowField) {
                            //load data based on title and tag
                            postsService.fetchPostsByTitleTag({'title': scope.title, 'tag': scope.tag})
                                .then(function (data) {
                                    scope.posts = data;
                                    setInitialActive();

                                    //also fetch images if currently editing an image post
                                    if (scope.imageField) {
                                        //only post that should be updated for images, initialize as list for consistency
                                        if (scope.posts.length) {
                                            scope.originalImagePost = [scope.posts[0]];
                                            var param = {'active': scope.posts[0].text};
                                        } else {
                                            scope.originalImagePost = null;
                                            var param = {'active': null};
                                        }

                                        //pass in path of current image to avoid refetching it
                                        postsService.fetchImages(param)
                                            .then(function (data) {
                                                //add images to list of data
                                                for (var i = 0; i < data.length; i++) {
                                                    scope.posts.push(data[i]);
                                                }
                                            });
                                    }
                                },
                                function (data) {
                                    console.log('error: ' + data);
                                });
                        } else if (!scope.slideshowImages) {
                            postsService.fetchSlideshowImages({'getActive' : false})
                                .then(function (data) {
                                    if (data && data.length) {
                                        scope.slideshowImages = data;
                                    }
                                });
                        }

                        $(elem).find('.editFieldModal').modal('show');
                        scope.showNewPostField = false;
                        scope.newPostError = false;
                    };
                }
            }
        }
    }
}
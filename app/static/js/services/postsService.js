function postsService($http) {
    return {
        getPostsByPage : function(page) {
            return $http.post("/serivce/getPostsByPage", JSON.stringify(page))
                .then(function (response) {
                        return response.data;
                    }
                    ,function (response) {
                        console.log('failed to get posts');
                        return null;
                    });
        },
        fetchPostsByTitleTag : function(data) {
            return $http.post("/serivce/fetchPostsByTitleTag", JSON.stringify(data))
                .then(function (response) {
                        return response.data;
                    }
                    ,function (response) {
                        console.log('failed to get posts');
                        return null;
                    });
        },
        fetchImages : function(data) {
            return $http.post("/serivce/fetchImages", JSON.stringify(data))
                .then(function (response) {
                        return response.data;
                    }
                    ,function (response) {
                        console.log('failed to fetch images');
                        return null;
                    });
        },
        saveUpdatePosts : function(posts) {
            return $http.post("/serivce/saveUpdatePosts", JSON.stringify(posts))
                .then(function (response) {
                        return response.data;
                    }
                    ,function (response) {
                        console.log('failed to save posts');
                        return null;
                    });
        },
        saveNewImage : function(data) {
            return $http({method: 'POST', url: '/serivce/saveNewImage',
                data: data,
                headers: {'Content-Type': undefined},
                transformRequest: angular.identity})
                .then(function(response) {

                    return response.data.path;
                }, function(response) {
                    console.log('error: ' + response.data);
                });
        },
        removeImages : function(data) {
            return $http.post("/serivce/removeImages", JSON.stringify(data))
                .then(function (response) {
                    
                        return response.data;
                    }
                    ,function (response) {
                        console.log('failed to save posts');
                        return null;
                    });
        },
        fetchSlideshowImages : function(data) {
            return $http.post("/serivce/fetchSlideshowImages", JSON.stringify(data))
                .then(function (response) {
                        return response.data;
                    }
                    ,function (response) {
                        console.log('failed to fetch slideshow images');
                        return null;
                    });
        },
        updateSlideshowImages : function(data) {
            return $http.post("/serivce/updateSlideshowImages", JSON.stringify(data))
                .then(function (response) {
                        return response.data;
                    }
                    ,function (response) {
                        console.log('failed to update slideshow images');
                        return null;
                    });
        },
        fetchAvailableImages : function() {
            return $http.post("/serivce/fetchAvailableImages")
                .then(function (response) {
                        return response.data;
                    }
                    ,function (response) {
                        console.log('failed to fetch available images for slideshow');
                        return null;
                    });
        }
    }
}
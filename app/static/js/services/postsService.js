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
        saveImages : function(data) {
            return $http.post("/serivce/saveImages", JSON.stringify(data))
                .then(function (response) {
                        return response.data;
                    }
                    ,function (response) {
                        console.log('failed to save images');
                        return null;
                    });
        }
    }
}
function postsService($http) {
    return {
        getPostsByTag : function(page) {
            return $http.post("/getPostsByTag", JSON.stringify(page))
                .then(function (response) {
                        return response.data;
                    }
                    ,function (response) {
                        console.log('failed to get posts');
                        return null;
                    });
        },
        fetchPostsByTitleTag : function(data) {
            return $http.post("/fetchPostsByTitle", JSON.stringify(data))
                .then(function (response) {
                        return response.data;
                    }
                    ,function (response) {
                        console.log('failed to get posts');
                        return null;
                    });
        },
        saveUpdatePosts : function(posts) {
            return $http.post("/saveUpdatePosts", JSON.stringify(posts))
                .then(function (response) {
                        return response.data;
                    }
                    ,function (response) {
                        console.log('failed to save posts');
                        return null;
                    });
        }
    }
}
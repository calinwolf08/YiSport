function postsService($http) {
    return {
        fetchAllPosts : function(tag) {
            return $http.post("/getposts", JSON.stringify(tag))
                .then(function (response) {
                        return response.data;
                    }
                    ,function (response) {
                        console.log('failed to get posts');
                        return null;
                    });
        }
    }
}
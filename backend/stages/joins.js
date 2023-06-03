module.exports = {
    joinPostUser: [{
        $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "user",
            pipeline: [
                {
                    $project: {
                        firstName: 1,
                        lastName: 1
                    }
                }
            ]
        }
    },
        {$unwind: "$user"}],

    /* POST COLLECTION JOIN */
    joinPostComment: [{
        $lookup: {
            from: "posts",
            localField: "postId",
            foreignField: "_id",
            as: "post"
        }
    }]
}
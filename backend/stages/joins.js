module.exports = {
    joinPostUser: [
        {
            $lookup: {
                from: "users",
                localField: "userId",
                foreignField: "_id",
                as: "user",
                pipeline: [
                    {
                        $project: {
                            firstName: 1,
                            lastName: 1,
                        },
                    },
                ],
            },
        },
        {$unwind: "$user"}],

    /* POST COLLECTION JOIN */
    joinPostComment: [
        {
            $lookup: {
                from: "posts",
                localField: "postId",
                foreignField: "_id",
                as: "post"
            }
        }],
    joinCommentsPost: [
        {
            $lookup: {
                from: "comments",
                localField: "_id",
                foreignField: "postId",
                as: "comments",
                pipeline: [
                    {$sort: {createdAt: -1}},
                    {
                        $project: {
                            updatedAt: 0
                        },
                    },
                ],
            },
        },
    ],

    joinLikesPost: [
        {
            $lookup: {
                from: "likes",
                localField: "_id",
                foreignField: "postId",
                as: "likeInfo",
                pipeline: [
                    {$sort: {createdAt: -1}},
                    {
                        $group: {
                            _id: null,
                            "usersId": {$push: "$userId"},
                            "users": {
                                $push: {
                                    firstName: "$firstName",
                                    lastName: "$lastName",
                                }
                            }
                        }
                    },
                ],
            },
        },
        {$unwind: {path: "$likeInfo", preserveNullAndEmptyArrays: true}},
        {$addFields: {"likeInfo.count": {$size: "$likeInfo.usersId"}}},
        {$project: {"likeInfo._id": 0, reactions: 0}},
    ],
};


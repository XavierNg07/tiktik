export default {
    name: 'post',
    type: 'document',
    title: 'Post',
    fields: [
        {
            name: 'caption',
            type: 'string',
            title: 'Caption'
        },
        {
            name: 'video',
            type: 'file',
            options: {
                hotspot: true,
            },
            title: 'Video'
        },
        {
            name: 'userId',
            type: 'string',
            title: 'User ID'
        },
        {
            name: 'postedBy',
            type: 'postedBy',
            title: 'Posted By'
        },
        {
            name: 'likes',
            type: 'array',
            of: [
                {
                    type: 'reference',
                    to: [{ type: 'user' }],
                },
            ],
            title: 'Likes'
        },
        {
            name: 'comments',
            type: 'array',
            of: [{ type: 'comment' }],
            title: 'Comments'
        },
        {
            name: 'topic',
            type: 'string',
            title: 'Topic'
        },
    ],
};
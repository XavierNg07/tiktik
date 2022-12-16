export const allPostsQuery = () => {
  return `*[_type == "post"] | order(_createdAt desc){
    _id,
     caption,
       video{
        asset->{
          _id,
          url
        }
      },
      userId,
      postedBy->{
        _id,
        name,
        image
      },
    likes,
    comments[]{
      comment,
      _key,
      postedBy->{
      _id,
      name,
      image
    },
    }
  }`;
};

export const postDetailQuery = (postId: string | string[]) => {
  return `*[_type == "post" && _id == '${postId}']{
    _id,
     caption,
       video{
        asset->{
          _id,
          url
        }
      },
      userId,
    postedBy->{
      _id,
      name,
      image
    },
     likes,
    comments[]{
      comment,
      _key,
      postedBy->{
        _ref,
      _id,
    },
    }
  }`;
};

export const searchPostsQuery = (searchTerm: string | string[]) => {
  return `*[_type == "post" && caption match '${searchTerm}*' || topic match '${searchTerm}*'] {
    _id,
     caption,
       video{
        asset->{
          _id,
          url
        }
      },
      userId,
    postedBy->{
      _id,
      name,
      image
    },
likes,
    comments[]{
      comment,
      _key,
      postedBy->{
      _id,
      name,
      image
    },
    }
  }`;
};

export const singleUserQuery = (userId: string | string[]) => {
  return `*[_type == "user" && _id == '${userId}']`;
};

export const allUsersQuery = () => {
  return `*[_type == "user"]`;
};

export const userCreatedPostsQuery = (userId: string | string[]) => {
  return `*[ _type == 'post' && userId == '${userId}'] | order(_createdAt desc){
    _id,
     caption,
       video{
        asset->{
          _id,
          url
        }
      },
      userId,
    postedBy->{
      _id,
      name,
      image
    },
 likes,

    comments[]{
      comment,
      _key,
      postedBy->{
      _id,
      name,
      image
    },
    }
  }`;
};

export const userLikedPostsQuery = (userId: string | string[]) => {
  return `*[_type == 'post' && '${userId}' in likes[]._ref ] | order(_createdAt desc) {
    _id,
     caption,
       video{
        asset->{
          _id,
          url
        }
      },
      userId,
    postedBy->{
      _id,
      name,
      image
    },
 likes,

    comments[]{
      comment,
      _key,
      postedBy->{
      _id,
      name,
      image
    },
    }
  }`;
};

export const topicPostsQuery = (topic: string | string[]) => {
  return `*[_type == "post" && topic match '${topic}*'] {
    _id,
     caption,
       video{
        asset->{
          _id,
          url
        }
      },
      userId,
    postedBy->{
      _id,
      name,
      image
    },
 likes,

    comments[]{
      comment,
      _key,
      postedBy->{
      _id,
      name,
      image
    },
    }
  }`;
};

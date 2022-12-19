import type {NextApiRequest, NextApiResponse} from 'next';
import {client} from '../../../utils/client';
import {singleUserQuery, userCreatedPostsQuery, userLikedPostsQuery} from '../../../utils/queries';

export default async function handler(req : NextApiRequest, res : NextApiResponse){
    if (req.method === 'GET'){
        const {id} : any = req.query;
        const query = singleUserQuery(id);
        const userVideosQuery = userCreatedPostsQuery(id);
        const userLikedVideosQuery = userLikedPostsQuery(id);
        const user = await client.fetch(query);
        const createdPost = await client.fetch(userVideosQuery);
        const likedPost = await client.fetch(userLikedVideosQuery);
        res.status(200).json({user: user[0], createdPost, likedPost});
    }
}
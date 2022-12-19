import React, {useState, useEffect} from 'react';
import Image from 'next/image';
import {GoVerified} from 'react-icons/go';
import axios from 'axios';
import VideoCard from '../../components/VideoCard';
import NoResults from '../../components/NoResults';
import {IUser, Video} from '../../types';
import {BASE_URL} from '../../utils';

interface IProps{
    data: {
        user: IUser,
        createdPost: Video[],
        likedPost: Video[]
    }
}
export default function Profile({data} : IProps){
    const [videos, setVideos] = useState<Video[]>([]);
    const [postedOrLiked, setPostedOrLiked] = useState(true);
    const posted = postedOrLiked ? "border-b-2 border-black" : "text-gray-400";
    const liked = !postedOrLiked ? "border-b-2 border-black" : "text-gray-400";
    const {user, createdPost, likedPost} = data;

    useEffect(() => {
        if (postedOrLiked){
            setVideos(createdPost);
        } else {
            setVideos(likedPost);
        }
    }, [postedOrLiked, createdPost, likedPost]);

    return (
        <div className={"w-full"}>
            <div className={"flex gap-6 md:gap-10 mb-4 bg-white w-full"}>
                <div className={"w-16 h-16 md:w-32 md:h-32"}>
                    <Image src={user.image} width={107} height={107}
                           className={"rounded-full"} alt={"user-profile"}/>
                </div>
                <div className={"flex flex-col justify-center"}>
                    <p className={"md:text-2xl tracking-wider flex gap-1 items-center justify-center text-md font-bold text-primary lowercase"}>
                        {user.name.replaceAll(" ", '')}
                        <GoVerified className={"text-blue-400"}/>
                    </p>
                    <p className={"capitalize md:text-xl text-gray-400 text-xs"}>
                        {user.name}
                    </p>
                </div>
            </div>
            <div>
                <div className={"flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 bg-white w-full"}>
                    <p className={`text-xl font-semibold cursor-pointer mt-2 ${posted}`}
                       onClick={() => setPostedOrLiked(true)}>
                        Videos
                    </p>
                    <p className={`text-xl font-semibold cursor-pointer mt-2 ${liked}`}
                       onClick={() => setPostedOrLiked(false)}>
                        Liked
                    </p>
                </div>
                <div className={"flex gap-6 flex-wrap md:justify-start"}>
                    {videos.length > 0 ? (
                        videos.map((video, index) => (
                            <VideoCard post={video} key={index}/>
                        ))
                    ) : (
                        <NoResults text={`No ${postedOrLiked ? '' : "Liked"} Videos Yet`}/>
                    )}
                </div>
            </div>
        </div>
    )
}

export async function getServerSideProps({params : {id}} : {params : {id : string}}){
    const response = await axios.get(`${BASE_URL}/api/profile/${id}`);
    return {
        props : {data : response.data}
    }
}
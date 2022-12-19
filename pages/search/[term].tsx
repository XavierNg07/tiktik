import React, {useState} from 'react';
import axios from 'axios';
import {BASE_URL} from '../../utils';
import useAuthStore from '../../store/authStore';
import {Video} from '../../types';
import {useRouter} from 'next/router';
import NoResults from "../../components/NoResults";
import VideoCard from "../../components/VideoCard";


export default function Search({videos} : {videos : Video[]}){
    const [accountsOrVideos, setAccountsOrVideos] = useState(true);
    const accounts = accountsOrVideos ? "border-b-2 border-black" : "text-gray-400";
    const postedVideos = !accountsOrVideos? "border-b-2 border-black" : "text-gray-400";
    const {term} = useRouter().query;

    return (
        <div className={"w-full"}>
            <div className={"flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 bg-white w-full"}>
                <p className={`text-xl font-semibold cursor-pointer mt-2 ${accounts}`}
                   onClick={() => setAccountsOrVideos(true)}>
                    Accounts
                </p>
                <p className={`text-xl font-semibold cursor-pointer mt-2 ${postedVideos}`}
                   onClick={() => setAccountsOrVideos(false)}>
                    Videos
                </p>
            </div>
            {accountsOrVideos ? (
                <div>ACCOUNTS</div>
            ) : (
                <div className={"md:mt-16 flex flex-wrap gap-6 md:justify-start"}>
                    {videos.length ? (
                        videos.map((video, index) => (
                            <VideoCard post={video} key={index}/>
                        ))
                        ) : (<NoResults text={`No video results for ${term}`}/>)
                    }
                </div>
            )}
        </div>
    )
}

export async function getServerSideProps({params : {term}} : {params : {term : string}}){
    const response = await axios.get(`${BASE_URL}/api/search/${term}`);
    return {
        props : {videos : response.data}
    }
}
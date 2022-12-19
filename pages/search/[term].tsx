import React, {useState} from 'react';
import axios from 'axios';
import {BASE_URL} from '../../utils';
import useAuthStore from '../../store/authStore';
import {Video} from '../../types';
import {useRouter} from 'next/router';
import NoResults from "../../components/NoResults";
import VideoCard from "../../components/VideoCard";
import Image from "next/image";
import {GoVerified} from "react-icons/go";
import Link from "next/link";


export default function Search({videos} : {videos : Video[]}){
    const [accountsOrVideos, setAccountsOrVideos] = useState(true);
    const accounts = accountsOrVideos ? "border-b-2 border-black" : "text-gray-400";
    const postedVideos = !accountsOrVideos? "border-b-2 border-black" : "text-gray-400";
    const {term} : any = useRouter().query;
    const {allUsers} = useAuthStore();
    const matchedAccounts = allUsers.filter(user => user.name.toLowerCase().includes(term.toLowerCase()));

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
                <div className={"md:mt-16"}>
                    {matchedAccounts.length ? (
                        matchedAccounts.map((user, index) => (
                            <Link href={`/profile/${user._id}`} key={index}>
                                <div className={"flex items-start gap-3"}>
                                    <div>
                                        <Image src={user.image} width={50} height={50}
                                               className={"rounded-full"} alt={"user-profile"} layout={"responsive"}/>
                                    </div>
                                    <div className={"hidden xl:block"}>
                                        <p className={"flex gap-1 items-center text-md font-bold text-primary lowercase"}>
                                            {user.name.replaceAll(" ", '')}
                                            <GoVerified className={"text-blue-400"}/>
                                        </p>
                                        <p className={"capitalize text-gray-400 text-xs"}>
                                            {user.name}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        ))
                    ) : (<NoResults text={`No account results for ${term}`}/>)}
                </div>
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
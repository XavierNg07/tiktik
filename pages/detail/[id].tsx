import React, {useState, useEffect, useRef} from 'react';
import {useRouter} from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import {GoVerified} from 'react-icons/go';
import {MdOutlineCancel} from 'react-icons/md';
import {BsFillPlayFill} from 'react-icons/bs';
import {HiVolumeUp, HiVolumeOff} from 'react-icons/hi';
import axios from 'axios';
import {BASE_URL} from '../../utils';
import {Video} from '../../types';
export default function Detail({postDetails} : {postDetails : Video}){
    const [post, setPost] = useState(postDetails);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);

    function playVid(){
        if (isPlaying){
            videoRef?.current?.pause();
            setIsPlaying(false);
        } else {
            videoRef?.current?.play().then(() => {setIsPlaying(true)});
        }
    }

    useEffect(() => {
        if (post && videoRef?.current){
            videoRef.current.muted = isMuted;
        }
    }, [post, isMuted])

    if (!post) return null;

    return (
        <div className={"flex w-full absolute left-0 top-0 bg-white flex-wrap lg:flex-nowrap"}>
            <div className={"relative flex-2 w-[1000px] lg:w-9/12 flex justify-center " +
                "items-center bg-black"}>
                <div className={"absolute top-6 left-2 lg:left-6 flex gap-6 z-50"}>
                    <p>
                        <MdOutlineCancel className={"text-white text-[35px]"}/>
                    </p>
                </div>
                <div className={"relative"}>
                    <div className={"lg:h-[100vh] h-[60vh]"}>
                        <video src={post.video.asset.url}
                               ref={videoRef} loop onClick={playVid}
                               className={"h-full cursor-pointer"}>
                        </video>
                    </div>
                    <div className={"absolute top-[45%] left-[45%] cursor-pointer"}>
                        {!isPlaying && (
                            <button onClick={playVid}>
                                <BsFillPlayFill className={"text-white text-6xl lg:text-8xl"}/>
                            </button>
                        )}
                    </div>
                </div>
                <div className={"absolute bottom-5 lg:bottom-10 right-5 lg:right-10 cursor-pointer"}>
                    {isMuted ? (
                        <button onClick={() => {setIsMuted(false)}}><HiVolumeOff className="text-white text-2xl lg:text-4xl"/></button>
                    ) : (
                        <button onClick={() => {setIsMuted(true)}}><HiVolumeUp className="text-white text-2xl lg:text-4xl"/></button>
                    )}
                </div>
            </div>
        </div>
    )
}

export async function getServerSideProps({params : {id}} : {params : {id:string}}){
    const {data} = await axios.get(`${BASE_URL}/api/${id}`);
    return {
        props : {postDetails : data}
    }
}
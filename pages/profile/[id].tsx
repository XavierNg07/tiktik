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
    return (
        <div>Profile</div>
    )
}

export async function getServerSideProps({params : {id}} : {params : {id : string}}){
    const response = await axios.get(`${BASE_URL}/profile/${id}`);
    return {
        props : {data : response.data}
    }
}
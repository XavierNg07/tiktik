import axios from 'axios';
import {Video} from '../types';
import NoResults from '../components/NoResults';
import VideoCard from '../components/VideoCard';
import {BASE_URL} from '../utils';

export default function Home({videos} : {videos : Video[]}) {
  return (
    <div className="flex flex-col gap-10 videos h-full">
      {videos.length ? (videos.map((video: Video) => (<VideoCard post={video} key={video._id}/>)))
          : (<NoResults text="No Videos"/>)}
    </div>
  );
}

export async function getServerSideProps({query : {topic}} : {query : {topic : string}}){
  console.log(BASE_URL);
  let response;
  if (topic){
    response = await axios.get(`${BASE_URL}/api/discover/${topic}`);
  } else {
    response = await axios.get(`${BASE_URL}/api/post`);
  }
  return {
    props: {
      videos: response.data
    }
  }
}

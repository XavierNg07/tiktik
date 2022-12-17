import axios from 'axios';
import {Video} from '../types.dev';
import NoResults from '../components/NoResults';
import VideoCard from '../components/VideoCard';

export default function Home({videos} : {videos : Video[]}) {
  return (
    <div className="flex flex-col gap-10 videos h-full">
      {videos.length ? (videos.map((video: Video) => (<VideoCard post={video} key={video._id}/>)))
          : (<NoResults text="No Videos"/>)}
    </div>
  );
}

export const getServerSideProps = async() => {
  const {data} = await axios.get(`http://localhost:3000/api/post`);
  return {
    props: {
      videos: data
    }
  }
}

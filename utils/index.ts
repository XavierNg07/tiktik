import axios from 'axios';
import jwtDecode from 'jwt-decode';
export default async function createOrGetUser(response: any, addUser: any){
  const decoded : {name : string, picture : string, sub:string } = jwtDecode(response.credential);
  const {name, picture, sub} = decoded;

  const user = {
    _id: sub,
    _type: 'user',
    name: name,
    image: picture
  }

  addUser(user);

  await axios.post('http://localhost:3000/api/auth', user);
}
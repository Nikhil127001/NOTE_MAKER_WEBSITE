import RegisterComponent from '../Components/registerComponent';
import axios from 'axios';

const registerUser = async(name,email,password) => {
const {data} = await axios.post('/apiRoutes/userRoutes/createUser',{name,email,password});
sessionStorage.setItem("userInfo", JSON.stringify(data.message));
  if (data.message === 'user created successfully') window.location.href = "/";
  return data;
}
const registeruser = () => {
    return(
        <RegisterComponent registerUser
         = {registerUser}/>
    );
}

export default registeruser;
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setReduxData } from '../Redux/reducers/userReducers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFaceGrinHearts } from '@fortawesome/free-solid-svg-icons'
import '../styles.css';
import axios from 'axios';
const facebookicon = <FontAwesomeIcon className='iconCss' icon={faFaceGrinHearts} style={{ color: "#254b8d", }} />

const LoginComponent = () => {
    const Navigate = useNavigate();


    const [Data, setdata] = useState({ email: '', password: '' });
    const dispatch = useDispatch();
    const getUser = async () => {
        const token = localStorage.getItem('token')

        const config = {
            headers: {
                'token': `${token}`,
                'Content-Type': 'application/json'
            }
        }

        try {
            const response = await axios.get("/apiRoutes/userRoutes/getUser", config)

            const userData = response.data.user;
            // This will log the updated UserData after state update
            sessionStorage.setItem("userData", JSON.stringify(userData));

            if (dispatch(setReduxData(userData))) {
                Navigate('/Notes', { replace: true });
            }
            // Dispatching the action to update the user data in the Redux store
        } catch (err) {
            console.log(err);
        }
    }

    const handleLogin = async () => {

        try {
            const response = await axios.post("/apiRoutes/userRoutes/loginUser", Data)
            console.log('Data posted successfully:', alert(response.data.message));
            localStorage.setItem('token', response.data.token);
            getUser();

        } catch (err) {
            console.log(err);
        }
    }
    return (
        <div>
            <div style={{ width: "350px", height: "450px", marginLeft: "auto", marginRight: "auto", alignItems: "center", paddingTop: "50px", zIndex: '1' }}>
                <div className="card" style={{ width: "350px", height: "450px", alignItems: "center", marginTop: '0px',backgroundColor: "#FFC107"}}>
                    <div style={{ width: "100%" }}><p style={{ fontWeight: "bold", fontSize: "25px", color: "black", marginLeft: "105px", marginTop: "50px" }}>Login Page</p></div>
                    <input onChange={(e) => setdata({ ...Data, email: e.target.value })} className='loginInput' type="email" placeholder="email" />
                    <input onChange={(e) => setdata({ ...Data, password: e.target.value })} className='loginInput' type="password" placeholder="Password" />

                    <Link style={{ width: "75%", marginTop: "20px" }}>
                        <button onClick={handleLogin} style={{ width: "100%", color: "white", fontWeight: "bold" }} type="button" className="btn btn-info">Log in</button>
                    </Link>



                    <ul style={{ display: "flex", marginTop: "20px", listStyleType: "none", alignItems: "center", width: "100%", marginLeft: "57px" }}>
                        <li> <h4 style={{ borderColor: "grey", borderBottom: "1px solid black", width: "100px" }}></h4></li>
                        <li><h6 style={{ width: "37px", padding: "5px", color: "grey" }}>OR</h6></li>
                        <li><h4 style={{ borderColor: "grey", borderBottom: "1px solid black", width: "100px" }}></h4></li>
                    </ul>

                    <div style={{ display: "flex" }}>
                        {facebookicon}
                        <p style={{ marginLeft: "6px", fontWeight: "bold", fontSize: "15px", color: "#254b8d" }}>Log in with Facebook</p>
                    </div>
                    <div><p style={{ fontSize: "17px" }}>Forgot Password?</p></div>
                </div>



            </div>
            <div className="card" style={{ width: "350px", height: "60px", margin: "auto", alignItems: "center", marginTop: "15px" }}>
                <div style={{ display: "flex", margin: "auto", alignItems: "center" }}>
                    <p style={{ fontSize: "17px" }}>Don't have an account? </p><p style={{ marginLeft: "6px", fontWeight: "bold", fontSize: "15px", color: "#254b8d" }} > <Link style={{ textDecoration: "none" }} to={"/Signup"}>Sign up</Link></p>
                </div>
            </div>
            <div className="card" style={{ margin: "auto", alignItems: "center", border: "none", marginTop: "60px" }}>
            </div>
        </div>
    );
}

export default LoginComponent
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFaceGrinHearts } from '@fortawesome/free-solid-svg-icons'
import '../styles.css';
import { Form, Link } from 'react-router-dom';
import axios from 'axios';
const facebookicon = <FontAwesomeIcon className='iconCss' icon={faFaceGrinHearts} style={{ color: "#254b8d", }} />

const RegisterComponent = () => {
    const [data, setdata] = useState({ email: '', name: '', password: '' })
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = async () => {
        const response = await axios.post('/apiRoutes/userRoutes/createUser', data)
        alert(response.data.message);
    }

    return (
        <div>
            <div className="card" style={{ width: "350px", height: "400px", margin: "auto", alignItems: "center", marginTop: "50px", boxShadow: '10', backgroundColor: "#FFC107" }}>

                <div ><p style={{ fontWeight: "bold", fontSize: "25px", color: "black", margin: "auto", marginTop: "40px", marginBottom: "10px" }}>Register Yourself</p></div>
                <form style={{ width: "100%", display: "flex", flexDirection: "column", justifyContent: "center", backgroundColor: "#FFC107" }}>
                    <input style={{ margin: "auto", marginBottom: "5px" }} onChange={(e) => setdata({ ...data, email: e.target.value })} className={"signupinput"} name='email' type="email" placeholder="Email" />
                    <input style={{ margin: "auto", marginBottom: "5px" }} className={"signupinput"} onChange={(e) => setdata({ ...data, name: e.target.value })} name='name' type="name" placeholder="Full Name" />
                    <input style={{ margin: "auto", marginBottom: "5px" }} className={"signupinput"} onChange={(e) => setdata({ ...data, password: e.target.value })} name='password' type="password" placeholder="Password" minLength={8} />
                    <input style={{ margin: "auto", marginBottom: "5px" }} className={"signupinput"} onChange={(e) => setConfirmPassword(e.target.value)} name='confirmPassword' type="password" placeholder="Confirm Password" minLength={8} />
                </form>

                <div style={{ justifyContent: "center" }}></div>
                <p style={{ fontSize: "12px", marginTop: "10px", width: "75%", color: "grey" }}>By signing up, you agree to our <h10 style={{ color: "#254b8d" }}>Terms</h10>  ,<h10 style={{ color: "#254b8d" }}>Privacy Policy</h10> and <h10 style={{ color: "#254b8d" }}>Cookies Policy</h10>.</p>



                <button onClick={handleSubmit} style={{ width: "75%", marginTop: "20px", color: "white", fontWeight: "bold" }} type="button" className="btn btn-info">Sign up</button>

            </div>
            <div className="card" style={{ width: "350px", height: "60px", margin: "auto", alignItems: "center", marginTop: "15px" }}>
                <div style={{ display: "flex", margin: "auto", alignItems: "center" }}>
                    <p style={{ fontSize: "17px" }}>Have an account? </p><p style={{ marginLeft: "6px", fontWeight: "bold", fontSize: "15px", color: "#254b8d", }} ><Link style={{ textDecoration: "none" }} to='/Login'>Log in</Link></p>
                </div>
            </div>
        </div>
    );
}

export default RegisterComponent;
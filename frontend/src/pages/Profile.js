import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setReduxData, unsetReduxData } from "../Redux/reducers/userReducers";
const Profile = () => {

    const User = useSelector((state) => state.userRegisterlogin.data);
    const [userData, setuserData] = useState({ name: ' ', password: ' ' })
    const Navigate = useNavigate();
    const dispatch = useDispatch();

    const handleDelete = async () => {

        try {
            const response = await axios.delete(`/apiRoutes/userRoutes/deleteUser/${User._id}`)
            const out = response.data.message
            alert(out);
            if (out === "user Deleted Successfully") {
                localStorage.removeItem('token');
                sessionStorage.removeItem('userData');
            }
            if (!localStorage.getItem('token')) {
                Navigate('/login', { replace: true });
            }
        } catch (err) {
            console.log(err);
        }
    }


    const handleUpdate = async () => {

        try {
            const response = await axios.put(`/apiRoutes/userRoutes/updateUser/${User._id}`, userData)
            alert(response.data.message)
            Navigate('/login', { replace: true });

        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <div style={{ display: 'flex', alignItems: 'center', flexDirection: "column", justifyContent: 'center' }}>
                <i style={{ fontSize: "200px" }} className="bi bi-person-bounding-box" />
                <h1>Profile</h1>
                <div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">{User.name}</th>
                            </tr>
                            <tr>
                                <th scope="col">Email Id</th>
                                <th scope="col">{User.email}</th>
                            </tr>
                            <tr>
                                <th><button type="button" className="btn btn-dark" data-bs-toggle="modal" data-bs-target="#updateModel">Update Profile</button></th>
                                <th><button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal">Delete Account</button></th>
                            </tr>
                        </thead>
                    </table>
                    <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="exampleModalLabel">Are you sure!, you want to Delete this Account</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-footer">
                                    <button onClick={handleDelete} type="button" className="btn btn-danger">Delete Account</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="updateModel" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Update Profile</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label for="exampleInputEmail1" className="form-label disabled">Name</label>
                                <input type="name" onChange={(e) => setuserData({...userData, name: e.target.value })} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                            </div>
                            <div className="mb-3">
                                <label for="exampleInputPassword1"  className="form-label">Enter New Password</label>
                                <input onChange={(e) => { setuserData({...userData, password: e.target.value }) }} type="password" className="form-control" id="exampleInputPassword1" />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" onClick={handleUpdate} className="btn btn-dark">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile;

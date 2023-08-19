import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { useDispatch } from 'react-redux';
// import { cartUpdate } from '../Redux/reducers/cartreducers';
// import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import ShowNotesComponent from "../Components/showNotesComponent";
import { Link,useNavigate } from 'react-router-dom';
import { unsetReduxData } from '../Redux/reducers/userReducers';

const Note = () => {
    const updateData = useSelector((state) => state.userRegisterlogin.data);
    const Navigate = useNavigate();
    const dispatch =  useDispatch();
    const [Data, setdata] = useState({ title: '', description: '' });
    const [NoteId, setNoteId] = useState("");
    

    const handleOnclick = async () => {
        const config = {
            'Content-Type': 'application/json'
        }

        const requestData = {
            title: Data.title,
            description: Data.description,
            user: {
                _id: updateData._id,
                name: updateData.name
            }
        }
        try {
            const response = await axios.post("/apiRoutes/userRoutes/createNote", requestData, config)
            alert(response.data.message);

            setNoteId(response.data.noteId);
        } catch (err) {
            console.log(err);
        }
    }

    const handleLogOut = () => {
        sessionStorage.removeItem('userData');
        localStorage.removeItem('token');
        if(dispatch(unsetReduxData())){
            alert('Logged out successfully')
        };
        Navigate('/login',{replace : true});
    }

    const updateUserNotes = async () => {

        try {

            const config = {
                'Content-Type': 'application/json'
            }
            const response = await axios.put(`/apiRoutes/userRoutes/updateUserNotes/${NoteId}`, config)
            alert(response.data.message);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        if (NoteId) {
            updateUserNotes();
        }
    }, [NoteId]);

    return (
        <div>
            <div className='side_navbar'>
            <img style={{width: "65px", height: "65px", marginBottom: "20px"}} src={'/Images/logo.png'} alt="no img"/>
                <i className='navItems  bi bi-plus-circle-dotted' type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" />
                <p style={{fontSize: "15px", fontWeight : "bold"}}>create</p>

                <Link className='profile' to={'/'}>
                <i className="navItems  bi bi-house-door"/>
                </Link>
                <p style={{fontSize: "15px", fontWeight : "bold"}}>Home</p>
                
                <i onClick={() =>handleLogOut()} className='navItems  bi bi-box-arrow-right' type="button"/>
                <p style={{fontSize: "15px", fontWeight : "bold"}}>Log out</p>

                <Link className='profile' to={'/profile'} disabled>
                <i style={{bottom: "0px"}} className="navItems  bi bi-person-circle"/>
                </Link>
                <p style={{fontSize: "15px", fontWeight : "bold"}}>Profile</p>
            </div>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Create New Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
                                <input onChange={(e) => setdata({ ...Data, title: e.target.value })} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
                                <textarea onChange={(e) => setdata({ ...Data, description: e.target.value })} className="form-control" placeholder="Give a description" id="floatingTextarea2" ></textarea>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button onClick={handleOnclick} className='allBtn btn btn-secondary' type="button" data-bs-dismiss="modal">Create Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <ShowNotesComponent />

        </div>
    )
}

export default Note;
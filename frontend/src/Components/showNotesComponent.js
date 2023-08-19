import { useSelector } from 'react-redux';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
const ShowNotesComponent = () => {
    const Navigate = useNavigate();
    const [notesData, setNotesData] = useState([])
    const User = useSelector((state) => state.userRegisterlogin.data);

    const getAllNotes = async () => {
        const config = {
            'Content-Type': 'application/json'
        }
        const response = await axios.get(`/apiRoutes/userRoutes/getNotesById/${User._id}`, config)
        const NotesData = response.data.Notes;
        setNotesData(NotesData);
    }

    const handleDeleteNote = async (noteId) => {
        try {
            const response = await axios.delete(`/apiRoutes/userRoutes/deleteNote/${noteId}`);
            setTimeout(() => {
                alert(response.data.message);
            }, 5000)
        } catch (err) {
            console.log(err);
        }
    }


    useEffect(() => {
        if (!User) {
            return Navigate('/login', {replace : true})
        }
        getAllNotes();
    }, [notesData])

    return (
        notesData.length === 0
            ?
            <div style={{ width: "100%", height: "400px", margin: 'auto' , position: 'absolute'}}>
                <h1 style={{ width: '375px', marginTop: "20px", position: 'relative', marginLeft: "40px" }}>Sorry! Nothing to show</h1>
                <h1 style={{ width: '375px', marginTop: "20px", marginLeft: "40px" }}>Create your first Note</h1>
                
            </div>
            :
            <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
                {notesData.map((note, idx) => (
                    <div key={idx} className="card text-bg-warning md-6" style={{ width: "300px", margin: "10px" }}>
                        <div style={{ display: 'flex', flexDirection: "row" }}
                            className="card-header">
                            <div style={{ display: 'flex', flexDirection: "col" }}>
                                <b>Created At :</b>
                                <p>{note.createdAt}</p>
                            </div>
                            <div style={{ display: 'flex', fontSize: "25px", flexDirection: "col" }}>
                                <i onClick={() => {
                                    handleDeleteNote(note._id)
                                }} class="navItems bi bi-trash3-fill" />
                                <i class="navItems bi bi-pencil-square" />
                            </div>
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">{note.title}</h5>
                            <p className="card-text">{note.description}</p>
                        </div>
                    </div>
                ))}

            </div>

    )
}

export default ShowNotesComponent;
import React, { useState, useEffect } from 'react'
import { useParams, Link ,useNavigate} from 'react-router-dom'
import Mofal from '../Mofal';
function NoteCard(props) {
    const [del, setDel] = useState([]);
    const navigate=useNavigate();

    const params = useParams();
    //Function to handle delete............................................................................
    const handleDelete = async (id) => {
        console.log(id, "hii");
        let result = await fetch(`http://localhost:4000/delete/${params.id}`, {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token'),
            },
        });
        result = await result.json();
        setDel(result); 
        props.setFlag(prop => !prop);
    }

    return (
        <>
            <div>
                <div className="card" style={{ "width": "400px", "height": "200px", "margin": "20px 20px", "justifyContent": 'space-around' }}>
                    <div className="card-body">
                        <h5 className="card-title">{props.title}</h5>
                        <h6 className="card-subtitle mb-2 text-body-secondary">{props.tag}</h6>
                        <p className="card-text">{props.description}</p>
                        {/* <button onClick={() => handleDelete((props.id))} className='deleteNote'>Delete Note</button> */}
                        <i style={{ "marginLeft": "10%", "cursor": "pointer" }} onClick={() => handleDelete((props.id))} className="fa-sharp fa-solid fa-trash"></i>
                        {/* <i type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" style={{ "marginLeft": "70%", "cursor": "pointer" }} onClick={() => handleEdit((props.id))} className="primary fa-sharp fa-solid fa-pen-to-square"></i> */}
                        <Link to={`/modal/${props.id}` }>update</Link>
                    </div>

                </div>
            </div>
        </>
    )
}

export default NoteCard
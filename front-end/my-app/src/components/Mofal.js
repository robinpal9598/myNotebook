import React from 'react'
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'

function Mofal() {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [tag, setTag] = useState("");

    const navigate = useNavigate();
    const params = useParams();
    //Function to get the specific note using the get method (to update the note) ...........................................................

    useEffect(() => {
        handleEdit()
    }, [])

    let handleEdit = async () => {
       
        // console.log(id, "this is id");
        let result = await fetch(`http://localhost:4000/fetchNote/${params.id}`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token'),
            },
        });

        result = await result.json();
        setTitle(result.title);
        setDescription(result.description);
        setTag(result.tag);
    }

    //Function to UPDATE the notes using the PUT method......................................................................................
    let token=localStorage.getItem('token')
    const changeNote = async (e) => {
        e.preventDefault();
        console.log(params.id, "hello updating the note");
        let result = await fetch(`http://localhost:4000/updateNote/${params.id}`, {
            method: 'put',
            body: JSON.stringify({ title, description, tag }),
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token'),
            }
        });
        localStorage.getItem('token');
        result = await result.json();
        console.log({ result });
        navigate('/');
    }
    return (
        <div>


            <form style={{ "width": "400px", "margin": "auto", "border": "1px solid grey ", "padding": "20px 20px" }}>
                <div className="mb-3" >

                    <label htmlFor="exampleInputEmail1" className="form-label"><h3>Title</h3></label>
                    <input type="text" onChange={(e) => { setTitle(e.target.value) }} placeholder='Enter the title' value={title} className="form-control" aria-describedby="text" />
                    <div id="emailHelp" className="form-text"></div>
                </div>
                <div className="mb-3" >
                    <label htmlFor="exampleInputPassword1" className="form-label " ><h3>Description</h3></label>
                    <input type="text" onChange={(e) => { setDescription(e.target.value) }} placeholder='Enter the title' value={description} style={{ "height": "50px" }} className="form-control" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label"><h3>Tag</h3></label>
                    <input type="text" onChange={(e) => { setTag(e.target.value) }} placeholder='Enter the title' value={tag} className="form-control" />
                </div>
                <button onClick={changeNote} className="btn btn-primary" >Update Note</button>
            </form>


        </div>

    )
}

export default Mofal
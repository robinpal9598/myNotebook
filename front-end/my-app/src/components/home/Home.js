import React, { useEffect } from 'react'
import { useState } from 'react';
import NoteCard from '../notecard/NoteCard';
function Home() {
  const [notes, setNotes] = useState([]);
  const [flag, setFlag] = useState(true);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("");
  const [update, setUpdate] = useState("");
  const [news, setNew] = useState([]);


  useEffect(() => {
    getNotes();
  }, [flag]);

 
  //calling the api to get all the notes..................................................................................................................................
  const getNotes = async () => {
    let result = await fetch('http://localhost:4000/fetchallnotes', {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token'),
      },
    });
    result = await result.json();
    setNotes(result);
    // console.log({ notes });
  }

  //addnote function ............POST call................................................................................................................................
  const addNote = async () => {
    let result = await fetch('http://localhost:4000/addNotes', {
      method: 'post',
      body: JSON.stringify({ title, description, tag }),
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token'),
      },
    });
    result = await result.json();
    // console.log(result);
  }

  return (
    <>
      <div>
        <form style={{ "width": "600px", "margin": "auto", "border": "1px solid grey ", "padding": "20px 20px" }}>
          <div className="mb-3" >
            <label htmlFor="exampleInputEmail1" className="form-label"><h3>Title</h3></label>
            <input type="text" className="form-control" onChange={(e) => { setTitle(e.target.value) }} placeholder='Enter the title' value={title} id="exampleInputEmail1" aria-describedby="text" />
            <div id="emailHelp" className="form-text"></div>
          </div>
          <div className="mb-3" >
            <label htmlFor="exampleInputPassword1" className="form-label " ><h3>Description</h3></label>
            <input type="text" placeholder='Enter the description' onChange={(e) => { setDescription(e.target.value) }} value={description} style={{ "height": "50px" }} className="form-control" />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label"><h3>Tag</h3></label>
            <input type="text" placeholder='Give the tag' onChange={(e) => { setTag(e.target.value) }} value={tag} className="form-control" />
          </div>
          <button onClick={addNote} type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
      <div className="displayNotes" style={{ "display": "flex", "flexDirection": "row", "padding": "20px", "width": "100%", "flexWrap": "wrap", "justifyContent": 'space-around' }}>

        {
          notes.length > 0 ?
            notes.map((item) =>
              <>
                <NoteCard setFlag={setFlag} key={item._id} title={item.title} tag={item.tag} description={item.description} id={item._id} />
              </>
            ) :
            <h1>No Notes found </h1>
        }
      </div>

    </>
  )
}

export default Home;
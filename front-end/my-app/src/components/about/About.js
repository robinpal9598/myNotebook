import React, { useContext, useEffect } from 'react'
import './about.css'
import NoteContext from '../../context/notes/noteContext'
function About() {
    const a = useContext(NoteContext);
    return (
        <div className='about'>
            Welcome to my website! I'm Robin Pal, and I'm a web developer. I created this website to help me keep track of my notes, ideas, and projects. I hope you find it helpful too!
            <br />
            Here are some of the things you can do on this website:<br /><br />

            Create notes: You can create notes for anything, from your grocery list to your latest research project.<br />
            Organize your notes: You can organize your notes by project, topic, or any other way that makes sense to you.📒<br />
            I hope you find my website helpful! If you have any questions, please feel free to contact me.<br />
            Thanks for visiting!❤️
        </div>
    )
}

export default About
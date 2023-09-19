import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
    const [noteList, setNoteList] = useState([]);

    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/notes`)
            .then((response) => setNoteList(response.data))
            .catch((err) => console.log(err));
    }, []);

    const sortNotes = (order) => {
        const sortedNotes = [...noteList];
        sortedNotes.sort((a,b) => {
         const dateA = new Date(a.createdAt);
         const dateB = new Date(b.createdAt);

         return order === 'asc' ? dateA - dateB : dateB - dateA;
        });

        setNoteList(sortedNotes)
    }

    return (
        <div>
            <h1>Note Wall</h1>
            <h4>Leave a note!</h4>
            <Link to={`/api/notes/new`}>New Note</Link>
            <button onClick={() => sortNotes('asc')}>Oldest to Newest</button>
            <button onClick={() => sortNotes('desc')}>Newest to Oldest</button>
            <hr/>
            {noteList.map((oneNote, i) => {
            return (
                <fieldset>
                    <legend><b>{oneNote.title}</b></legend>
                    <p>{oneNote.desc}</p>
                    <p><i>Created at {oneNote.createdAt.slice(0,10)}</i></p>
                    <div>
                        <Link to={`/api/notes/${oneNote._id}/edit`}><button>Edit</button></Link>
                    </div>
                </fieldset>
            )
            }
            )}
        </div>
    )
}

export default Dashboard;
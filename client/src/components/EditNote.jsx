import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const EditNote = () => {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const { id } = useParams();
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/notes/${id}`)
            .then(response => {
                const oneNote = response.data;
                setTitle(oneNote.title);
                setDesc(oneNote.desc)
            })
            .catch((err) => {
                const errResponse = err.response.data.errors;
                const errArray = [];
                for(const key in errResponse) {
                    errArray.push(errResponse[key].message)
                }
                setErrors(errArray);
            })
    }, [id]);

    const onSubmitHandler = e => {
        e.preventDefault();
        axios.put(`http://localhost:8000/api/notes/${id}/edit`, {
            title,
            desc
        })
            .then(response => {
                console.log(response);
                navigate("/");
            })
            .catch((err) => {
                const errResponse = err.response.data.errors;
                const errArray = [];
                for(const key in errResponse) {
                    errArray.push(errResponse[key].message)
                }
                setErrors(errArray);
            })
    }
    const deleteNote = (deleteId) => {
        axios
            .delete(`http://localhost:8000/api/notes/${id}`)
            .then(response => {
                console.log("Note Deleted:", response);
                navigate("/")
            })
            .catch((err) => console.log(err))
    };


    return (
        <>
            <Link to={`/`}>Home</Link>
            <form onSubmit={onSubmitHandler}>
                <p>
                    <label>Title: </label><br />
                    <input type="text" onChange={(e) => setTitle(e.target.value)} value={title} />
                </p>
                <p>
                    <label>Description: </label><br />
                    <textarea onChange={(e) => setDesc(e.target.value)} value={desc} />
                </p>
                <input type="submit" />
            </form>
            <button onClick={deleteNote}>Delete</button>

            {
                errors.map((err, i) => {
                    return <p key={i}>{err}</p>
                })
            }
        </>
    )
}

export default EditNote;

import axios from "axios";
import React, { useState } from "react";
import { Navigate, useNavigate, Link } from "react-router-dom";

const CreateNote = () => {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [errors, setErrors] = useState([]);

    const navigate = useNavigate();

    const submitNote = (e) => {
        e.preventDefault();

        axios
            .post(`http://localhost:8000/api/notes/new`, {
                title,
                desc
            })
            .then(() => navigate("/"))
            .catch((err) => {
                const errResponse = err.response.data.errors;
                const errArray = [];
                for(const key in errResponse) {
                    errArray.push(errResponse[key].message)
                }
                setErrors(errArray);
            })
    }

    return (
        <div>
            <Link to={`/`}>Home</Link>
            <form onSubmit={submitNote}>
                <div>
                    <label>Note Title: </label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <br />
                <div>
                    <label>Description: </label>
                    <textarea rows="5" cols="25" value={desc} onChange={(e) => setDesc(e.target.value)}>
                        {desc}
                    </textarea>
                </div>
                <input type="submit" value="Create Note" />
            </form>

            {
                errors.map((err, i) => {
                    return <p key={i}>{err}</p>
                })
            }
        </div>
    )
}

export default CreateNote


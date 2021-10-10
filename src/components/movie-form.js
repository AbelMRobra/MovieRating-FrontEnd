import React, {useState, useEffect} from "react";
import { API } from "../api-service";
import { useCookies } from "react-cookie";

function MovieForm(props) {

    const [ title, setTitle] = useState("");
    const [ description, setDescription] = useState("");

    const [token] = useCookies(['mr-token']);

    useEffect( () => {
        setTitle(props.movies.title)
        setDescription(props.movies.description)
    }, [props.movies])

    const updateClicked = () => {
        API.updateMovie(props.movies.id, {title, description}, token['mr-token'])
        .then(resp => props.updatedMovie(resp))
    }

    const createClicked = () => {
        API.createMovie({title, description}, token['mr-token'])
        .then(resp => props.movieCreated(resp))
    }

    const isDisable = title.length === 0 || description.length === 0;

    console.log(isDisable);

    return (
        <React.Fragment>
            {props.movies ? (
                <div>
                    <h1>{props.movies.title} edit</h1>
                    <label htmlFor="title">Title</label><br/>
                    <input id="title"
                    placeholder="Title" 
                    type="text" value={title} onChange={ evt => setTitle(evt.target.value)} /><br/>

                    <label htmlFor="description">Description</label><br/>
                    <textarea id="description" 
                    placeholder="Description" 
                    type="text" value={description} onChange={ evt => setDescription(evt.target.value)}></textarea><br/>
                    
                    {props.movies.id ? <button onClick={updateClicked} disabled={isDisable}>Update</button> :
                    <button onClick={createClicked} disabled={isDisable}>Create</button>}
                    
                </div>
            
            ) : null }
            
        </React.Fragment>
    )
}

export default MovieForm;
import { useState, useContext, useRef } from "react";
import getTaskContext from "./getTaskContext";
import { serverHost, port } from './serverConnection'
import ShowError from "./showError";

export default (prop) => {

    let [typeTask, setTypeTask] = useState("")
    let getTasks = useContext(getTaskContext)
    const [serverError, setServerError] = useState(false)


    return <>
        <form onSubmit={(event) => {
            event.preventDefault();
            addTask({ "title": event.target.elements.newTask.value }, getTasks, setServerError);
            setTypeTask('')
        }}>
            <p id="type" style={{visibility: typeTask? 'visible': 'hidden'}} ><strong>typing now:</strong> {typeTask} </p>

            <input value={typeTask} id="newTask" style={{ fontSize: '20px' }} type="text" placeholder="Add a new task"
                autoComplete="off" onChange={(event) => setTypeTask(event.target.value)} />

            <button disabled={!typeTask ? true : false} type="submit" className="add-task"
                style={{ fontSize: '15px', color: 'white', backgroundColor: typeTask ? 'green ' : '#edf5f2' }} >+</button>

            {serverError && <ShowError message="server is down, call 929-651-9180." />}
        </form>
    </>
}

async function addTask(task, getTasks, setServerError) {
    try {
        await fetch(`http://${serverHost}:${port}/tasks`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(task)
        })
        getTasks()
    } catch (error) {
        setServerError(true); setTimeout(() => { setServerError(false) }, 5000);
    }
}
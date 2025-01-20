import { useState, useContext } from "react";
import getTaskContext from "./getTaskContext";
import { serverHost, port } from './serverConnection'
import ShowError from "./showError";

export default (prop) => {
    const [serverError, setServerError] = useState(false)
    let getTasks = useContext(getTaskContext)
    return <>
        <button id={'completedButton' + prop.index} style={{ fontSize: '13px', color: 'white', backgroundColor: 'green' }}
            onClick={async () => { await completed(prop.taskId, getTasks, setServerError) }} className="fa fa-check"></button >
        {serverError ? <ShowError message="server is down, call 929-651-9180." /> : ""}
    </>
}

async function completed(taskId, getTasks, setServerError) {
    try {
        await fetch(`http://${serverHost}:${port}/tasks/${taskId}/completed`, {
            method: 'PATCH',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
        })
        getTasks()
    } catch (error) {
        setServerError(true); setTimeout(() => { setServerError(false) }, 5000);
    }
}
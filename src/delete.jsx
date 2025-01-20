import { useContext } from "react";
import getTaskContext from "./getTaskContext";
import { serverHost, port } from './serverConnection'

export default (prop) => {
    let getTasks = useContext(getTaskContext)
    return <>
        <button id={"deleteButton" + prop.index} style={{ fontSize: '13px', color: 'white', backgroundColor: 'red' }}
            onClick={async () => { await deleteTask(prop.taskId, getTasks) }} className="fa fa-close"></button>

    </>
}

async function deleteTask(taskId, getTasks) {
    if (confirm("sure ?")) {
        try {
            await fetch(`http://${serverHost}:${port}/tasks/${taskId}`, {
                method: 'DELETE',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
            })
            getTasks()
        } catch (error) {
            console.error(error)
        }
    }
}
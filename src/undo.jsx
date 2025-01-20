import { useContext } from "react";
import getTaskContext from "./getTaskContext";
import { serverHost, port } from './serverConnection'

export default (prop) => {
    let getTasks = useContext(getTaskContext)
    return <>
        <button id={'undoButton' + prop.index} style={{ fontSize: '13px', color: 'white', backgroundColor: 'blue' }}
            onClick={async () => { await undo(prop.taskId, getTasks) }} className="fa fa-undo"></button>
    </>
}

async function undo(taskId, getTasks) {
    try {
        await fetch(`http://${serverHost}:${port}/tasks/${taskId}/undo`, {
            method: 'PATCH',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
        })
        getTasks()
    } catch (error) {
        console.error(error)
    }
}
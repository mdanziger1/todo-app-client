import { serverHost, port } from './serverConnection'
import { useContext } from "react";
import getTaskContext from "./getTaskContext";

let style = { fontSize: '13px', color: '#9faccf', backgroundColor: 'white' }
export default (prop) => {
    return <>

        <strong id={"dueP" + prop.index}>Due By:</strong>  <span id={"taskDue" + prop.index}>{prop.due}</span>
        <EditDueForm taskId={prop.taskId} index={prop.index} />
        <button id={"editDueButton" + prop.index} style={style}
            onClick={async () => { editDue(prop.index) }} className="fa fa-edit"></button>

    </>
}

function editDue(index) {
    let taskForm = document.getElementById('taskDue' + index)
    let DueInput = document.getElementById('DueInput' + index)
    document.getElementById('dueP' + index).style.display = 'none'
    document.getElementById('editDueButton' + index).style.display = 'none'
    taskForm.style.display = 'none'
    DueInput.value = taskForm.innerText
    document.getElementById('DueEdit' + index).style.display = 'inline'
    document.getElementById('completedButton' + index).disabled = true;
    document.getElementById('completedButton' + index).style.filter = 'blur(4px)'
    document.getElementById('deleteButton' + index).disabled = true;
    document.getElementById('deleteButton' + index).style.filter = 'blur(4px)'
    document.getElementById('editTopicButton' + index).style.filter = 'blur(1px)'
    document.getElementById('editTopicButton' + index).disabled = true;
}

let EditDueForm = (prop) => {
    let getTasks = useContext(getTaskContext)
    return <>
        <form id={"DueEdit" + prop.index} style={{ display: 'none' }} onSubmit={async (event) => {
            event.preventDefault()
            if (!document.getElementById('DueInput' + prop.index).value) { displayBack(); return }

            await fetch(`http://${serverHost}:${port}/tasks/${prop.taskId}/edit-due`, {
                method: 'PATCH',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ newDue: document.getElementById('DueInput' + prop.index).value })
            })
            await getTasks()
            displayBack()
        }}>
            <input type="datetime-local" id={"DueInput" + prop.index} />
            <label htmlFor="DueInput">
                <button type="submit" style={style} className="fa fa-check"></button>
                <button type="button" style={style} className="fa fa-close" onClick={() => { displayBack() }}></button>
            </label>
        </form >
    </>

    function displayBack() {
        document.getElementById('DueEdit' + prop.index).style.display = 'none'
        document.getElementById('dueP' + prop.index).style.display = 'inline'
        document.getElementById('taskDue' + prop.index).style.display = 'inline'
        document.getElementById('editDueButton' + prop.index).style.display = 'inline'
        document.getElementById('completedButton' + prop.index).disabled = false;
        document.getElementById('completedButton' + prop.index).style.filter = 'blur(0px)'
        document.getElementById('deleteButton' + prop.index).disabled = false;
        document.getElementById('deleteButton' + prop.index).style.filter = 'blur(0px)'
        document.getElementById('editTopicButton' + prop.index).disabled = false;
        document.getElementById('editTopicButton' + prop.index).style.filter = 'blur(0px)'

    }
}
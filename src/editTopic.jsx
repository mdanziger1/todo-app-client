import { serverHost, port } from './serverConnection'
import { useContext } from "react";
import getTaskContext from "./getTaskContext";

let style = { fontSize: '13px', color: '#9faccf', backgroundColor: 'white' }
export default (prop) => {
    return <>
        <EditTopicForm taskId={prop.taskId} index={prop.index} color={prop.color} buttonType={prop.buttonType} />
        <button id={'editTopicButton' + prop.index} style={style}
            onClick={async () => { editTopic(prop.index, prop.buttonType) }} className="fa fa-edit"></button>
    </>
}

function editTopic(index, buttonType) {
    let taskForm = document.querySelectorAll('.taskTopic')[index]
    let topicInput = document.querySelectorAll('.topicInput')[index]
    document.getElementById('editTopicButton' + index).style.display = 'none'
    taskForm.style.display = 'none'
    topicInput.value = taskForm.innerText
    document.querySelectorAll('.topicEdit')[index].style.display = 'inline'
    document.getElementById(buttonType + 'Button' + index).disabled = true
    document.getElementById(buttonType + 'Button' + index).style.filter = 'blur(4px)'
    document.getElementById('deleteButton' + index).disabled = true
    document.getElementById('deleteButton' + index).style.filter = 'blur(4px)'
    let editDueButton = document.getElementById('editDueButton' + index)
    editDueButton && (editDueButton.disabled = true, editDueButton.style.filter = 'blur(1px)')
}

let EditTopicForm = (prop) => {
    let getTasks = useContext(getTaskContext)
    return <>
        <form className="topicEdit" style={{ display: 'none' }} onSubmit={async (event) => {
            event.preventDefault()
            if (!document.querySelectorAll('.topicInput')[prop.index].value) { alert("insert a title"); displayBack(); return }
            if (document.querySelectorAll('.topicInput')[prop.index].value
                != document.querySelectorAll('.taskTopic')[prop.index].innerText) {
                await fetch(`http://${serverHost}:${port}/tasks/${prop.taskId}/edit-title`, {
                    method: 'PATCH',
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ newTitle: document.querySelectorAll('.topicInput')[prop.index].value })
                })
                await getTasks()
            } displayBack()
        }}>
            <input style={{ fontSize: '18px', color: prop.color, border: '0.1' }} className="topicInput" placeholder="re-enter a topic"></input>
            <label htmlFor="topicInput">
                <button type="submit" style={style} className="fa fa-check"></button>
                <button type="button" style={style} className="fa fa-close" onClick={() => { displayBack() }}></button>

            </label>
        </form >
    </>
    function displayBack() {
        document.querySelectorAll('.topicEdit')[prop.index].style.display = 'none'
        document.querySelectorAll('.taskTopic')[prop.index].style.display = 'inline'
        document.getElementById('editTopicButton' + prop.index).style.display = 'inline'
        document.getElementById(prop.buttonType + 'Button' + prop.index).disabled = false
        document.getElementById(prop.buttonType + 'Button' + prop.index).style.filter = 'blur(0px)'
        document.getElementById('deleteButton' + prop.index).disabled = false
        document.getElementById('deleteButton' + prop.index).style.filter = 'blur(0px)'
        let editDueButton = document.getElementById('editDueButton' + prop.index)
        editDueButton && (editDueButton.disabled = false, editDueButton.style.filter = 'blur(0px)')
    }
}
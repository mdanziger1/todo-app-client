import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import Title from "./Title";
import Logout from "./Logout";
import ChangePass from "./ChangePass";
import getTasksContext from './getTaskContext'
import AddTask from "./addTask";
import TaskContainer from "./taskContainer"
import ManageAccount from "./manageAccount";
import { serverHost, port } from './serverConnection'
export default () => {
    let navigate = useNavigate()
    /*     useEffect(() => {
            if (!Cookies.get('user') || !Cookies.get('token')) {
                navigate('/error');
            }
        }, []);
    
        if (!Cookies.get('token') ){ return } */
    const [tasks, setTesks] = useState([])
    const getTasks = async () => {
        try {
            let response = await fetch(`http://${serverHost}:${port}/tasks`, {
                credentials: 'include'
            });
            setTesks(await response.json());
        } catch (error) {
            console.log('error')
            navigate('/error');
        }
    };
    useEffect(() => { getTasks() }, []);
    let countUnDone = 0, countDone = 0
    for (let index = 0; index < tasks.length; index++) {
        tasks[index].done ? countDone++ : countUnDone++
    }

    return <>
        {document.getElementById('main-title').innerText = 'Tasks - ToDoApp'}
        <getTasksContext.Provider value={getTasks}>
            <div style={{ display: 'flex', gap: '10px' }}>
                <ManageAccount />
                <Logout navigate={() => { navigate('/login') }} />
                <ChangePass />
                <button onClick={() => { getTasks() }}>refresh Tasks</button>
            </div>
            <Title />
            <AddTask />
            {countUnDone < 1 && countDone > 1 && <h4>Excellent, you did everything, you have no tasks to do.</h4>}
            {< TaskContainer tasks={tasks} countUnDone={countUnDone} countDone={countDone} />}
            {countUnDone < 1 && countDone < 1 && <h2>write a topic & press + to add a new task</h2>}
        </getTasksContext.Provider>
    </>

}
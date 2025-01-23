import Completed from "./completed"
import Undo from "./undo"
import Delete from "./delete"
import EditTopic from "./editTopic"
import Due from "./editDue"
import { useNavigate } from "react-router-dom"
import ImgTask from './ImgTask'

export default (prop) => {
    let navigate = useNavigate()
    try {
        return <>
            <section style={{ fontSize: '20px' }}>
                {prop.countUnDone > 0 && <span style={{ color: 'darkBlue' }}>You have {prop.countUnDone} tasks to do</span>}
                {prop.countUnDone > 0 && prop.countDone > 0 && <strong> & </strong>}
                {prop.countDone > 0 && <span style={{ color: 'darkGreen' }}>  {prop.countDone} tasks Completed</span>}
                {/* prop.tasks.message && 'jwt malformed' && navigate('/login') */}
                <div >{prop.tasks./* filter(task => !task.done). *//* sort((a, b) => a.id - b.id). */map((task, index) => {
                    return !task.done ? (
                        <div key={task.id} style={{
                            ...new Date(task.due).getTime() < Date.now() ? { color: 'red' } :
                                { color: 'blue' }, padding: '15px', margin: '5px', outline: '1px solid'
                        }}>
                            <span style={{ display: 'block', fontSize: '10px', textAlign: 'left' }}>No: {index + 1}</span>
                            <span style={{ fontSize: '30px' }}><span className="taskTopic">{task.title}</span></span>
                            <EditTopic taskId={task.id} index={index} color={'blue'} buttonType={'completed'} />
                            <br />
                            <strong>Created Date:</strong> {new Date(task.date).toDateString()} <br />
                            <Due due={task.due} taskId={task.id} index={index} />
                            <br />
                            <ImgTask index={index} taskId={task.id} fileName={task.pictureFilename} />
                            <Completed index={index} taskId={task.id} />
                            <Delete index={index} taskId={task.id}  />
                        </div>)
                        :
                        <div key={task.id} style={{ color: 'green', padding: '15px', margin: '5px', outline: '1px solid' }}>
                            <div style={{ color: '#c5ebc3', textDecorationColor: 'green' }}>
                                <span style={{ display: 'block', fontSize: '10px', textAlign: 'left' }}>No: {index + 1}</span>
                                <span style={{ fontSize: '20px' }}><span className="taskTopic">{task.title}</span></span>
                                <EditTopic taskId={task.id} index={index} color={'green'} buttonType={'undo'} />
                                <br /> <span style={{ fontSize: '15px' }}><strong>Created Date:</strong> {new Date(task.date).toDateString()}</span>
                            </div>
                            <ImgTask index={index} taskId={task.id} fileName={task.pictureFilename} />
                            <Undo index={index} taskId={task.id} />
                            <Delete index={index} taskId={task.id} />
                        </div>
                })}
                </div>
            </section >
        </>
    } catch (error) {
        console.error(error)
        navigate('/error');
    }
}
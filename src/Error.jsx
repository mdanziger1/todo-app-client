import { useNavigate } from "react-router-dom";
import Logout from "./Logout";



export default () => {
    let navigate = useNavigate()

    return <>
        <Logout navigate={() => { navigate('/login') }} />
        <h1>ooops.... some error</h1>
        <strong>try log out & log in again</strong>

    </>
}
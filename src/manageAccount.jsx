import { useNavigate } from "react-router-dom";


export default () => {
    const navigate = useNavigate()
    return <>
        <button type="button" className="btn"


            onClick={() => navigate('/user-info')}


            style={{ color: 'white', backgroundColor: 'green' }}>manage accounts</button >
    </>
}
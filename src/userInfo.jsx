import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Cookies from 'js-cookie'
import Logout from "./Logout";
import UploadImg from './uploadImg';

export default () => {
    const navigate = useNavigate()
    try {
        let userInfo = JSON.parse(atob(Cookies.get('user')))
        let address = JSON.parse(userInfo.Address)
        return <>
            <Logout navigate={() => { navigate('/login') }} /> <br />
            <a style={{ cursor: 'pointer', textDecoration: 'underline' }} onClick={() => navigate('/app')}>Back to Dashboard</a>
            < UploadImg profile={userInfo.profile}/>
            <p>Username: {userInfo.user_name}</p>
            <p>First Name: {userInfo.first_name}</p>
            <p>Last Name: {userInfo.last_name}</p>
            <p>Address line 1: {address.addressLine1}</p>
            <p>Address line 2: {address.addressLine2}</p>
            <p>City: {address.city}</p>
            <p>State: {address.state}</p>
            <p>zip Code: {address.postalCode}</p>
            <p>Phone: {userInfo.Phone}</p>
            <p>Email: {userInfo.gmail}</p>
            <p>Date Of Birth: {userInfo.dob ? userInfo.dob : "Not provided"}</p>            
        </>

    } catch (error) {
        useEffect(() => {
            navigate('/error');
        }, []);
    }
}
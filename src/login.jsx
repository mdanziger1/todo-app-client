import { useState, useRef } from "react"
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'
import { serverHost, port } from './serverConnection'
import ShowError from "./showError";

export default () => {
    const [loginError, setLoginError] = useState(false)
    const [serverError, setServerError] = useState(false)
    const [userName, setUserName] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()
    let unElem = useRef(null)
    let pElem = useRef(null)

    return <>
        {document.getElementById('main-title').innerText = 'Login - ToDoApp'}
        <form onSubmit={(event) => {
            event.preventDefault()
            /* let username = event.target.elements.username.value
            let password = event.target.elements.password.value */
            loginButtonClicked(userName, password, navigate, setLoginError, setServerError)

        }}>
            <label htmlFor='username'>User Name: </label>
            <input value={unElem?.target?.value} ref={unElem} id='username' name='username' type='text' placeholder='Please Enter the username'
                onChange={() => setUserName(unElem.current.value.toLocaleLowerCase())} autoComplete="off" />
            <br />
            <label htmlFor='password'>password: </label>
            <input ref={pElem} id='password' name='password' type='password' placeholder='Please Enter the password' autoComplete="on"
                onChange={() => setPassword(pElem.current.value)} />
            <br />
            <button type='submit' disabled={!(userName?.trim() && password)}>login</button>
            <button type="button" onClick={() => { navigate('/sign-up') }} >Create a User</button>
        </form >
        {loginError ? <ShowError message="The information you entered is invalid." /> : ""}
        {serverError ? <ShowError message="server is down, call 929-651-9180." /> : ""}
    </>
}

export async function loginButtonClicked(username, password, navigate, setLoginError, setServerError) {
    Cookies.set('login', 'true', { expires: 0.00002314814 })
    await login(username, password, navigate, setLoginError, setServerError)

}

async function login(username, password, navigate, setLoginError, setServerError) {
    try {
        let res = await fetch(`http://${serverHost}:${port}/users/login`, {
            method: "POST",
            mode: 'cors',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username,
                password
            })
        })
        let result = await res.json();
        if (result.ok) { navigate('/app'); return; }
        if (result.message.includes('Incorrect')) { setLoginError(true); setTimeout(() => { setLoginError(false) }, 5000); return; }
        else { setServerError(true); setTimeout(() => { setServerError(false) }, 5000); return }
    } catch (error) {
        setServerError(true); setTimeout(() => { setServerError(false) }, 5000);
    }
}


/* async function userInfo() {
    try {
        let res = await fetch(`http://${serverHost}:${port}/users/user-info`, {
            credentials: 'include'
        });
        return await res.json()
    } catch (error) {
        console.log(error)
    }
} */
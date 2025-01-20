import Cookies from 'js-cookie'


export default (prop) => {
    return <>
        <button className="btn" onClick={() => logOut(prop.navigate)} style={{ color: 'white', backgroundColor: 'green' }}>log out</button>
    </>
}

async function logOut(navigate) {
    await Cookies.remove('user')
    await Cookies.remove('token')
    /* await fetch('http://localhost:9000/users/logout',
        {
            method: "POST",
            mode: 'cors',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
        }
    ) */
    navigate()

}
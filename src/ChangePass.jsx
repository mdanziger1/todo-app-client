import { serverHost, port } from './serverConnection'
export default (prop) => {

    let buttonStyle = { fontSize: '13px', color: 'green' }
    return <>
        <button type="button" className="btn" onClick={() => document.getElementById('popup-change-pass').style.display = 'block'}
            style={{ color: 'white', backgroundColor: 'green' }}>change password</button >
        <span id="popup-change-pass" style={changePassStyle}>

            <form style={changePassContentStyle} onSubmit={changePass} >
                <input id="cp" type="password" placeholder="Enter the current password" autoComplete="on" />
                <input id="np" type="password" placeholder="Enter the new password" autoComplete="on" />
                <br />  <button style={buttonStyle} type="submit">Change</button>
                <button style={buttonStyle} type="button" onClick={() => { document.getElementById('popup-change-pass').style.display = 'none', document.getElementById('cp').value = "", document.getElementById('np').value = "" }}>Cancel</button>
            </form>
        </span>
    </>

    async function changePass(event) {
        event.preventDefault()
        let cp = event.target.elements.cp.value
        let np = event.target.elements.np.value
        if (!cp || !np) { alert("invalid input"); return }
        try {
            let res = await fetch(`http://${serverHost}:${port}/users/change-pass`, {
                method: 'PATCH',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    "username": `${prop.user}`,
                    "cp": `${cp}`,
                    "newPass": `${np}`
                })
            })

            if (!res.ok) alert('password incorrect')


        } catch (error) {
            console.error(error)
        }
        document.getElementById('popup-change-pass').style.display = 'none', event.target.elements.cp.value = "", event.target.elements.np.value = ""
    }
}


let changePassStyle = {
    outline: '20px',
    display: 'none',
    position: 'fixed',
    left: '0',
    top: '0',
    width: '100%',
    height: '100%',
    overflow: 'auto',
    backgroundColor: 'rgba(0,0,0,0.4)',
}

let changePassContentStyle = {
    backgrounColor: 'white',
    margin: '10% auto',
    padding: '20px',
    border: '1px solid #888888',
    width: '30%',
    fontWeight: 'bolder',
}

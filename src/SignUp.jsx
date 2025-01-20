import { serverHost, port } from './serverConnection';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import ShowError from './showError';
import { loginButtonClicked } from './login';
import { useFormik } from 'formik';
import userSchema from './userSchema'
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";

export default () => {
    const formik = useFormik({
        initialValues: {
            userName: '',
            fname: '',
            lname: '',
            dob: '',
            password: '',
            passwordRepeat: '',
            email: '',
            addressLine1: "",
            addressLine2: '',
            city: '',
            state: '',
            postalCode: '',
            phone: ''
        },
        validationSchema: userSchema
    });

    const navigate = useNavigate();
    const [passType, setPassType] = useState('password');
    const [passTypeRepeat, setPassTypeRepeat] = useState('password');
    const [signUpError, setSignUpError] = useState();
    const [serverError, setServerError] = useState();

    const fields = [
        { name: "userName", label: "user Name", type: 'text', required: true, autoComplete: 'username' },
        { name: "fname", label: "first Name", type: 'text', required: true, autoComplete: 'off' },
        { name: "lname", label: "last Name", type: 'text', required: true, autoComplete: 'off' },
        { name: "email", label: "gmail", type: 'text', required: true, autoComplete: 'off' },
        { name: "dob", label: "Date of Birth", type: 'date', required: false, autoComplete: 'off' },
        { name: "password", label: "password", type: passType, required: true, autoComplete: 'new-password' },
        { name: "passwordRepeat", label: "confirm password", type: passTypeRepeat, required: true, autoComplete: 'new-password' },
        { name: "phone", label: "Phone", type: 'text', required: true, autoComplete: 'off' },
        { name: "addressLine1", label: "Address line 1", type: 'text', required: true, autoComplete: 'on' },
        { name: "addressLine2", label: "Address line 2", type: 'text', required: false, autoComplete: 'on' },
        { name: "city", label: "City", type: 'text', required: true, autoComplete: 'on' },
        { name: "state", label: "State, Province, or Region", type: 'text', required: true, autoComplete: 'on' },
        { name: "postalCode", label: "Postal Code", type: 'text', required: true, autoComplete: 'on' },
    ];
    let address = {
        addressLine1: formik.values.addressLine1,
        addressLine2: formik.values.addressLine2,
        city: formik.values.city,
        state: formik.values.state,
        postalCode: formik.values.postalCode
    }

    return <>
        <a onClick={() => navigate('/login')} style={{ cursor: 'pointer', textDecoration: 'underline' }}>Back to Login</a>
        <h1>Sign Up</h1>
        <form onSubmit={(event) => {
            event.preventDefault()
            signUpFetch(formik.values.userName, formik.values.fname, formik.values.lname, formik.values.dob, formik.values.password, formik.values.email, address, formik.values.phone, navigate, setSignUpError, setServerError, loginButtonClicked)

        }}>

            {fields.map((field, i) => {
                const [icon, setIcon] = useState('inline');
                return (<section key={i}>
                    <label htmlFor={field.name + i}><strong>{field.label}: </strong></label>
                    <input id={field.name + i} name={field.name} type={field.type} placeholder={field.label} autoComplete={field.autoComplete}
                        onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values[field.name]} /* required={field.required} */ />

                    {field.name === 'password' || field.name === 'passwordRepeat' ? <>
                        < FaRegEyeSlash style={{ display: icon }} onMouseDown={() => (
                            field.name === 'password' ? (setPassType('text'), setIcon('none')) : (setPassTypeRepeat('text'), setIcon('none')))} />

                        {<FaRegEye style={{ display: icon === 'inline' ? 'none ' : 'inline' }} onMouseUp={() => (
                            field.name === 'password' ? setPassType('password') : setPassTypeRepeat('password'), setIcon('inline'))} />}
                    </> : ""}

                    {field.required && <span style={{ color: 'red' }}> *</span>}
                    <br />

                    <span style={{ color: 'red' }}>
                        {formik.touched[field.name] ? formik.errors[field.name] ? formik.errors[field.name] : <br /> : <br />}
                    </span>

                </section>)
            })}

            < button type='submit' disabled={(Object.keys(formik.errors).length === 0 && formik.dirty) ? false : true} id='btnESignUp' > Enter</button>
            <button onClick={formik.handleReset} disabled={!formik.dirty}>Reset</button>
        </form >

        {signUpError ? <ShowError message="username aleardy existing." /> : ""
        }
        {serverError ? <ShowError message="server is down, call 929-651-9180." /> : ""}
    </>
}

const signUpFetch = async (username, fname, lname, dob, password, email, address, phone, navigate, setSignUpError, setServerError, loginButtonClicked) => {
    try {
        let result = await fetch(`http://${serverHost}:${port}/users/new`, {
            method: "POST",
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username,
                'first_name': fname,
                'last_name': lname,
                dob,
                password,
                email,
                address,
                phone
            })
        })
        if (!result.ok) { setSignUpError(true); setTimeout(() => { setSignUpError(false) }, 5000); return }
        else { alert("successful"), loginButtonClicked(username, password, navigate) }
    } catch (error) { setServerError(true); setTimeout(() => { setServerError(false) }, 5000); return }
}
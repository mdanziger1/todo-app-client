import { useState, useCallback } from "react";
import { serverHost, port } from './serverConnection';
import { useDropzone } from 'react-dropzone'

export default (props) => {
    const [file, setFile] = useState()
    const [preview, setPreview] = useState(false)
    const [fileReject, setFileReject] = useState(false)
    const [profile, setProfile] = useState(props.profile)
    let reader = new FileReader();

    const onDrop = useCallback(
        acceptedFiles => {
            if (!acceptedFiles[0] || acceptedFiles[0].size > 2e+6) { setFileReject(true); return }
            console.log(acceptedFiles[0].size)
            setFileReject(false)
            setPreview(true)
            setFile(acceptedFiles[0])
            reader.readAsDataURL(acceptedFiles[0])
            reader.onloadend = () => {
                document.getElementById('preview').src = reader.result;
            }
        }, [])

    const uploedProfile = async () => {
        const fd = new FormData()
        fd.append('profile-pctr', file)
        let res = await fetch(`http://${serverHost}:${port}/users/uploed_profile`, {
            method: "POST",
            credentials: 'include',
            body: fd
        })
        setPreview(false)

        let result = await res.json()
        setProfile(result.fileName)
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'image/png': [], 'image/jpeg': [] },
        maxFiles: 1
    })
    return <>
        <section id="uploedSection" style={{ cursor: 'pointer' }}>
            {!profile && <>
                <label htmlFor='profile'> <strong>profile picture: </strong></label>
                <div {...getRootProps()}>
                    <input id='profile' {...getInputProps()} />
                    {isDragActive ? <strong style={{ fontSize: 50 }}>Drop the files here</strong> :
                        <p style={{ fontWeight: "bold", fontStyle: "italic" }}>drop or click select files</p>}
                    {fileReject && <p style={{ color: 'red' }}>only 1 image type and up to 2 MB is allowed</p>}
                </div></>}

            {preview && <>
                <img id="preview" src="" width="250" /> <br />
                <button type="button" onClick={uploedProfile}>submit profile picture</button>
                <button onClick={() => setPreview(false)}>clear</button>
            </>}

            {profile && <><strong>profile picture</strong> <button onClick={() => { setProfile(null) }}>change</button><br />
                <img src={`http://localhost:9000/img-prfl/${profile}`}
                    onMouseOver={(e) => { e.target.width = 200 }} width={70}
                    onMouseOut={(e) => { e.target.width = 70 }} />
            </>}
        </section>
    </>
}



/* onChange={({ target }) => {
    setFile(target.files[0])
    target.files[0] && reader.readAsDataURL(target.files[0]);
    reader.onloadend = () => {
        document.getElementById('preview').src = reader.result;
    }
}} */ 
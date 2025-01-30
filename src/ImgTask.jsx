import { useState, useCallback, useContext } from "react";
import { serverHost, port } from './serverConnection';
import { useDropzone } from 'react-dropzone'
import getTaskContext from "./getTaskContext";


export default (props) => {

    const [preview, setPreview] = useState(false)
    const [file, setFile] = useState(props.fileName)
    const [fileReject, setFileReject] = useState(false)
    let getTasks = useContext(getTaskContext)

    const uploadImg = async () => {
        const fd = new FormData()
        
        fd.append('task-img', file)
        await fetch(`http://${serverHost}:${port}/tasks/${props.taskId}/upload_img`, {
            method: "POST",
            credentials: 'include',
            body: fd
        })
        getTasks()
        setPreview(false)
    }

    const removeImg = async () => {
        await fetch(`http://${serverHost}:${port}/tasks/${props.taskId}/remove_img`, {
            method: "POST",
            credentials: 'include',
        })
    }

    const previewImg = (img) => {
        setPreview(true);
        setFile(img)
        let reader = new FileReader();
        reader.readAsDataURL(img);
        reader.onloadend = () => {
            document.getElementById('preview').src = reader.result;
        }
    };


    const onDrop = useCallback(
        async acceptedFiles => {
            if (!acceptedFiles[0] || acceptedFiles[0].size > 2e+6) { setFileReject(true); return }
            setFileReject(false); /* setFile(acceptedFiles[0]); */
            previewImg(acceptedFiles[0])
        }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'image/png': [], 'image/jpeg': [] },
        maxFiles: 1
    })



    return <>
        {file && !preview && <>
            <img src={`http://${serverHost}:${port}/img-task/${props.fileName}`} width={100} /* height={50} */
                onMouseDown={(e) => { e.target.width = 500 }}
                onMouseUp={(e) => { e.target.width = 100 }}
            />
            <br />
            <button style={{ fontSize: '13px', margin: 5 }} onClick={ () => {  removeImg(), setFile(null) }}>remove picture</button>
            <br />
        </>
        }
        {preview && <>
            <img id="preview" width={300} /><br />
            <button type="button" onClick={uploadImg} className="fa fa-upload" style={{ fontSize: '33px' }} /><br />
        </>}

        {!file && <>
            <div {...getRootProps()}>
                <input id="uploadImg" {...getInputProps()} />
                {isDragActive ? <strong style={{ color: "black", fontSize: 50 }}>Drop the files here</strong> :
                    <span style={{ color: "black", fontSize: 15 }}>drop or click here to upload a task image</span>}
                {fileReject && <p style={{ color: 'red', fontSize: 15 }}>only 1 image type and up to 2 MB is allowed</p>}
            </div>
        </>}
    </>

}
import './PdfPopup.css'
import uploadLogo from '../images/upload.svg'
import { AuthContext } from './Auth';
import { useContext, useEffect, useState } from 'react';
import Loading from './Loading';
import axios from 'axios';


export default function PdfPopup(props) {

    const [token, setToken] = useState('');
    const [isUpdated,setIsUpdated] = useState(true);
    const fileType = props.type;

    const closeHandler = () => {
        props.func(false);
    }

    const auth = useContext(AuthContext);

    const isAdmin = auth.user.isAdmin;

    const getToken = () => {
        let tokenArr = auth.user.tokens;
        console.log(tokenArr[tokenArr.length - 1].token);
        setToken(tokenArr[tokenArr.length - 1].token);
    }

    const saveFile = async () => {

        setIsUpdated(false);
        let file = document.getElementById("fileInp").files[0];
        console.log('inside  ' + file)
        let formdata = new FormData();
        
        formdata.append(`${fileType}`, file);
        

        const config = {
            url : `/${fileType}/upload`,
            method : 'post',
            data: formdata,
            headers : {
                Authorization : `Bearer ${token}`,
            }
        }

        try {
           const res = await axios(config);
           console.log(res.data);
           setIsUpdated(true);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        getToken();
    }, [])


    return (
        <div id="pdfContainer">
            <button id='pdfContainerClose' onClick={closeHandler}>X</button>
            {isAdmin ? <label id='pdfContainerUpload'><input id="fileInp" type="file" name="schedule" accept="application/pdf" onChange={()=>saveFile()} ></input><img src={uploadLogo}></img></label> : <></>}
            {(token === '' || !isUpdated)? <Loading /> : <iframe src={`http://localhost:3000/${fileType}?token=${token}`} width="50%" height="100%"></iframe>}
        </div>
    );
}
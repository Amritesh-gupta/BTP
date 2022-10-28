import { useRef, useState } from "react";
import Webcam from "react-webcam";
import './WebcamPopup.css'
import Loading from './Loading';
import axios from "axios";

const WebcamPopup = (props) => {

    const webcamRef = useRef(null);
    const [imgSrc, setImgSrc] = useState(null);
    const [loading, setLoading] = useState(false);

    const capture = () => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImgSrc(imageSrc);
    }

    const submitHandler = async () => {
        setLoading(true);
        let tokenArr = props.user.tokens;
        let token = tokenArr[tokenArr.length - 1].token;
        
        console.log(token)
        const config = {
            url: '/photo/upload',
            method: 'post',
            data: {
                fileName: 'userPhoto',
                file: imgSrc
            },
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const res = await axios(config);
            console.log(res.data);
        }
        catch (err) {
            console.log(err);
        }

        setLoading(false);
        props.modalShow(false);
        props.collageShow(true);

    }

    const videoConstraints = {
        width: 250,
        height: 250,
        facingMode: "user"
    };

    return (
        <div id="webCamPopupContainer">
            {loading ? <Loading /> : 
            <>
                <div id="webcamFirst">
                    {imgSrc === null ?
                        <Webcam
                            audio={false}
                            height={350}
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                            width={550}
                            videoConstraints={videoConstraints}
                        /> :

                        <img src={imgSrc} id="imagePrev"></img>
                    }
                </div>
                <div id="webcamSecond">
                    {imgSrc === null ? <button onClick={capture} className="webcamBtn">Capture photo</button> :
                        <>
                            <button onClick={() => setImgSrc(null)} className="webcamBtn">Re-Capture photo</button>
                            <button onClick={submitHandler} className="webcamBtn">Submit</button>
                        </>
                    }
                </div>
            </>
            }
        </div>
    );
}

export default WebcamPopup;
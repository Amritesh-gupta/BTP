import { useContext, useEffect, useState } from 'react';
import './Selfiepage.css'
import Modal from "react-modal";
import WebcamPopup from '../../components/WebcamPopup';
import { AuthContext } from '../../components/Auth';
import Loading from '../../components/Loading';
import axios from 'axios';

let len;

const _addcells = ()=>{
    const grid = document.getElementById("grid");
        for (let i = 0; i < 20; i++) {
            for (let j = 0; j < 60; j++) {
                const cell = document.createElement("div");
                const image = document.createElement("img");
                cell.dataset.x = i;
                cell.dataset.y = j;
                cell.append(image);
                grid.append(cell);
            }
        }
}

const addCells = async() => {

    const config = {
        url : '/photo',
        method : 'get'
    }
    
    let buffArr = [];
    const res = await axios(config);
    console.log(res)
    len = Object.keys(res.data).length;
    // console.log(res.data[0].file);

    for(let i=0;i<len;i++){
        buffArr.push(res.data[i].file);
    }
    console.log(buffArr)
        _addcells();
    return buffArr;
    
};

const draw = (buffArr) => {
    let temp = 0, cnt = 0, cnt2 = 0, idx = 0;
    const clr = "orange";

    for (let i = 0; i < 20; i++) {
        cnt = 0; cnt2 = 0;
        for (let j = 0; j < 60; j++) {
            if (i < 10 && j < 15 && cnt < 6) {
                const cell = document.querySelector(
                    `[data-x = "${i}"][data-y = "${j + temp}"]`
                );
                cell.style.backgroundColor = clr;
                if(idx < len) cell.firstElementChild.src = buffArr[idx++];
                cnt++;
            }
            if (i < 10 && j > 23 && cnt2 < 6) {
                const cell = document.querySelector(
                    `[data-x = "${i}"][data-y = "${j - temp}"]`
                );
                cell.style.backgroundColor = clr;
                if(idx < len) cell.firstElementChild.src = buffArr[idx++];
                cnt2++;
            }
            if (i > 9 && i < 19 && j > 11 && j < 18) {
                const cell = document.querySelector(
                    `[data-x = "${i}"][data-y = "${j}"]`
                );
                cell.style.backgroundColor = clr;
            }
            if (i > 16 && j > 8 && j < 21) {
                const cell = document.querySelector(
                    `[data-x = "${i}"][data-y = "${j}"]`
                );
                cell.style.backgroundColor = clr;
            }

            // ==
            if (i > 9 && i < 13 && j > 28 && j < 37) {
                const cell = document.querySelector(
                    `[data-x = "${i}"][data-y = "${j}"]`
                );
                cell.style.backgroundColor = clr;
            }

            //1

            if (i < 19 && j > 39 && j < 44) {
                const cell = document.querySelector(
                    `[data-x = "${i}"][data-y = "${j}"]`
                );
                cell.style.backgroundColor = clr;
            }
            if (i > 16 && j > 36 && j < 47) {
                const cell = document.querySelector(
                    `[data-x = "${i}"][data-y = "${j}"]`
                );
                cell.style.backgroundColor = clr;
            }

            //9
            if (i < 19 && j > 55 && j < 60) {
                const cell = document.querySelector(
                    `[data-x = "${i}"][data-y = "${j}"]`
                );
                cell.style.backgroundColor = clr;
            }
            if (i > 16 && j > 49 && j < 60) {
                const cell = document.querySelector(
                    `[data-x = "${i}"][data-y = "${j}"]`
                );
                cell.style.backgroundColor = clr;
            }
            if (i < 3 && j > 49 && j < 60) {
                const cell = document.querySelector(
                    `[data-x = "${i}"][data-y = "${j}"]`
                );
                cell.style.backgroundColor = clr;
            }
            if (i > 6 && i < 10 && j > 49 && j < 60) {
                const cell = document.querySelector(
                    `[data-x = "${i}"][data-y = "${j}"]`
                );
                cell.style.backgroundColor = clr;
            }
            if (i > 2 && i < 7 && j > 49 && j < 54) {
                const cell = document.querySelector(
                    `[data-x = "${i}"][data-y = "${j}"]`
                );
                cell.style.backgroundColor = clr;
            }
        }
        temp++;
    }
};




function SelfiePage() {

    const [showCollage, setShowCollage] = useState(false);
    const [showModal, setShowModal] = useState(true);
    const [loading, setLoading] = useState(false);

    const auth = useContext(AuthContext);

    useEffect(async() => {
        console.log('IN effect')
        if (showCollage) {
            let arr = await addCells()
            draw(arr);
        }
    }, [showCollage])

    return (
        <div id='selfie_container'>
            {loading ? <Loading /> :
                <>
                    {showCollage ?
                        <div id="selfie_grid_container">
                            <div id="grid"></div>
                            {console.log('IN component')}
                        </div>
                        :
                        <Modal isOpen={showModal}
                            style={
                                {
                                    overlay: {},
                                    content: {
                                        position: null,
                                        top: null,
                                        left: null,
                                        right: null,
                                        bottom: null,
                                        border: null,
                                        background: null,
                                        overflow: null,
                                        WebkitOverflowScrolling: null,
                                        borderRadius: null,
                                        outline: null,
                                        padding: null,
                                    }
                                }
                            }
                        >
                            <WebcamPopup modalShow={setShowModal} collageShow={setShowCollage} user={auth.user} />
                        </Modal>

                    }
                </>
            }
        </div>
    );
}

export default SelfiePage;
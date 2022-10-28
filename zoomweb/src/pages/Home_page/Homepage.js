import "./Homepage.css";
import Header from "../../components/Header.js";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import SideBar from "../../components/SideBar";
import { Route, Routes } from "react-router-dom"
import auditorium from '../../images/auditorium.jpg'
import selfie from '../../images/selfie.jpg'
import schedule from '../../images/schedule.png'
import agenda from '../../images/agenda.png'
import help2 from '../../images/help2.jpg'
import Modal from "react-modal";
import PdfPopup from "../../components/PdfPopup";

function Home() {

  const [isOpen1, setOpen1] = useState(false);
  const [isOpen2, setOpen2] = useState(false);
  const [isOpen3, setOpen3] = useState(false);
  const [isOpen4, setOpen4] = useState(false);
  const [isOpen5, setOpen5] = useState(false);
  const [modalShow, setModalShow] = useState({show : false, type : ""});
  const navigate = useNavigate();


  function classToggle(id) {
    document.getElementById(`${id}`).classList.toggle('active');
  }

  return (
    <div id="home">

      <div id="header">
        <Header />
      </div>

      <SideBar>
        <Routes>
          {/* <Route path="/" element={<Header/>} /> */}
          <Route path="/users" element={<Header />} />
          <Route path="/messages" element={<Header />} />
          <Route path="/analytics" element={<Header />} />
          <Route path="/file-manager" element={<Header />} />
          <Route path="/order" element={<Header />} />
          <Route path="/saved" element={<Header />} />
          <Route path="/settings" element={<Header />} />
        </Routes>
        <div className="bg">
          <div>.</div>
          <div id="card_grid">
            <div id="card1" onClick={() => { classToggle('card1'); setOpen1(!isOpen1) }}>
              <div className="card_upper">
                <img src={auditorium}></img>
              </div>
              <div className="card_lower">
                <h1>Auditorium</h1>
                {isOpen1 && (
                  <button id="room1_btn" onClick={() => navigate('/meeting')} >Join</button>
                )}
              </div>
            </div>
            <div id="card2" onClick={() => { classToggle('card2'); setOpen2(!isOpen2) }}>
              <div className="card_upper">
                <img src={selfie}></img>
              </div>
              <div className="card_lower">
                <h1>Selfie Point</h1>
                {isOpen2 && (
                  <button id="room1_btn" onClick={() => navigate('/selfiepoint')} >Visit</button>
                )}
              </div>
            </div>
            <div id="card3" onClick={() => { classToggle('card3'); setOpen3(!isOpen3) }}>
              <div className="card_upper">
                <img src={schedule}></img>
              </div>
              <div className="card_lower">
                <h1>Schedule</h1>
                {isOpen3 && (
                  <button id="room1_btn" onClick={() => setModalShow({show : true, type : "schedule"})} >See</button>
                )}
              </div>
            </div>
            <div id="card4" onClick={() => { classToggle('card4'); setOpen4(!isOpen4) }}>
              <div className="card_upper">
                <img src={agenda}></img>
              </div>
              <div className="card_lower">
                <h1>Agenda</h1>
                {isOpen4 && (
                  <button id="room1_btn" onClick={() => setModalShow({show : true, type : "agenda"})} >See</button>
                )}
              </div>
            </div>
            <div id="card5" onClick={() => { classToggle('card5'); setOpen5(!isOpen5) }}>
              <div className="card_upper">
                <img src={help2}></img>
              </div>
              <div className="card_lower">
                <h1>Help</h1>
                {isOpen5 && (
                  <button id="room1_btn" onClick={() => navigate('/contactus')} >Visit</button>
                )}
              </div>
            </div>
          </div>
        </div>
      </SideBar>
      <Modal isOpen={modalShow.show} onRequestClose={() => setModalShow(false)}
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
        <PdfPopup func={setModalShow} type = {modalShow.type}/>
      </Modal>

    </div>

  );
}

export default Home;

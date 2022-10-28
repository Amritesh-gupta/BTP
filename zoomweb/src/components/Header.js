import './Header.css';
import logo from '../images/q.gif'
import userLogo from '../images/user.svg'
import { useContext, useReducer } from 'react';
import { AuthContext } from './Auth';

function Header() {

  const auth = useContext(AuthContext);
  const getName = () => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    const username = user.username;
    let name = "",first = username[0];
    if(username[0] >= 'a' && username[0] <= 'z'){
      let diff = username.charCodeAt(0) - 'a'.charCodeAt(0)
      first  = String.fromCharCode('A'.charCodeAt(0) + diff);
    }
    for(let i=0;i<username.length;i++){
      if(username[i] == '@') break;
      if(i == 0){
        name += first;
      }
      else{name += username[i];}
    }
    return name;
  };

  const logoutDivHandler = () => {
    let ele = document.getElementById('profileDrop');
    let logdiv = document.getElementById('logoutDiv');
    ele.classList.toggle('active');

    if(ele.classList.contains('active')){
      logdiv.style.display = "flex";
      logdiv.style.position = "absolute";
    }
    else{
      logdiv.style.display = "none";
    }
  }

  const logoutHandler = () =>{
    auth.setUser({});
  }

  return (
    <div>
      <div className="header">

        <div className="logo">
          <img src={logo}></img>
        </div>

        <div className="list">

          <div id='profileContainer'>
            <div id='profileLogo'>
              <img src={userLogo}></img>
            </div>
            <div id='profileName'>
              <h1>{getName()}</h1>
            </div>
            <div id='profileDrop' onClick={logoutDivHandler}>V</div>
          </div>
          <div id='logoutDiv'><button onClick={logoutHandler}>Logout</button></div>
        </div>

      </div>
    </div>
  );
}

export default Header;

import "./App.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login_page/Login_page'
import Home from './pages/Home_page/Homepage'
import Meeting from './pages/Meeting_page/Meeting'
import AuthProvider from "./components/Auth";
import SelfiePage from "./pages/Selfie_page/Selfiepage";
import RequireAuth from "./components/RequireAuth";
import Contact from "./pages/Contact_page/Contact";


function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <AuthProvider>
            <Routes>
              <Route exact path="/" element={<Login />} />
              <Route exact path="/home" element={<RequireAuth><Home /></RequireAuth>} />
              <Route exact path="/meeting" element={<RequireAuth><Meeting /></RequireAuth>} />
              <Route exact path="/selfiepoint" element={<RequireAuth><SelfiePage /></RequireAuth>} />
              <Route exact path="/contactus" element={<RequireAuth><Contact /></RequireAuth>} />
            </Routes>
          </AuthProvider>
        </header>
      </div>
    </BrowserRouter>
  );
}

export default App;

import './Contact.css'
import contactLogo from '../../images/contact_us.png'
import Header from '../../components/Header';
import { useContext, useState } from 'react';
import Loading from '../../components/Loading';
import {AuthContext} from '../../components/Auth';
import axios from 'axios';

const Contact = () => {

    const [msg, setMsg] = useState('');
    const [loading, setLoading] = useState(false);

    const auth = useContext(AuthContext);

    const submitHandler = async (e) => {
        e.preventDefault();

        const config = {
            url: '/submitquery',
            method: 'post',
            data: {
                from: auth.user.username,
                text: msg
            }
        }

        try {
            setLoading(true);
            const res = await axios(config);
            alert(res.data);
            setLoading(false);
            setMsg('');
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <Header />
            {loading ? <Loading /> :
                <div id='contactContainer'>
                    <div id='contactFirst'>
                        <img src={contactLogo}></img>
                    </div>
                    <div id='contactSecond'>
                        <form onSubmit={submitHandler} id='queryForm'>
                            <h1>Ask your query</h1>
                            <textarea type='text' id='queryInp' value={msg} onChange={(e) => setMsg(e.target.value)} placeholder='Write your query here' minLength={10} required></textarea>
                            <button id='queryBtn' type='submit'>Submit</button>
                        </form>
                    </div>
                </div>
            }
        </>
    );
}

export default Contact;
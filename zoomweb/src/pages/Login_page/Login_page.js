import './Login_page.css'
import img from '../../images/test2.jpg'
import Header from '../../components/Header.js';
import Modal from 'react-modal';
import { useState, useContext} from 'react';
import Popup from './Signup_pop.js'
import * as yup from 'yup'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import Loading from '../../components/Loading.js'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../components/Auth';

const userSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required().min(8)
})


Modal.setAppElement('#root')



function Login_page() {

    const [modalShow, setModalShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const auth = useContext(AuthContext);

    async function submitHandler(values) {

        setLoading(true)

        const config = {
            method: 'post',
            url: '/login',
            data: {
                username: values.email,
                password: values.password
            }
        };

        try {
            const res = await axios(config);
            setLoading(false);
            auth.setUser(res.data.user);
            sessionStorage.setItem("user",JSON.stringify(res.data.user));
            navigate('/home');
        }
        catch (err) {
            setLoading(false)
            console.error(err.response.data.message);
            alert(err.response.data.message);
        }

    }

    function amiclose(data) {
        setModalShow(data)
    }

    return (
        <div id='login'>
            {loading ? <Loading /> :
                <>

                    {/* <div id='header'>
                                <Header />
                            </div> */}
                    <div id='containers'>
                        <div id='container1'>
                            <div id='row1'>
                                <h1>Convocation 2022</h1>
                            </div>
                            <div id='row2'>
                                <img src={img} alt='login_image'></img>
                            </div>
                        </div>
                        <div id='container2'>
                            <div id='upper_row'>
                                <h1>Login</h1>
                                <Formik
                                    initialValues={{
                                        email: '',
                                        password: ''
                                    }}

                                    validationSchema={userSchema}

                                    onSubmit={submitHandler}
                                >
                                    <Form id='login_form'>
                                        <Field id='email_inp' name='email' type='email' placeholder='Email address'></Field>
                                        <div id='email_error'><ErrorMessage name='email' /></div>
                                        <Field id='pass_inp' name='password' type='password' placeholder='Password'></Field>
                                        <div id='pass_error'><ErrorMessage name='password' /></div>
                                        <div id='signup_div'>
                                            <h1>Not Registered?  </h1>
                                            <h1 onClick={() => setModalShow(true)}>Signup</h1>
                                        </div>
                                        <div id='submit_div'>
                                            <button id='submit_btn' type='submit'>Submit</button>
                                        </div>
                                    </Form>
                                </Formik>
                            </div>
                        </div>
                    </div>
                    <Modal
                        isOpen={modalShow}
                        onRequestClose={() => setModalShow(false)}
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
                        <Popup func={amiclose} />
                    </Modal>
                </>
            }
        </div>
    );
}

export default Login_page;
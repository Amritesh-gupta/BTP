import './Signup_pop.css';
// import * as Realm from 'realm-web'
import * as yup from 'yup'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/Loading.js'
import { useContext, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../components/Auth';


const userSchema2 = yup.object().shape({
  new_email: yup.string().email("Email must be valid email").required("Email is required"),
  new_password: yup.string().required("Password is required").min(8),
  // confirm_password: yup.string().required("Confirm your password"),
  confirm_password: yup.string().required("Confirm your password").when("new_password", {
    is: val => (val && val.length > 0 ? true : false),
    then: yup.string().oneOf(
      [yup.ref("new_password")],
      "Both password need to be the same"
    )
  })
})


function Signup_pop(props) {

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  function close() {
    props.func(false);
  }

  async function submitHandler(values) {

    //login user and redirect to home
    setLoading(true)
    let _isAdmin = 0;
    const idx = values.new_email.indexOf('@');
    const temp = values.new_email.substring(0, idx);

    _isAdmin = (temp === "admin") ? 1 : 0;

    const config = {
      method: 'post',
      url: '/signup',
      data: {
        username: values.new_email,
        password: values.new_password,
        isAdmin: _isAdmin
      }
    };

    try {
      const res = await axios(config);
      setLoading(false);
      auth.setUser(res.data.user);
      sessionStorage.setItem("user", JSON.stringify(res.data.user));
      navigate('/home');
    }
    catch (err) {
      setLoading(false)
      console.error(err.response.data.message);
      alert(err.response.data.message);
    }
  }

  return (

    <div id="container">
      {loading && <Loading />}
      {!loading &&
        <>

          <div id='button_div'>
            <button onClick={close}>X</button>
          </div>

          <div id='signup'>
            <h1>Signup</h1>
            <Formik
              initialValues={{
                new_email: '',
                new_password: ''
              }}

              validationSchema={userSchema2}

              onSubmit={submitHandler}
            >
              <Form id='signup_form'>
                <Field id='email_inp' name='new_email' type='email' placeholder='Email address'></Field>
                <div id='email_error'><ErrorMessage name='new_email' /></div>
                <Field id='pass_inp' name='new_password' type='password' placeholder='Password'></Field>
                <div id='pass_error'><ErrorMessage name='new_password' /></div>
                <Field id='conpass_inp' name='confirm_password' type='password' placeholder='Confirm Password'></Field>
                <div id='pass_error'><ErrorMessage name='confirm_password' /></div>
                <div id='submit_div'>
                  <button id='submit_btn' type='submit'>Submit</button>
                </div>
              </Form>
            </Formik>
          </div>

        </>
      }
    </div>
  );
}

export default Signup_pop;

import React, { useState } from 'react'
import logo from '../../assets/images/Logo.png'
import { useFormik } from "formik";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { userLogin } from '../../service/LightMailService';
function Login() {
    const [loader, setLoader] = useState(false);
    const cssStyle = {
        color: "red",
        fontSize: "12px",
        textAlign: "left",
        marginLeft: "10%"
    };

    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        onSubmit: (values, onSubmitProps) => {
            setLoader(true);
            userLogin(values)
                .then((response) => {
                    console.log(response);
                    localStorage.setItem("token", response.data.data.token);
                    localStorage.setItem("userFirstName", response.data.data.userFirstName);
                    localStorage.setItem("userLastName", response.data.data.userLastName);
                    localStorage.setItem("userId", response.data.data.userId);
                    localStorage.setItem("userEmail", response.data.data.userEmail);
                    onSubmitProps.resetForm();
                    inbox();
                })
                .catch((error) => {
                    setLoader(false);
                    console.log(error);
                    toast.error(error.response.data.message);
                });
        },
        validate: (values) => {
            let error = {}

            if (!values.email) {
                error.email = "Email is Required"
            } else if (!/^[a-zA-Z0-9]+@(lightmail\.com)$/i.test(values.email)) {
                error.email = "Enter a valid Email "
            }

            if (!values.password) {
                error.password = "Password is Required"
            }
            return error;
        }
    })
    const navigate = useNavigate();
    const signUp = () => {
        navigate('/register')
    }
    const inbox = () => {
        navigate('/inboxMails')
    }
    return (
        <>
            <div className="row text-center container-fluid">
                <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 p-5">
                    <img src={logo} alt="" />
                    <h3 className="fw-bolder mt-1">Login</h3>
                    {/* <p className="fw-bold regPara mb-3">We’re very glad that you visited here to use our service again. Thank You so much for your constant support</p> */}
                    <p></p>
                    <div className="row">
                        <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                            <div className="register">
                                <form onSubmit={formik.handleSubmit}>
                                    <div className="mb-5">
                                        <input type="email" placeholder='Enter Your email' className='formInput' name='email' onChange={formik.handleChange} value={formik.values.email} onBlur={formik.handleBlur} />
                                        {formik.touched.email && formik.errors.email ? (
                                            <div style={cssStyle}  >{formik.errors.email}</div>
                                        ) : null}
                                    </div>
                                    <div className="mb-5">
                                        <input type="password" placeholder='Password' className='formInput' name='password' onChange={formik.handleChange} value={formik.values.password} onBlur={formik.handleBlur} />
                                        {formik.touched.password && formik.errors.password ? (
                                            <div style={cssStyle} >{formik.errors.password}</div>
                                        ) : null}
                                    </div>
                                    <button type='Submit' className='btn mb-3'> {loader ? <i className="fas fa-spinner fa-pulse"></i> : "Sign In"}</button>
                                </form>
                                <p className='pb-3'>Don't have an account? <a href='' onClick={signUp}>Sign Up</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Login
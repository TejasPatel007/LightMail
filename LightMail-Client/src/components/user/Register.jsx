import React, { useState } from 'react'
import { useFormik } from "formik";
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/images/Logo.png'
import { userRegister } from '../../service/LightMailService';
function Register() {
    const [loader, setLoader] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const [emailExists, setEmailExists] = useState();
    const navigate = useNavigate();
    const loginpage = () => {
        navigate('/login')
    }

    const cssStyle = {
        color: "red",
        fontSize: "12px",
        textAlign: "left",
        marginLeft: "10%"
    };
    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: ""
        },
        onSubmit: (values, onSubmitProps) => {
            setLoader(true);
            userRegister(values)
                .then((response) => {
                    console.log(response);
                    setErrorMessage(false)
                    onSubmitProps.resetForm();
                    loginpage();
                })
                .catch((error) => {
                    setLoader(false);
                    console.log(error);

                    if (error.response.status == 409) {
                        setErrorMessage(true)
                        setEmailExists(error.response.data.message);
                    }
                });
        },
        validate: (values) => {

            let error = {}
            if (!values.firstName) {
                error.firstName = "FirstName is Required"
            } else if (!/^([a-z]+\s)*[a-z]+$/i.test(values.firstName)) {
                error.firstName = "Digits and consecutive spaces not allowed in"
            }

            if (!values.lastName) {
                error.lastName = "LastName is Required"
            } else if (!/^([a-z]+\s)*[a-z]+$/i.test(values.lastName)) {
                error.lastName = "Digits and consecutive spaces not allowed in"
            }

            if (!values.email) {
                error.email = "Email is Required"
            } else if (!/^[a-zA-Z0-9]+@(lightmail\.com)$/i.test(values.email)) {
                error.email = "Enter a valid Email e.g. hello@lightmail.com"
            }

            if (!values.password) {
                error.password = "Password is Required"
            } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{4,}$/i.test(values.password)) {
                error.password = "password must contain atleast 1 uppercase, 1 lowecase, 1 digit & 1 special character"
            }

            if (!values.confirmPassword) {
                error.confirmPassword = "Password is Required"
            } else if (values.password != values.confirmPassword) {
                error.confirmPassword = "Password Not Matched"
            }
            return error;
        }


    })

    return (
        <>
            <div className="row text-center container-fluid">
                <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 p-2">
                    <img src={logo} alt="" />
                    <h3 className="fw-bolder mt-1">Sign Up</h3>
                    <p></p>
                    <div className="row">
                        <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                            <div className="register">
                                <form onSubmit={formik.handleSubmit}>
                                    <div className="twoInputs">
                                        <div className="row">
                                            <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 mb-5">
                                                <input type="text" placeholder='First Name' name='firstName' onChange={formik.handleChange} value={formik.values.firstName} onBlur={formik.handleBlur} />
                                                {formik.touched.firstName && formik.errors.firstName ? (
                                                    <div style={cssStyle} className="text-start">{formik.errors.firstName}</div>
                                                ) : null}
                                            </div>
                                            <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 mb-5">
                                                <input type="text" placeholder='Last Name' name='lastName' onChange={formik.handleChange} value={formik.values.lastName} onBlur={formik.handleBlur} />
                                                {formik.touched.lastName && formik.errors.lastName ? (
                                                    <div style={cssStyle} className="text-start">{formik.errors.lastName}</div>
                                                ) : null}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-5">
                                        <input type="email" placeholder='Enter Your email' className='formInput' name='email' onChange={formik.handleChange} value={formik.values.email} onBlur={formik.handleBlur} />
                                        {formik.touched.email && formik.errors.email ? (
                                            <div style={cssStyle}  >{formik.errors.email}</div>
                                        ) : null}
                                        {errorMessage &&
                                            <div style={cssStyle}  >{emailExists}</div>
                                        }
                                    </div>
                                    <div className="mb-5">
                                        <input type="password" placeholder='Password' className='formInput' name='password' onChange={formik.handleChange} value={formik.values.password} onBlur={formik.handleBlur} />
                                        {formik.touched.password && formik.errors.password ? (
                                            <div style={cssStyle} >{formik.errors.password}</div>
                                        ) : null}
                                    </div>
                                    <div className="mb-5">
                                        <input type="password" placeholder='Confirm Password' className='formInput' name='confirmPassword' onChange={formik.handleChange} value={formik.values.confirmPassword
                                        } onBlur={formik.handleBlur} />
                                        {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                                            <div className="form-text" style={cssStyle} >{formik.errors.confirmPassword}</div>
                                        ) : null}
                                    </div>
                                    <button type='Submit' className='btn mb-2'>{loader ? <i className="fas fa-spinner fa-pulse"></i> : "Sign Up"}</button>
                                </form>
                                <p className='pb-3'>Already have an account? <a href='' onClick={loginpage}>Sign in</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default Register
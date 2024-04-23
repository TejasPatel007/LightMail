import React, { useState } from 'react'
import { useFormik } from "formik";
import { toast } from 'react-toastify';
import { changeUserPassword } from '../../service/LightMailService';

function PasswordPage({ id, token }) {
    const [loader, setLoader] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const cssStyle = {
        color: "red",
        fontSize: "12px",
        textAlign: "left",
        paddingTop: "1%"
    };
    const formik = useFormik({
        initialValues: {
            oldPassword: "",
            password: "",
            confirmPassword: ""
        },
        onSubmit: (values, onSubmitProps) => {
            const { oldPassword, password } = values
            setLoader(true);
            changeUserPassword(id, oldPassword, password)
                .then((response) => {
                    console.log(response);
                    setErrorMessage(false);
                    toast.success(response.data.message);
                    onSubmitProps.resetForm();
                    setLoader(false);
                })
                .catch((error) => {
                    setLoader(false);
                    toast.error(error.response.data.message);
                });
        },
        validate: (values) => {
            let error = {}
            if (!values.oldPassword) {
                error.oldPassword = "Old Password is Required"
            }
            if (!values.password) {
                error.password = "New Password is Required"
            } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{4,}$/i.test(values.password)) {
                error.password = "Password must contain atleast 1 uppercase, 1 lowecase, 1 digit & 1 special character"
            } else if (values.password == values.oldPassword) {
                error.password = "Old And New Password Are Same"
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
            <div className="col-10">
                <div className="updateProfile">
                    <h3>Reset Password</h3>
                    <hr />
                    <div className="resetPasswordForm">
                        <form onSubmit={formik.handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label">Old Password</label>
                                <input type="password" className="form-control" name='oldPassword' onChange={formik.handleChange} value={formik.values.oldPassword} onBlur={formik.handleBlur} />
                                {formik.touched.oldPassword && formik.errors.oldPassword ? (
                                    <div style={cssStyle} className="text-start">{formik.errors.oldPassword}</div>
                                ) : null}
                            </div>
                            <div className="mb-3">
                                <label className="form-label">New Password</label>
                                <input type="password" className="form-control" name='password' onChange={formik.handleChange} value={formik.values.password} onBlur={formik.handleBlur} />
                                {formik.touched.password && formik.errors.password ? (
                                    <div style={cssStyle} >{formik.errors.password}</div>
                                ) : null}
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Confirm Password</label>
                                <input type="password" className="form-control" name='confirmPassword' onChange={formik.handleChange} value={formik.values.confirmPassword
                                } onBlur={formik.handleBlur} />
                                {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                                    <div className="form-text" style={cssStyle} >{formik.errors.confirmPassword}</div>
                                ) : null}
                            </div>
                            <button type='Submit' className='btnUpdate mb-2'>{loader ? <i className="fas fa-spinner fa-pulse"></i> : "Submit"}</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PasswordPage
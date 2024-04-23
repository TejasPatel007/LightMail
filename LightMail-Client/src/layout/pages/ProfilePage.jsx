import React, { useState, useEffect } from 'react'
import { useFormik } from "formik";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { updateUserProfile } from '../../service/LightMailService';


function ProfilePage({ id, token, userFirstName, userLastName, getDataApi, userEmail }) {
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
            firstName: userFirstName,
            lastName: userLastName,
        },
        onSubmit: (values, onSubmitProps) => {
            const { firstName, lastName } = values
            setLoader(true);
            updateUserProfile(id, firstName, lastName)
                .then((response) => {
                    localStorage.setItem("userFirstName", firstName);
                    localStorage.setItem("userLastName", lastName);
                    setErrorMessage(false);
                    onSubmitProps.resetForm();
                    toast.success(response.data.message);
                    setLoader(false);
                    inbox();
                    getDataApi();
                })
                .catch((error) => {
                    setLoader(false);
                    toast.error(error.response.data.message);
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
            return error;
        }
    })
    const navigate = useNavigate();
    const inbox = () => {
        navigate('/inboxMails')
    }
    return (
        <>
            <div className="col-10">
                <div className="updateProfile">
                    <h3>Edit Profile</h3>
                    <hr />
                    <div className="updateForm ">
                        <form onSubmit={formik.handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label">First Name</label>
                                <input type="text" className="form-control" placeholder="Enter your first name" name='firstName' onChange={formik.handleChange} value={formik.values.firstName} onBlur={formik.handleBlur} />
                                {formik.touched.firstName && formik.errors.firstName ? (
                                    <div style={cssStyle} className="text-start">{formik.errors.firstName}</div>
                                ) : null}
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Last Name</label>
                                <input type="text" className="form-control" placeholder="Enter your last name" name='lastName' onChange={formik.handleChange} value={formik.values.lastName} onBlur={formik.handleBlur} />
                                {formik.touched.lastName && formik.errors.lastName ? (
                                    <div style={cssStyle} className="text-start">{formik.errors.lastName}</div>
                                ) : null}
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Email address</label>
                                <input type="email" className="form-control" placeholder={userEmail} disabled />
                            </div>
                            <button type='Submit' className='btnUpdate mb-2'>{loader ? <i className="fas fa-spinner fa-pulse"></i> : "Update"}</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProfilePage
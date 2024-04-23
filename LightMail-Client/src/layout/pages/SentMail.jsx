import React, { useState } from 'react'
import { useFormik } from 'formik';
import axios from 'axios';
import { toast } from 'react-toastify';
import attachment from '../../assets/images/attchment.png'
import { useNavigate } from 'react-router-dom';
import { userSendMail } from '../../service/LightMailService';

function SentMail({ token, getDataApi, sendSuccess }) {

    const navigate = useNavigate();

    //Css for validation
    const cssStyle = {
        color: "red",
        fontSize: "12px",
        marginLeft: "24px"
    }

    const fileData = [];
    const [fileUpload, setFileUpload] = useState([]);
    for (let i = 0; i < fileUpload.length; i++) {
        fileData.push(fileUpload[i].name);
    }

    //Form
    const formik = useFormik({
        initialValues: {
            recipents: "",
            subject: "",
            message: "",
            attachments: ""
        },
        onSubmit: (values, onSubmitProps) => {
            const formData = new FormData();
            formData.append("to", values.recipents);
            formData.append("subject", values.subject);
            formData.append("message", values.message);
            for (let i = 0; i < values.attachments.length; i++) {
                formData.append("attachments", values.attachments[i]);
            }
            console.log(values);
            userSendMail(formData)
                .then((response) => {
                    onSubmitProps.resetForm();
                    console.log(response);
                    toast.success(response.data.message);
                    getDataApi();
                    navigate('/inboxMails');
                    sendSuccess();
                })
                .catch((error) => {
                    toast.error(error.response.data.message);
                    toast.error(error.response.data.data.message);
                });
        },
        validate: (values) => {
            let error = {};
            if (!values.recipents) {
                error.recipents = "Recipents Required";
            } else if (!/^[a-zA-Z0-9]+@(lightmail\.com)$/i.test(values.recipents)) {
                error.recipents = "Enter a valid Email e.g. hello@lightmail.com"
            }
            if (!values.subject) {
                error.subject = "Subject is required";
            }
            if (!values.message) {
                error.message = "Message is required";
            }
            return error;
        },
    });

    return (
        <>
            <div className="composeClicked">
                <div className="upperSide">
                    <p className="text-dark fw-bold p-2">New Message</p>
                </div>
                <div className="sendForm">
                    <form onSubmit={formik.handleSubmit}>
                        <div className="mb-3">
                            <input type="email" className="form-control" placeholder="Recipents" name='recipents' onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.recipents} />
                            {formik.touched.recipents && formik.errors.recipents ? (
                                <div style={cssStyle}>{formik.errors.recipents}</div>
                            ) : null}
                        </div>
                        <div className="mb-3">
                            <input type="text" className="form-control" id="exampleInputPassword1"
                                placeholder="Subject" name='subject' onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.subject} />
                            {formik.touched.subject && formik.errors.subject ? (
                                <div style={cssStyle}>{formik.errors.subject}</div>
                            ) : null}
                        </div>
                        <div className="mb-3 ms-2">
                            <textarea name="message" cols="10" rows="7" onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.message} >
                            </textarea>
                            {formik.touched.message && formik.errors.message ? (
                                <div style={cssStyle}>{formik.errors.message}</div>
                            ) : null}
                        </div>
                        <div className="container-fluid attach-wrapper mt-auto">
                            <div className="row">
                                {fileData && fileData.map((url, index) => (
                                    <div className="col-4" key={index}>
                                        <div className='attachments'>
                                            <a download={url}>
                                                {
                                                    url.slice(0, 3) + "..." + url.slice((url.length - 7), url.length)
                                                }
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="twoData">
                            <button type="submit" className="btn btn-primary">Send <img src="images/Sent.png"
                                alt="" /></button>
                            <label htmlFor="file-input">
                                <img src={attachment} />
                            </label>
                            <input
                                id="file-input"
                                type="file"
                                name="attachments"
                                accept="*"
                                multiple
                                onChange={(e) => { formik.setFieldValue("attachments", e.currentTarget.files); setFileUpload(e.currentTarget.files) }}
                            />
                        </div>
                    </form>
                </div>
            </div>

        </>
    )
}

export default SentMail
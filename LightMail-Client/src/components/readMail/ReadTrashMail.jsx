import React from 'react'
import moment from 'moment'

function ReadTrashMail({ cardClickData, }) {
    const { from, createdAt, subject, message, attachments, to } = cardClickData;

    return (
        <>
            <div className="composeClicked">
                <div className="composeCard">
                    <div className="composeCardContent">
                        <div className="composeCardImg">
                            <p>{from.firstName.charAt(0).toUpperCase() + "" + from.lastName.charAt(0).toUpperCase()}</p>
                        </div>
                        <div className="composeCardData ">
                            <h6>from : {from.email}</h6>
                            <div className='d-flex justify-content-between'>
                                <p>to: {to.email}</p>
                                <span>{moment(createdAt).format('MM/DD/YY, h:mm a')}</span>
                            </div>
                        </div>
                    </div>
                    <div className="composeCardMessage pt-5">
                        <span className="fw-bold">{subject}</span>
                        <p className="mt-4">{message}</p>
                        <div className="container-fluid attach-wrapper">
                            <div className="row">
                                {attachments && attachments.map((url, index) => (
                                    <div className="col-4" key={index}>
                                        <div className='attachments'>
                                            <a href={`http://localhost:8888/${url}`} target="#">
                                                {
                                                    url.slice(0, 3) + "..." + url.slice((url.length - 7), url.length)
                                                }
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default ReadTrashMail
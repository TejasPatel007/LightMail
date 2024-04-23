import React from 'react'
import moment from 'moment'
import { toast } from 'react-toastify'
import { deleteUserMail } from '../../service/LightMailService'
import attachment from '../../assets/images/attchment.png'

function EmailCard({ _id, from, subject, createdAt, attachments, index, cardClick, status, getDataApi, setCardClickData, currentID }) {
    const deleteMail = (id) => {
        deleteUserMail(id).then((response) => {
            getDataApi();
            console.log(response);
            setCardClickData("dataNotFound");
            toast.success(response.data.message)
        }).catch((error) => {
            console.log(error);
        })
    }
    return (
        <>
            {from &&
                <div className={`card-container ${currentID == _id ? 'cardActive' : ''}  d-flex row m-0`}>
                    <div className={`cardClicked  `} key={index} onClick={cardClick}
                        id={_id}>
                        <div className="card pb-3">
                            <div className="cardContent">
                                <div className="cardImg">
                                    <p>{from.firstName.charAt(0).toUpperCase() + "" + from.lastName.charAt(0).toUpperCase()}</p>
                                </div>
                                {
                                    <div className={status == "READ" ? "cardData read" : "cardData"} >
                                        <div className='d-flex justify-content-between'>
                                            <h6>{from.firstName.charAt(0).toUpperCase() + "" + from.firstName.slice(1).toLowerCase() + " " + from.lastName.charAt(0).toUpperCase() + "" + from.lastName.slice(1).toLowerCase()}</h6>
                                            <p className='mt-1'>{moment(createdAt).format('MM/DD/YY, h:mm a')}</p>
                                        </div>
                                        <div className='d-flex justify-content-between'>
                                            <span>{subject}</span>
                                            {attachments.length > 0 && <p className='mt-1' ><img style={{ height: '17px' }} src={attachment} /></p>}
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                    <div className='d-flex align-items-center m-r-2 icon-wrapper'>
                        <i className="fa-solid fa-trash" onClick={() => deleteMail(_id)}></i>
                    </div>
                </div>
            }
        </>
    )
}
export default EmailCard
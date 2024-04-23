import React, { useState, useEffect } from 'react'
import axios from 'axios';
import TrashMailCard from '../mailCards/TrashMailCard';
import DataNotFoundImg from '../../assets/images/bin.gif'
import { userTrashedMailInbox } from '../../service/LightMailService';

function TrashInboxMail({ token, setCardClickData, setSidebarData }) {
    const [mailData, setMailData] = useState([]);
    const [currentID, setCurrentID] = useState(null)
    //function for card clicked and showing data
    const cardClick = (e) => {
        const mailId = e.currentTarget.id
        setCurrentID(mailId);
        mailData.map(({ _id, from, to, createdAt, subject, message, status, attachments }) => {
            if (_id == mailId) {
                if (status == "UNREAD") {
                    axios.patch(`http://localhost:8888/v1/mails/readMails/${_id}`, {}, {
                        headers: {

                            'authorization': `bearer ${token}`
                        }
                    }).then(() => {
                        getDeleteData();
                    }).catch((error) => {
                        console.log(error);
                    })
                }
                setSidebarData("trashCardClick");
                setCardClickData({ from, createdAt, subject, message, to, attachments })
            }
        })
    }

    //getsent Data Api
    const getDeleteData = () => {
        userTrashedMailInbox().then((response) => {
            setMailData(response.data.data);
        }).catch((error) => {
            console.log(error);
        })
    }

    useEffect(() => {
        getDeleteData();
    }, [])

    return (
        <>
            {

                mailData.length != 0 ? mailData.map(({ _id, from, subject, createdAt, attachments, status }, index) => (
                    <TrashMailCard _id={_id} from={from} subject={subject} createdAt={createdAt} attachments={attachments} status={status} key={index} cardClick={cardClick} currentID={currentID} />
                )) : <div className='dataNotFound text-center'>
                    <img src={DataNotFoundImg} alt="" />
                    <h4>Your Bin Is Empty</h4>
                </div>
            }
        </>
    )
}

export default TrashInboxMail
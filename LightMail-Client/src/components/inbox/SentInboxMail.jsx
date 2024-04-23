import React, { useState, useEffect } from 'react'
import axios from 'axios';
import SentMailCard from '../mailCards/SentMailCard';
import DataNotFoundImg from '../../assets/images/sentEmpty.gif'
import { userSendMailInbox } from '../../service/LightMailService';

function SentInboxMail({ token, setCardClickData, setSidebarData }) {
    const [mailData, setMailData] = useState([]);
    const [currentID, setCurrentID] = useState(null)
    //function for card clicked and showing data
    const cardClick = (e) => {
        const mailId = e.currentTarget.id
        setCurrentID(mailId)
        mailData.map(({ _id, to, from, readAt, subject, message, attachments }) => {

            if (_id == mailId) {
                setSidebarData("sentCardClick");
                setCardClickData({ from, to, readAt, subject, message, attachments })
            }
        })
    }

    //getsent Data Api
    const getSentData = () => {
        userSendMailInbox().then((response) => {
            setMailData(response.data.data);
        }).catch((error) => {
            console.log(error);
        })
    }

    useEffect(() => {
        getSentData();
    }, [])

    return (
        <>
            {
                mailData.length != 0 ? mailData.map(({ _id, to, from, subject, createdAt, attachments, status }, index) => (
                    <SentMailCard _id={_id} to={to} subject={subject} createdAt={createdAt} attachments={attachments} status={status} key={index} cardClick={cardClick} from={from} currentID={currentID} />
                )) : <div className='dataNotFound text-center'>
                    <img src={DataNotFoundImg} alt="" />
                    <h4>Your Sent Is Empty</h4>
                </div>
            }
        </>
    )
}

export default SentInboxMail
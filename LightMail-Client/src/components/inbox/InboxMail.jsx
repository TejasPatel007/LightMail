import React from 'react'
import DataNotFoundImg from '../../assets/images/inbox.gif'
import EmailCard from '../mailCards/EmailCard'
function InboxMail({ mailData, cardClick, token, getDataApi, setCardClickData, currentID }) {
    return (
        <>
            {mailData.length != 0 ? mailData.map(({ _id, from, subject, createdAt, attachments, status, isActive }, index) => (
                <EmailCard _id={_id} from={from} subject={subject} createdAt={createdAt} attachments={attachments} status={status} key={index} cardClick={cardClick} token={token} getDataApi={getDataApi} setCardClickData={setCardClickData} isActive={isActive} currentID={currentID} />
            )) : <div className='dataNotFound text-center'>
                <img src={DataNotFoundImg} alt="" />
                <h4>Your Inbox Is Empty</h4>
            </div>}
        </>
    )
}

export default InboxMail
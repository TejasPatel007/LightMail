import React from 'react'
import selectMessage from '../../assets/images/DNF.png'
function MessageSent() {
    return (
        <div className="switchMessage text-center">
            <img src={selectMessage} alt="" />
            <h6>Message Sent Successfully</h6>
        </div>
    )
}

export default MessageSent
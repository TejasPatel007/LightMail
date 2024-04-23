import React from 'react'
import selectMessage from '../../assets/images/DNF.png'

function SwitchMessage() {
    return (
        <>
            <div className="switchMessage">
                <img src={selectMessage} alt="" />
                <h6>You've not selected any messages</h6>
            </div>
        </>
    )
}

export default SwitchMessage
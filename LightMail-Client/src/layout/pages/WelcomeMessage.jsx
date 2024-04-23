import React from 'react'
import emailIcon from '../../assets/images/EmailIcon.png'

function WelcomeMessage({ userFirstName }) {
    return (
        <>

            <div className="welcomeMessage">
                <div className="welcomeMessageContent text-center">
                    <img src={emailIcon} alt="" />
                    <h3 className="fw-bold pt-4 pb-2">Welcome to <span>LightMail</span>, {
                        userFirstName && (userFirstName.charAt(0).toUpperCase() + "" + userFirstName.slice(1).toLowerCase())
                    }</h3>
                </div>
            </div>

        </>
    )
}

export default WelcomeMessage
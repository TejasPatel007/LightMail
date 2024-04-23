import React from 'react'
import spinner from '../../assets/images/email.gif'
function LoadingPage() {
    return (
        <>
            <div className="col-12 emailLoader">
                <img src={spinner} alt="" />
            </div>
        </>
    )
}

export default LoadingPage
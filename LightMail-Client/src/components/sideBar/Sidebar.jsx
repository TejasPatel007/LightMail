import React from 'react'
import inbox from '../../assets/images/inbox.png'
import send from '../../assets/images/send.png'
import trash from '../../assets/images/trash.png'
import compose from '../../assets/images/compose.png'
import { Link, Outlet, useLocation } from 'react-router-dom'
function Sidebar({ unreadMail, unreadMailCount, composeClick, switchMessage }) {

    const location = useLocation();

    return (
        <>
            <ul className="pt-3">
                <Link to="inboxMails" className="mb-3" onClick={switchMessage}>
                    <li className={location.pathname == "/inboxMails" ? "sidebarListActive" : "sidebarList"} >
                        <div>
                            <img src={inbox} alt="" className="me-2" />
                            Inbox
                        </div>
                        {unreadMail ? <span className="badge">{unreadMailCount}</span> : unreadMail}
                    </li>
                </Link>
                <Link to="sentMails" className="mb-3" onClick={switchMessage}>
                    <li className={(location.pathname == "/sentMails" || location.pathname == "/compose") ? "sidebarListActive" : "sidebarList"}>
                        <div>
                            <img src={send} alt="" className="me-2" />
                            Sent
                        </div>
                    </li>
                </Link>
                <Link to="trashMails" className="mb-3" onClick={switchMessage}>
                    <li className={location.pathname == "/trashMails" ? "sidebarListActive" : "sidebarList"}>
                        <div>
                            <img src={trash} alt="" className="me-2" />
                            Trash
                        </div>
                    </li>
                </Link>
                <Link to="compose" onClick={composeClick} className="composeBtn">
                    <li className="sidebarList">
                        <div>
                            <img src={compose} alt="" className="me-2" />
                            Compose
                        </div>
                    </li>
                </Link>
                <Outlet />
            </ul>
        </>
    )
}

export default Sidebar
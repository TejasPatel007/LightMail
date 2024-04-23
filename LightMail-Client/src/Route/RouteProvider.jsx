import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../components/user/Login";
import Home from "../layout/pages/Home"
import Inbox from "../layout/pages/Inbox";
import { Protected } from "../authentication/Protected";
import Register from '../components/user/Register';
function RouteProvider() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/register" element={<Register />}></Route>
                    <Route path="/login" element={<Login />}></Route>
                    <Route path="/" element={<Home />}></Route>
                    <Route path="/" element={<Protected Component={Inbox} />}>
                        <Route path="inboxMails"></Route>
                        <Route path="sentMails"></Route>
                        <Route path="trashMails"></Route>
                        <Route path="compose"></Route>
                        <Route path="profile"></Route>
                        <Route path="resetPassword"></Route>
                    </Route>
                    <Route path='/*'></Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default RouteProvider
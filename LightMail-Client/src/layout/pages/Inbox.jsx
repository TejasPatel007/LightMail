import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Header from '../header/Header'
import Sidebar from '../../components/sideBar/Sidebar'
import WelcomeMessage from './WelcomeMessage'
import SentMail from './SentMail'
import InboxMail from '../../components/inbox/InboxMail'
import ReadMail from '../../components/readMail/ReadMail'
import Footer from '../footer/Footer'
import SentInboxMail from '../../components/inbox/SentInboxMail'
import TrashInboxMail from '../../components/inbox/TrashInboxMail'
import ProfilePage from '../pages/ProfilePage'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import PasswordPage from './PasswordPage'
import ReadSentMail from '../../components/readMail/ReadSentMail'
import MessageSent from './MessageSent'
import ReadTrashMail from '../../components/readMail/ReadTrashMail'

import { getUserMailData, readCounterData, readMailData } from '../../service/LightMailService';
import SwitchMessage from './SwitchMessage'
function Inbox() {


  //Route Location
  const location = useLocation();

  //hook for get mail datas from the api
  const [mailData, setMailData] = useState([]);
  const [cardClickData, setCardClickData] = useState({});

  //hook for unreadMail
  const [unreadMail, setUnreadMail] = useState(false);

  //hook for unreadMail count and use it in the badges
  const [unreadMailCount, setUnreadMailCount] = useState(0);

  //localStorage data
  const userId = localStorage.getItem("userId")
  const userFirstName = localStorage.getItem("userFirstName");
  const userLastName = localStorage.getItem("userLastName");
  const token = localStorage.getItem('token');
  const userEmail = localStorage.getItem('userEmail');
  // location
  const path = location.pathname;

  // sidebar Button Cliked
  const [sideBarData, setSidebarData] = useState("");
  // Function for compose button clicked
  const composeClick = () => {
    setSidebarData("composeClick")
  }

  const switchMessage = () => {
    setSidebarData("switchMessage")
  }

  const sendSuccess = () => {
    setSidebarData("sendSuccess");
  }

  const navigate = useNavigate();
  //hook for get api data
  const getDataApi = async () => {
    const data = await getUserMailData().then((response) => {
      const mailData = response.data.data.mailData;
      const mailDatas = mailData.map(mailValue => ({ ...mailValue, isActive: false }))

      const unreadMailCount = response.data.data.unreadMailCount;

      setMailData(mailDatas);
      if (unreadMailCount != 0) {
        setUnreadMail(true);
        setUnreadMailCount(unreadMailCount);
      } else {
        setUnreadMail(false)
      }

    }).catch((error) => {
      console.log(error);
      if (error.response.status == 401) {
        navigate('/login')
      }
    })
  }
  useEffect(() => {
    getDataApi();
  }, []);

  const [currentID, setCurrentID] = useState(null)
  //function for card clicked and showing data
  const cardClick = async (e) => {
    const mailId = e.currentTarget.id
    setCurrentID(mailId)
    const data = await mailData.map(({ _id, from, createdAt, readAt, subject, message, status, attachments }, index) => {
      if (_id == mailId) {
        mailData[index].isActive = true;
        // Api for counter
        if (currentID != _id) {
          readCounterData(_id).then((response) => {
            console.log(response);
            getDataApi();
          }).catch((error) => {
            console.log(error);
          })
        }

        // Api for unread 
        if (status == "UNREAD") {
          readMailData(_id).then((response) => {
            console.log(response);
            getDataApi();
          }).catch((error) => {
            console.log(error);
          })
        }
        setSidebarData("cardClick");
        setCardClickData({ from, createdAt, readAt, subject, message, attachments })
      }
    })
  }


  //Function for inbox, sent, and trash click
  const switchPage = (path) => {
    switch (path) {
      case "/inboxMails": return <InboxMail mailData={mailData} cardClick={cardClick} token={token} getDataApi={getDataApi} setCardClickData={setCardClickData} currentID={currentID} />
      case "/sentMails": return <SentInboxMail token={token} setSidebarData={setSidebarData} setCardClickData={setCardClickData} />
      case "/trashMails": return <TrashInboxMail token={token} setSidebarData={setSidebarData} setCardClickData={setCardClickData} />
      case "/compose": return <SentInboxMail token={token} setSidebarData={setSidebarData} setCardClickData={setCardClickData} />
    }
  }


  //Function for composeClick, cardClick
  const switchSidebarData = (sideBarData) => {
    switch (sideBarData) {
      case "": return <WelcomeMessage userFirstName={userFirstName} />
      case "switchMessage": return <SwitchMessage />
      case "composeClick": return <SentMail token={token} getDataApi={getDataApi} sendSuccess={sendSuccess} />
      case "sendSuccess": return <MessageSent />
      case "cardClick": return cardClickData.length != 0 && <ReadMail cardClickData={cardClickData} token={token} />
      case "sentCardClick": return cardClickData.length != 0 && <ReadSentMail cardClickData={cardClickData} token={token} />
      case "trashCardClick": return cardClickData.length != 0 && <ReadTrashMail cardClickData={cardClickData} token={token} />
    }
  }


  return (
    <>
      <Header />
      <section className="container-fluid section">
        <div className="row demo">
          <div className="col-2">
            <div className="sideBar">
              <Sidebar unreadMail={unreadMail} unreadMailCount={unreadMailCount} composeClick={composeClick} switchMessage={switchMessage} />
            </div>
          </div>

          {
            (location.pathname == "/profile" && <ProfilePage id={userId} token={token} userFirstName={userFirstName} userLastName={userLastName} getDataApi={getDataApi} userEmail={userEmail} />) || (location.pathname == "/resetPassword" && <PasswordPage id={userId} token={token} getDataApi={getDataApi} />) || <>
              <div className="col-4">
                <div className="messages">
                  {switchPage(path)}
                </div>
              </div>
              <div className="col-6">
                {switchSidebarData(sideBarData)}
              </div>
            </>
          }
        </div>
      </section >
      <Footer />
    </>
  )
}

export default Inbox
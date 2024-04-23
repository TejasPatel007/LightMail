import React from 'react'
import moment from 'moment'
import DataNotFoundImg from '../../assets/images/DNF.png'

function ReadMail({ cardClickData, token }) {
    const { from, createdAt, subject, message, attachments } = cardClickData;
    //Download code
    const download = async (url) => {

        const path = `http://localhost:8888/${url}`

        await fetch(path, {
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
        })
            .then((response) => {
                console.log(response);
                response.arrayBuffer().then(function (buffer) {
                    const urls = window.URL.createObjectURL(new Blob([buffer]));
                    const link = document.createElement("a");
                    link.href = urls;
                    link.setAttribute("download", url);
                    document.body.appendChild(link);
                    link.click();
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <>
            <div className="composeClicked">
                <div className="composeCard">
                    {from == undefined ? <div className='dataNotFound text-center'>
                        <img src={DataNotFoundImg} alt="" style={{ height: "250px", width: "300px" }} className="ps-5" />
                    </div> :
                        <>
                            <div className="composeCardContent">
                                <div className="composeCardImg">
                                    <p>{from.firstName.charAt(0).toUpperCase() + "" + from.lastName.charAt(0).toUpperCase()}</p>
                                </div>
                                <div className="composeCardData ">
                                    <h6>{from.email}</h6>
                                    <span>{moment(createdAt).format('MM/DD/YY, h:mm a')}</span>

                                </div>
                            </div>
                            <div className="composeCardMessage pt-5">
                                <span className="fw-bold">{subject}</span>
                                <p className="mt-4">{message}</p>
                                <div className="container-fluid attach-wrapper">
                                    <div className="row">
                                        {attachments && attachments.map((url, index) => (
                                            <div className="col-4" key={index}>
                                                <div className='attachments' >
                                                    <a href={`http://localhost:8888/${url}`} target="#" >
                                                        {
                                                            url.slice(0, 3) + "..." + url.slice((url.length - 7), url.length)
                                                        }
                                                    </a>
                                                    <i class="fa-solid fa-download" onClick={() => download(url)}></i>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </>
                    }
                </div>
            </div>

        </>
    )
}

export default ReadMail
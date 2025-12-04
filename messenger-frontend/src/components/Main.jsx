import { useEffect, useRef, useState } from "react";
import {io} from 'socket.io-client';
import './Main.css'
import Inbox from "./Inbox";
import axios from "axios";

function Main() {
    const[message,setMessage] = useState("");
    const [toPhone,setToPhone]=useState("");
    // const [contact,setContact] = useState([]);
    const[messages,setMessages] = useState([]);
    const[socket,setSocket] = useState(null);
    const [currentUserPhone, setCurrentUserPhone] = useState("");
    const [selectContact,setSelectContact] = useState(null);

    const selectContactRef = useRef(null);
    const chatHistory = useRef({});



    const handleSelectConatct = async(contact) => {
      selectContactRef.current = contact;
      setSelectContact(contact);
      const token = localStorage.getItem("token");
      const phone = contact.phone;
      if(!chatHistory.current[phone]){
        chatHistory.current[phone] = [];
      }
      try{
        const res = await axios.get(`http://localhost:5000/api/message/history/${phone}`,{
          headers : {
            Authorization: `Bearer ${token}`
          }
        });
        const oldChats = res.data;
        chatHistory.current[phone] = oldChats.map(m=>({
          from:m.from,
          text:m.text,
          isOwn:m.from === currentUserPhone
        }))
      }catch(err){
        console.error("something went wront in frontend while fecthing the chat")
      }
      
      setMessages([...chatHistory.current[phone]])
    }

    useEffect(() => {
      const token = localStorage.getItem("token");
      if(!token) return;

      const newSocket = io("http://localhost:5000",{
        auth:{token},
      });

      newSocket.on("current-user",(data) => {
        setCurrentUserPhone(data.phone);
        console.log("Connected as:",data.phone)
      })
      newSocket.on("received-message",(data) => {
        const phone  = data.from;
        if(!chatHistory.current[phone]){
          chatHistory.current[phone] = [];
        }
        const recievedmsgobj = {
          from:phone,
          text:data.text,
          isOwn:false
        }
        chatHistory.current[phone].push(recievedmsgobj);
        if(selectContactRef.current && data.from === selectContactRef.current.phone)
        setMessages((prev) => [...prev,recievedmsgobj])
      });

      setSocket(newSocket);

      return () => newSocket.disconnect();
    },[])
    
    
    const sendmessage = () => {
      if(!selectContact) return;

      const msgObj = {
        from:currentUserPhone,
        text:message,
        isOwn:true
      }

      const phone =selectContact.phone;
      chatHistory.current[phone].push(msgObj)
      setMessages(prev => [...prev,msgObj]);
      
      socket.emit("private-message",{
        toPhone:selectContact.phone,
        text:message
      });
      setMessage("");
    }

  return (
    <div>
      <div className="chat">
        <div className="user-num">
          <Inbox onSelectContact = {handleSelectConatct}/>
        </div>
        {selectContact ? (
        <>
          <div className="message-area">
         
          <h1>Phone:{selectContact.phone}</h1>
          
          <ul style={{ listStyle: 'none', padding: 0 }}>
                  {messages.map((m, i) => (
                      <li key={i} style={{
                          textAlign: m.isOwn ? 'right' : 'left',
                          margin: '10px 0'
                      }}>
                          <div style={{
                              display: 'inline-block',
                              padding: '8px 12px',
                              borderRadius: '8px',
                              backgroundColor: m.isOwn ? '#0084ff' : '#e4e6eb',
                              color: m.isOwn ? 'white' : 'black'
                          }}>
                              <b>{m.isOwn ? 'me' : m.from}</b>: {m.text}
                          </div>
                      </li>
                  ))}
              </ul>
              <div className="typing-area">
         
          <input type="text" value={message} placeholder="type your message...." onChange={(e) => setMessage(e.target.value)}/>
          
          <button onClick={sendmessage}>Sent</button>
          </div>
          </div>
          </>
          ):(
            <p>Select a conatact to start a chat</p>
          )}
        
       
          </div>
    </div>
  )
}
export default Main;
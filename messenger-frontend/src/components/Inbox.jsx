import Contactsaving from './Contactsaving';
import {Link} from 'react-router-dom'
import { useEffect, useState } from 'react';
import './Inbox.css'
import axios from 'axios';
function Inbox({onSelectContact}) {
  const API= `${process.env.REACT_APP_API_URL}`
  const [popup,setPopUp] = useState(false);
  const [allContacts,setAllContacts]  = useState([]);

  useEffect(()=> {
    handleAllContacts();
  },[])
  
  const handleAllContacts = async() => {
    try{
      const token = await localStorage.getItem("token");

      const res = await axios.get(`${API}/api/savedcontact`,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      });
      console.log("fetched contacts",res);
      setAllContacts(res.data.contact || []);
    }catch(err){
      console.error("Something went wrong while fetching contacts in frontend",err)
    }
  }
  return (
    <div>
      <div className='left-part'>
        <div className="pop-screen-contactsaving">
          <button> <Link to={'/contactsaving'} onClick={() => setPopUp(true)}>+new Conatact</Link></button>
          {popup && (
            <div className="modal-overlay" onClick={() => setPopUp(false)}>
          <div className="modal-content"onClick={(e) => e.stopPropagation()}>
            <h2>Add New Contact</h2>
            <Contactsaving />
            <div className="modal-actions">
              <button className="close-btn" onClick={() => setPopUp(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
          )}
        </div>
        <div className='all-contacts'>
          <h1>Saved contacts</h1> 
            {allContacts.length > 0?(
                <ul>
                  {allContacts.map((contacts,index) => (
                    <li key={index} onClick={() => onSelectContact(contacts)} style={{cursor:"pointer",margin:"5px 0"}}>
                      <strong>{contacts.name}</strong> - {contacts.phone}
                    </li>
                  ))}
                </ul>
            ):(
              <p>No contacts saved yet..</p>
            )}
        </div>
        </div>
    </div>
  )
}
export default Inbox
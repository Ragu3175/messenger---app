import { useState } from "react";
import axios from "axios"
import './Contactsaving.css'
function Contactsaving() {
    const [contactName,setContactName] = useState("");
    const [contactNumber,setContactNumber] = useState("");
   const API= `${process.env.REACT_APP_API_URL}`
    const handleContactSave = async() => {
        try{
            const token = await localStorage.getItem("token")
            const res = await axios.post(`${API}/api/savedcontact`,{
                contactName,
                contactNumber
            },{
                headers:{
                    Authorization: `Bearer ${token}` 
                }
            })
            if(res.status === 200){
                console.log("contact saved succesfully")
                alert("Contact saved Succesfully")
            }
            // else if(res.status === 401){
            //     console.log("Logged in user not found")
            // }else if(res.status === 404){
            //     console.log("The user is not exist in DB");
            // }else if(res.status === 400){
            //     console.log("user is already in contact");
            // }
        }catch(err){
            console.error("something went wrong while saving contact in frontend",err,err.stack)
        }
    }
  return (
    <div>
        <div className="contact-save">
            <input type="text" placeholder="enter the name of the contact" value={contactName} onChange={(e)=> setContactName(e.target.value)}/>
            <input type="number" placeholder="enter the contact number" value={contactNumber} onChange={(e)=> setContactNumber(e.target.value)}/>
            <button onClick={handleContactSave}>Save</button>
        </div>
    </div>
  )
}
export default Contactsaving
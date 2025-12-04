import {  useState } from "react";
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios'
import './Signup.css'

function Signup() {
    const[username,setUsername] = useState("")
    const[phone,setPhone] = useState("")
    const [password,setPassword] = useState("");
    const navigate = useNavigate();

    // const [otp,setOtp] = useState("");
    // const [step,setStep] = useState(1);
    const handleSignup = async() => {
      try{
        const res = await axios.post("http://localhost:5000/api/signup",{
          username,
          phone,
          password
        });
      
        if(res.status===201){
          // setStep(2);
          navigate('/login');
          alert("Signup succesfully");
        }
        if(res.status===400){
          alert("User is already exist")
        }
        
      }catch(err){
        console.error("something went wrong while signup")
      }
    }
    // const handleOtpVefiry = async() => {
    //   try{
    //     const res = await axios.post("http://localhost:5000/api/signup/otpverification",{
    //       phone,
    //       otp
    //     })
    //     if(res.status===201){
    //       // navigate('/login');
    //       alert("verification Succesfull")
    //     }
    //   }catch(err){
    //     console.error("something went wrong while OTP verification")
    //   }
    // }
  return (
    <div className="signup-page">
      <div className="signup">
        <h2>Sign up</h2>
        <p>Enter your username and number</p>
          <input type="text" placeholder="enter the username " value={username} onChange={(e) => setUsername(e.target.value)}/>
          <input type="tel" pattern="[0-9]{10}" required placeholder="enter the phone number" value={phone} onChange={(e) => setPhone(e.target.value)}/>
          <input type="password" placeholder="enter the password" value={password} onChange={(e) => setPassword(e.target.value)}/>
          <button onClick={handleSignup}>Submit</button>
        
      {/* {step===2 && (
        <>
        <p>verify Your Phone Number</p>
        <input type="text"  placeholder="Enter your OTP" value={otp} onChange={(e) => setOtp(e.target.value)}/>
        <button onClick={handleOtpVefiry}></button>
        </>
      )} */}
          
          <Link to={'/login'}>Already have an account</Link>
      </div>
    </div>
  )
}
export default Signup;
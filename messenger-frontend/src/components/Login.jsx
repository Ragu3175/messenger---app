import { useState } from "react";
import { useNavigate} from "react-router-dom";
import axios from "axios";
import './Login.css'
function Login() {
    const API= `${process.env.REACT_APP_API_URL}`
    const [phone,setPhone] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();
    const handleLogin = async() => {
        try{
            const res = await axios.post(`${API}/api/signup/login`,{
            phone,
            password
        });
        if(res.status===200){
            const {accesstoken} = res.data;
            localStorage.setItem("token",accesstoken);
            setTimeout(() => {
                navigate('/main')
            },100)
            alert("login successfull")
        }
        if(res.status===401){
            alert("the phone number is not exist or a incorrect password");
        }
        }catch(err){
            console.error("something went wrong while login at client side",err)
        }
    }
  return (
    
    <div className="login-page">
        <div className="login">
            <h1>Login</h1>
            <input type="tel" pattern="[0-9]{10}" required placeholder="enter the phone number" value={phone} onChange={(e) => setPhone(e.target.value)}/>
            <input type="password" placeholder="enter the password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            <button onClick={handleLogin}>Submit</button>
        </div>
    </div>
  )
}
export default Login;
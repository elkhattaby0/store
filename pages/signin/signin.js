import "./signin.css"
import "../img/google.png"
import { useState } from "react"
import { useNavigate } from "react-router-dom";

const SignIn = () => {
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const getData = (props) => {
        const name = props.target.name;
        const value = props.target.value;
        setData(n=> ({...n, [name]:value}))
    }
    const stopRef = (props) => {
        props.preventDefault()
        try{
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            var raw = JSON.stringify({
                "email": data.email,
                "password": data.password
            });
            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };
            fetch("http://127.0.0.1:80/signin", requestOptions)
                .then(response => response.json())
                .then(result => localStorage.setItem("token", JSON.stringify(result)))
                .catch(error => error);
        }catch(error){
            console.log(error)
        }
        
        setTimeout(() => {
            const { type } = JSON.parse(localStorage.getItem("token"))
            if(type === true) {
                document.getElementById("signin").style.visibility = "hidden"
                navigate('/admin')
            }
            if(type === false) {
                document.getElementById("signin").style.visibility = "hidden"
                navigate('/user')
            }
            if(type === "null"){
                alert('Email or Password incorrect');
            }
            
        }, 1500);

    }

    return (
        <div id="signin">
            <button id="xsignin" onClick={()=> {
                document.getElementById("signin").style.visibility = "hidden"
            }}>&#9587;</button>
            <form className="signin" onSubmit={stopRef} data-aos="fade-up" data-aos-anchor-placement="top-center">
                <h1>Sign in</h1>
                <label>
                    <p>Email</p>
                    <input type="email" name="email" value={data.email || ""} onChange={getData} />
                </label>
                <label>
                    <p>Password</p>
                    <input type="password" name="password" value={data.password || ""} onChange={getData} />
                </label>
                <label id="forgotpss">
                    <button>Sign In</button>
                    <p>Forgot password?</p>
                </label>
                
                <label className="google">
                    <button>
                        <img src={require("../img/google.png")} alt="" width='25px' height='25px' />
                        Contact with Google
                        </button>
                </label>
                <label >
                    <p onClick={()=> {
                        document.getElementById("signup").style.visibility = "visible"
                        document.getElementById("signin").style.visibility = "hidden"
                        
                    }}>I dont have an account</p>
                </label>
            </form>
        </div>
    )
}

export default SignIn
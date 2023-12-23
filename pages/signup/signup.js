import "./signup.css"
import { useState } from "react";

const SignUp = () => {
    const [data, setData] = useState([])
    const [file, setFile] = useState(null)
    const [file2, setFile2] = useState(null)

    const getData = (props) => {
        const name = props.target.name;
        const value = props.target.value;
        setData(n=> ({...n, [name]:value, "admin":false}))
    }
    const imgProf = () => {
        if(file2 === null){
            return (
                <input type="file" onChange={(e)=> {
                    setFile(e.target.files[0])
                    setFile2(URL.createObjectURL(e.target.files[0]))
                }}/>
            )
        }else {
            return (                
                <img src={file2} alt='' />
            )
        }
    }

    const stopRef = (props) => {
        props.preventDefault()
        if (file.type === "image/png" || file.type === "image/jpg" || file.type === "image/jpeg"){
            const formData = new FormData();
            formData.append('imageUrl', file);
            formData.append('data', JSON.stringify(data));
            fetch("http://127.0.0.1:80/signup", {
                method: 'POST',
                body: formData,
                redirect: 'follow'
            })
            .then(response => response.json())
            .then(res => alert(res))
            .catch(error => alert(error));
        }else {
            alert('Check type of image');
        }
    }

    return (
        <div id="signup">
            <button id="xsignup" onClick={()=> {
                document.getElementById("signup").style.visibility = "hidden"
            }}>&#9587;</button>
            <form onSubmit={stopRef} className="signup">
                <h1>Sign Up</h1>
                <label>
                    {imgProf()}
                </label>
                <label>
                    <p>First Name</p>
                    <input type="text" name="fname" id="fname" value={data.fname || ""} onChange={getData} />
                </label>
                <label>
                    <p>Last Name</p>
                    <input type="text" name="lname" id="lname" value={data.lname || ""} onChange={getData} />
                </label>
                <label>
                    <p>DateOfBirth</p>
                    <input type="date" name="dateOfBirth" id="dateOfBirth" value={data.dateOfBirth || ""} onChange={getData} />
                </label>
                <label>
                    <p>Gender</p>
                    <select name="gender" id="gender" value={data.gender || ""} onChange={getData}>
                        <option></option>
                        <option>Male</option>
                        <option>Femmle</option>                        
                    </select>
                </label>                
                <label>
                    <p>Email</p>
                    <input type="email" name="email" id="email" value={data.email || ""} onChange={getData} />
                </label>
                <label>
                    <p>Password</p>
                    <input type="password" name="password" id="password" value={data.password || ""} onChange={getData} />
                </label>
                <label id="aiha">
                    <button>Sign Up</button>
                    
                </label>
                <p id="aihab" onClick={()=>{
                        document.getElementById("signup").style.visibility = "hidden"
                        document.getElementById("signin").style.visibility = "visible"
                    }}>Already i have an account</p>
            </form>
        </div>
    )
}

export default SignUp;
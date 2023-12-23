import "./profile.css";
import "../img/icon/message.png"
import "../img/icon/basket.png"
import "../img/icon/bell.png"
import "../img/icon/search.png"
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";


const User = () => {
    const [pro, setPro] = useState([])
    const [info, setInfo] = useState([])
    const [mypro, setMyPro] = useState([])
    const navigate = useNavigate();
    const { _id } = info;
    const [file, setFile] = useState(null)
    const [file2, setFile2] = useState(null)
    const [search, setSearch] = useState("")
    const [data3, setData3] = useState([])
    const [ref, setRef] = useState(0)

    useEffect(()=> {
        const {token} = JSON.parse(localStorage.getItem("token"))        
        try {
            var myHeaders = new Headers();
            myHeaders.append("token", token);
            fetch("http://127.0.0.1:80/signin", {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            })
            .then(response => response.json())
            .then(result => setInfo(result))
            .catch(error => error);
        } catch (error) {
            console.log(error);
        } 
        // SEARCH
        try {            
            fetch("http://127.0.0.1:80/adminProducts", {
                method: 'GET',
                redirect: 'follow'
            })
            .then(response => response.json())
            .then(result => setData3(result))
            .catch(error => console.log('error', error));
        } catch (error) {
            console.log(error);
        }
    }, [])
    // USER PRODUCTS
    useEffect(()=>{
        try {          
            fetch(`http://127.0.0.1:80/userProduct/${_id}`, {
                method: 'GET',
                redirect: 'follow'
            })
            .then(response => response.json())
            .then(result => setMyPro(result))
            .catch(error =>  error);
        } catch (error) {
            console.log(error)
        }
        setRef(0) 
    }, [_id, ref])
      

    const EditCart = () => {
        return (
            <div className="editCard"> 
                <div className="editCardOne">
                    <button>Edit Image</button>
                    <button>Edit Title</button>
                    <button>Edit Price</button>
                    <button>Edit Category</button>
                </div>
            </div>
        )
    }
    const searchInfo = () => {
        return (
            <div className="adminNavLeftSearchUser" id="adminNavLeftSearch">
                {
                    data3.filter(n=> n.name.toLowerCase().includes(search.toLowerCase())).map(n=> <p>{n.name}</p>)
                }
            </div>
        )
    }

    const getInfo = (props) => {
        const name = props.target.name;
        const value = props.target.value;
        setPro(n=> ({...n, [name]:value, "codeUser": _id}))
    }

    const stopRef = (props) => {
        props.preventDefault() 
        setRef(ref+1)
        const { name, price, type } = pro
        if(name === "" || price ===  "" || type === ""){
            alert("Check Fields")
        } else {
            const formData = new FormData();
            formData.append('imageUrl', file);
            formData.append('data', JSON.stringify(pro));
            var requestOptions = {
                method: 'POST',
                body: formData,
                redirect: 'follow'
            };
            fetch("http://127.0.0.1:80/userInsertProduct", requestOptions)
            .then(response => response.json())
            .then(result => alert("Succes"))
            .catch(error => alert("Feild"));      
        }       
    }
    
    const Affichage = (props) => {
        return (
            <div className="usersBodyMiddleProductCard">
                <img src={`http://127.0.0.1/images/${props.image}`} alt="" />
                <p>{props.name}</p>
                <p><b>${props.price}</b></p>
                <span>
                    <button onClick={()=> {
                        alert(props.code)
                    }}>Edit</button>
                    <button onClick={()=>{    
                        setRef(ref+1)        
                        fetch(`http://127.0.0.1:80/deleteProduct/${props.code}`, {
                        method: 'DELETE',
                        redirect: 'follow'
                        })
                        .then(response => response.json())
                        .then(result => alert('Removed'))
                        .catch(error => alert('error'))
                    }}>Delete</button>
                </span>
            </div>
        )
    }   


    return (
        <div className="users">
            <nav className="usersNav">
                <span>
                    <h1>Store</h1>
                </span>
                <span>
                    <input type="text" placeholder="Search" name='search' readOnly onChange={(e)=> setSearch(e.target.value)} onFocus={()=>{    
                        document.getElementById('adminNavLeftSearch').style.display = 'block'                       
                        
                    }} onBlur={()=>{
                        document.getElementById('adminNavLeftSearch').style.display = 'none'
                    }} />
                    <button>
                        <img src={require("../img/icon/search.png")} alt='' />
                    </button>
                </span>
                <span>
                    <button>
                        <img src={require("../img/icon/message.png")} alt="" />
                    </button>
                    <button>
                        <img src={require("../img/icon/bell.png")} alt="" />
                    </button>
                    <button>
                        <img src={require("../img/icon/basket.png")} alt="" />
                    </button>
                    <div>
                        <button>                            
                            <img src={`http://127.0.0.1/usersImages/${info.imageUrl}`} alt='' />
                        </button>
                        <p>
                            {`${info.fname} ${info.lname}`}
                        </p>
                    </div>
                    
                </span>
            </nav>            
            <nav className="usersNavResp">         
                <div className="usersBodyLeftResp" id="usersBodyLeftResp">
                    <button onClick={()=> {                    
                        document.getElementById("usersBodyLeftResp").style.display = "none"
                    }}>&#9587;</button>
                    <button onClick={()=> {
                        document.getElementById("usersBodyMiddleProduct").style.display = 'flex'
                        document.getElementById("usersBodyMiddleNewProduct").style.display = 'none'
                        document.getElementById("usersBodyMiddleFollowing").style.display = 'none'
                        document.getElementById("usersBodyMiddleFollowers").style.display = 'none'
                        document.getElementById("usersBodyMiddleSetting").style.display = 'none';
                        document.getElementById("usersBodyLeftResp").style.display = "none"
                    }}>&#10148;  My Product</button>
                    <button onClick={()=> {
                        document.getElementById("usersBodyMiddleNewProduct").style.display = 'flex'
                        document.getElementById("usersBodyMiddleProduct").style.display = 'none'   
                        document.getElementById("usersBodyMiddleFollowing").style.display = 'none' 
                        document.getElementById("usersBodyMiddleFollowers").style.display = 'none'     
                        document.getElementById("usersBodyMiddleSetting").style.display = 'none'  
                        document.getElementById("usersBodyLeftResp").style.display = "none"                 
                    }}>&#10148;  New Product</button>
                    <button onClick={()=> {
                        document.getElementById("usersBodyMiddleFollowing").style.display = 'flex'
                        document.getElementById("usersBodyMiddleProduct").style.display = 'none'
                        document.getElementById("usersBodyMiddleNewProduct").style.display = 'none'
                        document.getElementById("usersBodyMiddleFollowers").style.display = 'none'
                        document.getElementById("usersBodyMiddleSetting").style.display = 'none'
                        document.getElementById("usersBodyLeftResp").style.display = "none"
                    }}>&#10148;  Following</button>
                    <button onClick={()=> {
                        document.getElementById("usersBodyMiddleFollowers").style.display = 'flex'
                        document.getElementById("usersBodyMiddleProduct").style.display = 'none'
                        document.getElementById("usersBodyMiddleNewProduct").style.display = 'none'
                        document.getElementById("usersBodyMiddleFollowing").style.display = 'none'
                        document.getElementById("usersBodyMiddleSetting").style.display = 'none'
                        document.getElementById("usersBodyLeftResp").style.display = "none"
                    }}>&#10148;  Followers</button>  
                    <button onClick={()=> console.log('test')}>&#10148;  Back Home</button>                  
                    <button onClick={()=> {
                        document.getElementById("usersBodyMiddleSetting").style.display = 'block'
                        document.getElementById("usersBodyMiddleFollowers").style.display = 'none'
                        document.getElementById("usersBodyMiddleProduct").style.display = 'none'
                        document.getElementById("usersBodyMiddleNewProduct").style.display = 'none'
                        document.getElementById("usersBodyMiddleFollowing").style.display = 'none'
                        document.getElementById("usersBodyLeftResp").style.display = "none"

                    }}>&#10148;  Setting</button>
                    <button onClick={()=> {
                        navigate('/')    
                        localStorage.clear()  
                    }}>&#10148;  Log Out</button>
                </div>      
                <div className="usersNavRespTwo">
                    <div className="usersNavRespLeft">
                        <h1>Store</h1>
                    </div>
                    <div className="usersNavRespMiddile">
                        <input type="text" placeholder="Search"  name='search' readOnly  onChange={(e)=> setSearch(e.target.value)} onFocus={()=>{                         
                            document.getElementById('adminNavLeftSearch').style.display = 'block'                     
                            }} onBlur={()=>{
                                document.getElementById('adminNavLeftSearch').style.display = 'none'
                            }} />
                    </div>
                    <div className="usersNavRespRight">
                        <button>
                            <img src={`http://127.0.0.1/usersImages/${info.imageUrl}`} height='100%' width='100%' alt='' />
                        </button>
                        <button onClick={()=> {
                            document.getElementById("usersBodyLeftResp").style.display = "flex"
                        }}>
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>
                    </div>
                </div>                
            </nav>
            <div className="usersBody">
                <div className="usersBodyLeft">
                    <span>
                        <button onClick={()=> {
                            document.getElementById("usersBodyMiddleProduct").style.display = 'flex'
                            document.getElementById("usersBodyMiddleNewProduct").style.display = 'none'
                            document.getElementById("usersBodyMiddleFollowing").style.display = 'none'
                            document.getElementById("usersBodyMiddleFollowers").style.display = 'none'
                            document.getElementById("usersBodyMiddleSetting").style.display = 'none';
                        }}>&#10148;  My Product</button>
                        <button onClick={()=> {
                            document.getElementById("usersBodyMiddleNewProduct").style.display = 'flex'
                            document.getElementById("usersBodyMiddleProduct").style.display = 'none'   
                            document.getElementById("usersBodyMiddleFollowing").style.display = 'none' 
                            document.getElementById("usersBodyMiddleFollowers").style.display = 'none'     
                            document.getElementById("usersBodyMiddleSetting").style.display = 'none'                   
                        }}>&#10148;  New Product</button>
                        <button onClick={()=> {
                            document.getElementById("usersBodyMiddleFollowing").style.display = 'flex'
                            document.getElementById("usersBodyMiddleProduct").style.display = 'none'
                            document.getElementById("usersBodyMiddleNewProduct").style.display = 'none'
                            document.getElementById("usersBodyMiddleFollowers").style.display = 'none'
                            document.getElementById("usersBodyMiddleSetting").style.display = 'none'
                        }}>&#10148;  Following</button>
                        <button onClick={()=> {
                            document.getElementById("usersBodyMiddleFollowers").style.display = 'flex'
                            document.getElementById("usersBodyMiddleProduct").style.display = 'none'
                            document.getElementById("usersBodyMiddleNewProduct").style.display = 'none'
                            document.getElementById("usersBodyMiddleFollowing").style.display = 'none'
                            document.getElementById("usersBodyMiddleSetting").style.display = 'none'
                        }}>&#10148;  Followers</button>  
                        <button onClick={()=> console.log('test')}>&#10148;  Back Home</button>                  
                        <button onClick={()=> {
                            document.getElementById("usersBodyMiddleSetting").style.display = 'block'
                            document.getElementById("usersBodyMiddleFollowers").style.display = 'none'
                            document.getElementById("usersBodyMiddleProduct").style.display = 'none'
                            document.getElementById("usersBodyMiddleNewProduct").style.display = 'none'
                            document.getElementById("usersBodyMiddleFollowing").style.display = 'none'

                        }}>&#10148;  Setting</button>
                        <button style={{position:"fixed", "bottom":0, width:"240px"}}  onClick={()=> {
                            navigate('/')    
                            localStorage.clear()  
                        }}>&#10148;  Log Out</button>
                    </span>
                </div>
                <div className="usersBodyMiddle">
                    {searchInfo()}
                    {EditCart()}
                    <div className="usersBodyMiddleProduct" id="usersBodyMiddleProduct">
                        {
                            mypro.map(n=> <Affichage key={n._id} code={n._id} name={n.name} price={n.price} image={n.imageUrl}  />)
                        }
                    </div>
                    <div className="usersBodyMiddleNewProduct" id="usersBodyMiddleNewProduct">
                        <form onSubmit={stopRef}>
                            <div className="usersBodyMiddleNewProductCard">
                                <img src={file2} alt='' />
                                <p>{pro.name}</p>
                                <p>${pro.price}</p>
                                <p>#{pro.type}</p>
                            </div>
                            <label>                                
                                <input type='file' onChange={(e)=> {
                                    setFile(e.target.files[0])
                                    setFile2(URL.createObjectURL(e.target.files[0]))
                                }} />
                            </label>
                            <label>
                                <p>Title</p>
                                <input type="text" name="name" value={pro.name || ""} onChange={getInfo} />
                            </label>
                            <label>
                                <p>Price</p>
                                <input type="float" name="price" value={pro.price || ""} onChange={getInfo} />
                            </label>
                            <label>
                                <p>category</p>
                                <input type="text" name="type" value={pro.type || ""} onChange={getInfo} />
                            </label>
                            <button type="submit" onClick={()=>{                                 
                                setRef(pro)  
                            }}>Add</button>
                        </form>
                    </div>
                    <div className="usersBodyMiddleFollowing" id="usersBodyMiddleFollowing">
                        <div className="usersBodyMiddleFollowingCard">
                            <img src="" alt="" />
                            <h3>FullName</h3>
                            <button>Following</button>
                        </div>
                    </div>
                    <div className="usersBodyMiddleFollowers" id="usersBodyMiddleFollowers">
                        <div className="usersBodyMiddleFollowersCard">
                            <img src="" alt="" />
                            <h3>FullName</h3>
                            <button>Remove</button>
                        </div>
                    </div>
                    <div className="usersBodyMiddleSetting" id="usersBodyMiddleSetting">
                    <div className="adminContentSettingContent">
                        {/* <h1>Setting</h1> */}
                        <div>
                            <span>
                                <p>change image</p>
                                <input type="file" id="imgadmin"/>
                            </span>
                            <span>
                                <p>change name</p>
                                <input type="text" placeholder={info.fullname} />
                            </span>
                            <span>
                                <p>change date of birth</p>
                                <input type="date" />
                            </span>
                            <span>
                                <p>change email</p>
                                <input type="email" placeholder={info.email} />
                            </span>
                            <span>
                                <p>change password</p>
                                <input type="password" />
                            </span>
                            <span>
                                <input type="button" value='update' />
                            </span> 
                        </div>                       
                    </div>
                    </div>
                </div>
                <div className="usersBodyRight"></div>
            </div>
        </div>
    )
}


export default User
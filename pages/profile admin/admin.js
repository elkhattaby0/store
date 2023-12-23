import "./admin.css";
import "../img/icon/admin/group.png";
import "../img/icon/admin/product.png";
import "../img/icon/admin/trade.png";
import "../img/icon/admin/best-seller.png";
import "../img/icon/admin/deal.png";
import "../img/icon/admin/setting.png";
import "../img/icon/admin/logout.png";
import "../img/icon/message.png";
import "../img/icon/bell.png";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Admin = () => {
    const [data, setData] = useState([])
    const [data2, setData2] = useState([])
    const [data3, setData3] = useState([])
    const [data4, setData4] = useState([])
    const [data5, setData5] = useState([])
    const [search, setSearch] = useState("")
    const [deleteProduct, setDeleteProduct] = useState(0)
    const navigate = useNavigate()

    useEffect(()=> {
        const {token} = JSON.parse(localStorage.getItem("token"))        
        try {
            var myHeaders = new Headers();
            myHeaders.append("token", token);
            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };
            fetch("http://127.0.0.1:80/signin", requestOptions)
            .then(response => response.json())
            .then(result => setData(result))
            .catch(error => console.log('error', error));
        } catch (error) {
            console.log(error);
        }         

    }, [])

    useEffect(()=>{
        try {            
            fetch("http://127.0.0.1:80/admin", {
                method: 'GET',
                redirect: 'follow'
            })
            .then(response => response.json())
            .then(result => setData2(result))
            .catch(error => console.log('error', error));
        } catch (error) {
            console.log(error);
        }

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
        setDeleteProduct(0)
    }, [deleteProduct])

    useEffect(()=>{
          fetch("http://127.0.0.1:80/tredingProducts/", {
            method: 'GET',
            redirect: 'follow'
          })
            .then(response => response.json())
            .then(result => setData4(result))
            .catch(error => error);
            
        setDeleteProduct(0)
    }, [deleteProduct])
    useEffect(()=>{
        fetch("http://127.0.0.1:80/tredingUsers/", {
            method: 'GET',
            redirect: 'follow'
        })
        .then(response => response.json())
        .then(result => setData5(result))
        .catch(error =>  error);          
      setDeleteProduct(0)
  }, [deleteProduct])

    const searchInfo = () => {
        return (
            <div className="adminNavLeftSearch" id="adminNavLeftSearch">
                {
                    // data2.filter(x=> x.fname.toLowerCase().includes(search.toLowerCase()) || x.lname.toLowerCase().includes(search.toLowerCase())).map(x=> <p>{`${x.fname} ${x.lname}`}</p>)
                }
                {
                    data3.filter(n=> n.name.toLowerCase().includes(search.toLowerCase())).map(n=> <p>{n.name}</p>)
                }
            </div>
        )
    }


    const Users = (props) => {
        return (
            <tr>
                <td>--</td>
                <td>{props.fname}</td>
                <td>{props.lname}</td>
                <td>{props.dateBirth}</td>
                <td>{props.gender}</td>
                <td>{props.email}</td>
                <td>
                    <button onClick={()=> {
                        setDeleteProduct(deleteProduct+1)          
                        var myHeaders = new Headers();
                        myHeaders.append("Content-Type", "application/json");
                        fetch(`http://127.0.0.1:80/deleteUser/${props.code}`, {
                            method: 'DELETE',
                            headers: myHeaders,
                            redirect: 'follow'
                        })
                        .then(response => response.json())
                        .then(result => alert('success'))
                        .catch(error => alert('failed'));
                        
                        fetch(`http://127.0.0.1:80/adimnDeleteProducts/${props.code}`, {
                            method: 'DELETE',
                            redirect: 'follow'
                        })
                        .then(response => response.json())
                        .then(result => result)
                        .catch(error =>  error);              
                    }}>&#10060;</button>
                </td>
            </tr>
        )
    } 
    const Product = (props) => {
        return (
            <tr>
                <td>--</td>
                <td>{props.name}</td>
                <td>--</td>
                <td>${props.price}</td>
                <td>--</td>
                <td>--</td>
                <td>--</td>
                <td>
                    <button onClick={()=>{
                        setDeleteProduct(deleteProduct+1)
                        fetch(`http://127.0.0.1:80/deleteProduct/${props.code}`, {
                            method: 'DELETE',
                            redirect: 'follow'
                        })
                        .then(response => response.json())
                        .then(result => alert('Removed'))
                        .catch(error => alert('error'))
                    }}>&#10060;</button>
                </td>
            </tr>
        )
    }
    
    return (
       <div className="adminPanel">
        <div className="adminPanelLeft">
            <h1>Store</h1>
            <span>
                <button onClick={()=> {
                    document.getElementById('adminContentUsers').style.display = 'block'
                    document.getElementById('adminContentProduct').style.display = 'none'
                    document.getElementById('adminContentTredingUsers').style.display = 'none'
                    document.getElementById('adminContentTredingProduct').style.display = 'none'
                    document.getElementById('adminContentSponsor').style.display = 'none'
                    document.getElementById('adminContentSetting').style.display = 'none'
                    document.getElementById('adminContentMessage').style.display = 'none'
                }}>
                    <img src={require("../img/icon/admin/group.png")} alt='' height='30px' width='30px' />
                    Users</button>
                <button onClick={()=> {
                    document.getElementById('adminContentProduct').style.display = 'block'
                    document.getElementById('adminContentUsers').style.display = 'none'                    
                    document.getElementById('adminContentTredingUsers').style.display = 'none'
                    document.getElementById('adminContentTredingProduct').style.display = 'none'
                    document.getElementById('adminContentSponsor').style.display = 'none'
                    document.getElementById('adminContentSetting').style.display = 'none'
                    document.getElementById('adminContentMessage').style.display = 'none'
                    
                }}>
                    <img src={require("../img/icon/admin/product.png")} alt='' height='30px' width='30px' />
                    Products
                </button>
                <button onClick={()=> {
                    document.getElementById('adminContentTredingUsers').style.display = 'block'
                    document.getElementById('adminContentUsers').style.display = 'none'
                    document.getElementById('adminContentProduct').style.display = 'none'
                    document.getElementById('adminContentTredingProduct').style.display = 'none'
                    document.getElementById('adminContentSponsor').style.display = 'none'
                    document.getElementById('adminContentSetting').style.display = 'none'
                    document.getElementById('adminContentMessage').style.display = 'none'
                }}>
                    <img src={require("../img/icon/admin/trade.png")} alt='' height='30px' width='30px' />
                    Treding Users                    
                </button>
                <button onClick={()=> {
                    document.getElementById('adminContentTredingProduct').style.display = 'block'
                    document.getElementById('adminContentUsers').style.display = 'none'
                    document.getElementById('adminContentProduct').style.display = 'none'
                    document.getElementById('adminContentTredingUsers').style.display = 'none'   
                    document.getElementById('adminContentSponsor').style.display = 'none'  
                    document.getElementById('adminContentSetting').style.display = 'none'  
                    document.getElementById('adminContentMessage').style.display = 'none'           
                }}>
                    <img src={require("../img/icon/admin/trade.png")} alt='' height='30px' width='30px' />
                    Treding Product
                </button>                
                <button onClick={()=> {
                    document.getElementById('adminContentSponsor').style.display = 'block'
                    document.getElementById('adminContentUsers').style.display = 'none'
                    document.getElementById('adminContentProduct').style.display = 'none'
                    document.getElementById('adminContentTredingUsers').style.display = 'none'
                    document.getElementById('adminContentTredingProduct').style.display = 'none'
                    document.getElementById('adminContentSetting').style.display = 'none'
                    document.getElementById('adminContentMessage').style.display = 'none'
                }}>
                    <img src={require("../img/icon/admin/deal.png")} alt='' height='30px' width='30px' />
                    Sponsor
                </button>
                <button onClick={()=> {
                    document.getElementById('adminContentSetting').style.display = 'flex'
                    document.getElementById('adminContentUsers').style.display = 'none'
                    document.getElementById('adminContentProduct').style.display = 'none'
                    document.getElementById('adminContentTredingUsers').style.display = 'none'
                    document.getElementById('adminContentTredingProduct').style.display = 'none'
                    document.getElementById('adminContentSponsor').style.display = 'none'
                    document.getElementById('adminContentMessage').style.display = 'none'
                }}>
                    <img src={require("../img/icon/admin/setting.png")} alt='' height='30px' width='30px' />
                    Setting
                </button>
                <button onClick={()=> {
                    navigate('/')    
                    localStorage.clear()            
                }}>
                    <img src={require("../img/icon/admin/logout.png")} alt='' height='30px' width='30px' />
                    Log Out
                </button>
            </span>
        </div>
        <div className="adminPanelRight">
            <nav>
                <div className="adminNavLeft">
                    <input type="text" placeholder="Search" name='search' readOnly onChange={(e)=> setSearch(e.target.value)} onFocus={()=>{    
                        document.getElementById('adminNavLeftSearch').style.display = 'block'                       
                        
                    }} onBlur={()=>{
                        document.getElementById('adminNavLeftSearch').style.display = 'none'
                    }} />
                    
                    
                    <button>
                        <img src={require("../img/icon/search.png")} height='20px' width='20px' alt='' />
                    </button>
                </div>
                <div className="adminNavRight">
                    <button onClick={()=> {
                    document.getElementById('adminContentMessage').style.display = 'flex'
                    document.getElementById('adminContentSponsor').style.display = 'none'
                    document.getElementById('adminContentUsers').style.display = 'none'
                    document.getElementById('adminContentProduct').style.display = 'none'
                    document.getElementById('adminContentTredingUsers').style.display = 'none'
                    document.getElementById('adminContentTredingProduct').style.display = 'none'
                    document.getElementById('adminContentSetting').style.display = 'none'
                    }}>
                        <img src={require("../img/icon/message.png")} alt='' />
                    </button>
                    <button>
                        <img src={require("../img/icon/bell.png")} alt='' />
                    </button>
                    <button  className="adminNavRightUser">
                        {/* <img src="" height='30px' width='30px' alt='' /> */}
                        &#128118;
                    </button>
                    <p style={{paddingLeft:"5px"}}>
                        <p style={{fontSize:"80%", margin:0 ,padding:0}}>
                        {
                            `${data.fname} ${data.lname}`
                        }</p>
                        
                        &#10026;Admin&#10026;
                    </p>
                </div>
            </nav>
            <div className="adminContent">
                    {
                        searchInfo()
                    }
                <div className="adminContentUsers" id="adminContentUsers" >
                    <table>
                        <caption>&#11088;Users&#11088;</caption>
                        <tr>
                            <th>&#128204; ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>&#128197; Date birth</th>
                            <th>Gender</th>
                            <th>&#9993; Email</th>
                            <th>Action</th>
                        </tr>
                        {
                            data2.filter(item=> item._id !== data._id).map(item=> <Users key={item._id} code={item._id} fname={item.fname} lname={item.lname} dateBirth={item.dateOfBirth} gender={item.gender} email={item.email} />)
                        }
                        
                    </table>
                </div>
                <div className="adminContentProduct" id="adminContentProduct">
                    <table>
                        <caption>&#11088;Products&#11088;</caption>
                        <tr>
                            <th>&#128204; ID</th>
                            <th>Title</th>
                            <th>&#11088;</th>
                            <th>&#128176; Price</th>
                            <th>&#128077; Like</th>
                            <th>&#128204; UserID</th>
                            <th>Sells</th>
                            <th>Action</th>
                        </tr>
                        {
                            data3.map(item=> <Product key={item._id} code={item._id} name={item.name} price={item.price} codeUser={item.codeUser} />)
                        }
     
                        </table>
                </div>
                <div className="adminContentTredingUsers" id="adminContentTredingUsers">
                    <div className="adminContentTredingProductSelect" >
                        <select id="adminContentTredingUsersId">
                            <option></option>
                            {
                                data2.filter(n=> n.admin !== true).map(n=> <option value={n._id} >{`${n.fname} ${n.lname}`}</option>)
                            }
                        </select>
                        <button onClick={()=>{                            
                            setDeleteProduct(deleteProduct+1)       
                            fetch(`http://127.0.0.1:80/tredingUsers/${document.getElementById('adminContentTredingUsersId').value}`, {
                                method: 'POST',
                                redirect: 'follow'
                            })
                            .then(response => response.text())
                            .then(result => alert(result))
                            .catch(error => error);
                        }}>Add</button>
                    </div>
                    <table>
                        <caption>&#11088;Treding Users&#11088;</caption>
                        <tr>
                            <th>&#128204; ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>&#128197; Date Birth</th>
                            <th>&#9993; Email</th>
                            <th>Action</th>
                        </tr>
                        {
                            data5.map(n=> data2.filter(x=> x._id === n.codeUser ).map(n=> {
                                return (
                                    <tr>
                                        <td>--</td>
                                        <td>{n.fname}</td>
                                        <td>{n.lname}</td>
                                        <td>{n.dateOfBirth}</td>
                                        <td>{n.email}</td>
                                        <td>
                                            <button onClick={()=>{       
                                                setDeleteProduct(deleteProduct+1)                                        
                                                fetch(`http://127.0.0.1:80/tredingUsers/${n._id}`, {
                                                    method: 'DELETE',
                                                    redirect: 'follow'
                                                })
                                                .then(response => response.text())
                                                .then(result => alert(result))
                                                .catch(error => error);
                                            }}>&#10060;</button>
                                        </td>
                                    </tr> 
                                )
                            }))
                        }                                               
                    </table>
                </div>
                <div className="adminContentTredingProduct" id="adminContentTredingProduct">
                    <div className="adminContentTredingProductSelect" >
                        <select id="adminContentTredingProductSelect">
                            <option></option>
                            {
                                data3.map(n=> <option value={n._id} >{n.name}</option>)
                            }
                        </select>
                        <button onClick={()=>{                            
                            setDeleteProduct(deleteProduct+1)       
                            fetch(`http://127.0.0.1:80/tredingProducts/${document.getElementById('adminContentTredingProductSelect').value}`, {
                                method: 'POST',
                                redirect: 'follow'
                            })
                            .then(response => response.text())
                            .then(result => alert(result))
                            .catch(error => alert(error));
                        }}>Add</button>
                    </div>
                    <table>
                        <caption>&#11088;Treding Products&#11088;</caption>
                        <tr>
                            <th>&#128204; ID</th>
                            <th>Title</th>
                            <th>&#11088;</th>
                            <th>&#128176; Price</th>
                            <th>&#128077; Like</th>
                            <th>&#128204; UserID</th>
                            <th>&#128200; Sells</th>
                            <th>Action</th>
                        </tr>
                        {
                            data4.map(n=> data3.filter(x=> x._id === n.codeProduct ).map(n=> {
                                return(
                                <tr>
                                    <td>--</td>
                                    <td>{n.name}</td>
                                    <td>--</td>
                                    <td>${n.price}</td>
                                    <td>--</td>
                                    <td>--</td>
                                    <td>--</td>
                                    <td>
                                        <button onClick={()=> {
                                            setDeleteProduct(deleteProduct+1)   
                                            fetch(`http://127.0.0.1:80/tredingProducts/${n._id}`, {
                                                method: 'DELETE',
                                                redirect: 'follow'
                                            })
                                                .then(response => response.json())
                                                .then(result => alert(result.mes))
                                                .catch(error => error);
                                        }}>&#10060;</button>
                                    </td>
                                </tr> )
                            }))
                        }
                                               
                    </table>
                </div>                
                <div className="adminContentSponsor" id="adminContentSponsor">
                    <table>
                        <caption>&#11088;Sponsor&#11088;</caption>
                        <tr>
                            <th>&#128204; ID</th>
                            <th>Brand</th>
                            <th>Action</th>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>Apple</td>
                            <td>
                                <button>&#10060;</button>
                            </td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Sony</td>
                            <td>
                                <button>&#10060;</button>
                            </td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>Samsung</td>
                            <td>
                                <button>&#10060;</button>
                            </td>
                        </tr>
                        <tr>
                            <td>4</td>
                            <td>Xiaomi</td>
                            <td>
                                <button>&#10060;</button>
                            </td>
                        </tr>
                        <tr>
                            <td>5</td>
                            <td>Howaei</td>
                            <td>
                                <button>&#10060;</button>
                            </td>
                        </tr>
                    </table>
                </div>
                <div className="adminContentSetting" id="adminContentSetting">
                    <div className="adminContentSettingContent">
                        <h1>Setting</h1>
                        <div>
                            <span>
                                <p>change image</p>
                                <input type="file" id="imgadmin"/>
                            </span>
                            <span>
                                <p>change name</p>
                                <input type="text" placeholder={data.fullname}/>
                            </span>
                            <span>
                                <p>change date of birth</p>
                                <input type="date" placeholder={data.dateOfBirth} />
                            </span>
                            <span>
                                <p>change email</p>
                                <input type="email" placeholder={data.email} />
                            </span>
                            <span>
                                <p>change password</p>
                                <input type="password" />
                            </span>
                            <span>
                                <input type="button" value='update'  />
                            </span> 
                        </div>                       
                    </div>
                </div>
                <div className="adminContentMessage" id="adminContentMessage">
                    <div className="adminContentMessageContent">
                        <img src='' alt='' />
                        <div>
                            <p>alex jhon</p>
                            <p>
                                hey how are u 
                            </p>
                        </div>
                    </div>
                </div>
            </div>            
        </div>
       </div>
    )
}

export default Admin;
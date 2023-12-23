import './home.css';
import Footer from "../footer/footer";
import '../img/cover.png';
import '../img/icon/truck-side.png'
import '../img/icon/shield-check.png'
import '../img/icon/time-quarter-past.png'
import { brand } from '../data';
import Card from '../card/card';
import CardUser from '../card user/cardUser';
import Sponsor from '../Sponsor/Sponsor';
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import { useEffect, useState } from 'react';

export default function Home(){
    const [data, setData] = useState([])
    const [data1, setData1] = useState([])
    const [users, setUsers] = useState([])
    const [users2, setUsers2] = useState([])
    // const [check, setCheck] = useState(0)

    useEffect(()=>{
        fetch("http://127.0.0.1:80/adminProducts", {
            method: 'GET',
            redirect: 'follow'
        })
        .then(response => response.json())
        .then(result => setData1(result))
        .catch(error =>  error);

        fetch("http://127.0.0.1:80/tredingProducts/", {
            method: 'GET',
            redirect: 'follow'
          })
            .then(response => response.json())
            .then(result => setData(result))
            .catch(error => error);

        fetch("http://127.0.0.1:80/admin", {
            method: 'GET',
            redirect: 'follow'
        })
        .then(response => response.json())
        .then(result => setUsers(result))
        .catch(error => error);

        fetch("http://127.0.0.1:80/tredingUsers/", {
            method: 'GET',
            redirect: 'follow'
        })
        .then(response => response.json())
        .then(result => setUsers2(result))
        .catch(error =>  error); 

    }, [])

    const colTwo = [
        {
            id:1, 
            head_text:'Free Shipping',
            long_text:'Shop now and enjoy the added benefit of free, worry-free shipping. Get the products you love without the extra cost!',
            picture: require('../img/icon/truck-side.png')
        },
        {
            id:2, 
            head_text:'30 Days Easy Return',
            long_text:"Shop now and experience the freedom of stress-free shopping, knowing you're in good hands with our 30-day easy return policy.",
            picture: require('../img/icon/time-quarter-past.png')
        },
        {
            id:3, 
            head_text:'Payment Secure',
            long_text:'Start shopping now, and experience the convenience of our secure payment system, designed with your trust and protection in mind.',
            picture: require('../img/icon/shield-check.png')
        }
    ]

        
    const Show = ()=>{
        return (
            <div className='homeContent'>
                <div className='homeLeft'>
                    <span>
                        <h1>The lastest, the best are available here</h1><br/>
                        <ul>
                            <li>
                                Quality Assurance
                            </li>
                            <li>
                                Variety & Uniqueness
                            </li>
                            <li>
                                Customer-Centric Approach
                            </li>
                            <li>
                                Secure Shopping
                            </li>
                            <li>
                                Regular Updates
                            </li>
                        </ul><br/>
                        <button>Product</button>
                    </span>
                </div>
                <div className='homeRight'></div>
            </div>
        )
    }
 
    const HomeCard = (props)=>{
        return (
            <div className='homeCard' data-aos="fade-up"
            data-aos-anchor-placement="top-center">
                <div className='homeCardLeft'>
                    <img src={props.pic} alt='' />
                </div>
                <div className='homeCardRight'>
                    <h1>{props.head}</h1>
                    <p>{props.text}</p>
                </div>
            </div>
        )
    }

    return (
        <div className='home' data-aos="fade-up"
        data-aos-duration="3000"> 
            <div className="firstRow">
                <Show />
            </div>
            <div className="secondRow">
                {colTwo.map(item=> <HomeCard key={item.id} pic={item.picture} head={item.head_text} text={item.long_text} />)}
            </div>
            <div className='tredingOne'  data-aos="fade-up"
            data-aos-anchor-placement="top-center">
                <h1>Treding Product</h1>
                <div className='treding'  data-aos="fade-up"
            data-aos-anchor-placement="top-center">
                    {
                        data.map(n=> data1.filter(x=> x._id === n.codeProduct ).map(x=> <Card key={x.id} image={x.imageUrl} title={x.name} price={x.price} />))
                    }
                </div>
            </div>
            <div className='tredingOne tredingTwo'  data-aos="fade-up"
            data-aos-anchor-placement="top-center">
                <h1>Treding Users</h1>
                <div className='treding'  data-aos="fade-up"
            data-aos-anchor-placement="top-center">
                    {
                        users2.map(n=> users.filter(x=> x._id === n.codeUser).map(n=> <CardUser key={n._id} image={n.imageUrl} fname={n.fname} lname={n.lname} />))
                    }
                </div>
            </div>
            <div className='sponsor' data-aos="fade-up"
            data-aos-anchor-placement="top-center">
                <h1>Sponsor</h1>
                <span data-aos="fade-up"
                data-aos-anchor-placement="top-center"  className='sponsorSpan'>
                {
                    brand.map(n=> <Sponsor key={n.id} image={n.image} />)
                }
                </span>
            </div>
            {Footer()}
        </div>
    )
    
}

AOS.init();

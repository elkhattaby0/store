import Card from "../card/card";
import Footer from "../footer/footer";
import './product.css'
import { useEffect, useState } from "react";
import '../img/account.png'


export default function Shop(){
    const [cati, setCati] = useState([]);
    const [products, setProducts] = useState([])
    const [showByType, setShowByType] = useState([])
    const [check, setCheck] = useState('all')
    
   
    useEffect(()=> {
        try {            
            fetch("http://127.0.0.1:80/adminProducts", {
                method: 'GET',
                redirect: 'follow'
            })
            .then(response => response.json())
            .then(result => setProducts(result))
            .catch(error => error);
        } catch (error) {
            
        }

        try {              
            fetch("http://127.0.0.1:80/getType", {
                method: 'GET',
                redirect: 'follow'
            })
            .then(response => response.json())
            .then(result => setCati(result))
            .catch(error => error)
        } catch (error) {
            
        }
    }, [])
    useEffect(()=>{
        try {              
            fetch(`http://127.0.0.1:80/getByType/${check}`, {
                method: 'GET',
                redirect: 'follow'
            })
            .then(response => response.json())
            .then(result => setShowByType(result))
            .catch(error => error);
        } catch (error) {
            
        }
    }, [check])

    const Categorie = (props)=>{
        return <option value={props.title}>{props.title}</option>
    }

    const Show = ()=>{
        if(check === "all"){
            return products.map(e=> <Card key={e.id} image={e.imageUrl} title={e.name} price={e.price} />)
        }
        else if(check){            
            return showByType.map(e=> <Card key={e.id} image={e.imageUrl} title={e.name} price={e.price} />)
        }
    }

    return (
        <div  data-aos="fade-up"
        data-aos-duration="3000" className="productPage">
            <header>
                <p>{0} Product(s) found</p>
                <div className="select">
                    <p>Sort By</p>
                    <span>
                        <select id="select">
                            <option value='all'>all</option>
                            {
                                cati.map(s=><Categorie title={s} />)
                            }
                        </select>
                        <button onClick={()=> setCheck(document.getElementById('select').value)}>Filter</button>
                    </span>
                </div>
            </header>
            <div className="product">
                {Show()}
            </div>
            <br/>
            {Footer()}
        </div>
        
        )
}
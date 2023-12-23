import "./card.css"
import "../img/icon/heart.png"

import AOS from 'aos';
import 'aos/dist/aos.css';

const Card = (props) => {

    return (
        <div className="cardShop"  data-aos="flip-up"  data-aos-anchor-placement="center-bottom">
            <button className="liked" onClick= {()=> {
                        document.getElementById("signin").style.visibility = "visible"
                    }}>
                <img src={require("../img/icon/heart.png")} alt="img" />
            </button>
            <div className="imgShop">
                <img src={`http://127.0.0.1/images/${props.image}`} alt="" />
            </div>
            <div className="bottomShop">
                <p>{props.title}</p>
                <div className="rating">   
                    <span>
                        &#9733;
                    </span>               
                    <p>---</p>
                </div>
                <span>
                    <h3>${props.price}</h3>
                    <button onClick={()=> {
                        document.getElementById("signin").style.visibility = "visible"
                    }}>Add to card</button>
                </span>

            </div>

        </div>
    )
}
AOS.init();

export default Card

import './footer.css';
import { Payments, SocialMedia } from '../data';
import "../img/icon/phone.png"
import "../img/icon/message.png"

export default function Footer(){
    const PaymentImage = (props) => {
        return <img src={props.image} height='30px' width='30px' alt='' />
    }
    const SocialImage = (props) => {
        return <img className='imgsocialmedia' src={props.image} height='25px' width='25px' alt='' />
    }
    return (
        <div className="footer">
            <footer>
                <div className='footterOne footerCol'>
                    <h1>Store</h1>
                    <p>Dcheira Agadir, Morocco</p>
                    <div className='footerFlex'>
                    <img src={require("../img/icon/phone.png")} height='25px' width='25px'  alt='' />
                        <p>Hotline 24/7</p>
                    </div>
                    <h3>06 123 456 90</h3>
                    <div className='footerFlex'>
                        <img src={require("../img/icon/message.png")} height='5px' width='5px'  alt='' />
                        <p>example@email.com</p>
                    </div>
                </div>

                <div className='footterTwo footerCol'>
                    <div>
                        <h4>QUICK NAVIGATION</h4>
                        <p>About Us</p>
                        <p>News & Events</p>
                        <p>Terms & Conditions</p>
                    </div>
                    <div>
                        <h4>KNWOLEDGE BASE</h4>
                        <p>Faq</p>
                        <p>Policy</p>
                        <p>Email</p>
                    </div>
                    <div>
                        <h4>INFORMATION</h4>
                        <p>News Arrivals</p>
                        <p>Delivery</p>
                        <p>Privacy Policy</p>
                    </div>                    
                </div>

                <div className='footterThtree footerCol'>
                    <div>
                        <input type='email' placeholder='Your email address' />
                        <button>Subscribe</button>
                    </div>
                    <div>
                        {
                            Payments.map(item=> <PaymentImage key={item.id} image={item.image} />)
                        }
                    </div>
                </div>
            </footer>    <br/><br/><br/>
            <footer className='footerTwo'>
                <p>&#169; 2023 Lahoucine El Khattaby - All rights reserved</p>
                <div>
                    {
                        SocialMedia.map(item=> <SocialImage key={item.id} image={item.image} />)
                    }
                </div>
            </footer>
        </div>
    )
}

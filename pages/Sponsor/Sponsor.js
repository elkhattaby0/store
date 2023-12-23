import "./sponsor.css"
const Sponsor = (props) => {
    return (
        <div className="sponsorContent" data-aos="fade-up"
        data-aos-anchor-placement="top-center">
            <img src={props.image} alt='' />
        </div>
    )
}

export default Sponsor 
import "./cardUser.css"

const CardUser = (props) => {
    return (
        <div className="CardUser" id="CardUser">
            <div></div>
            <img src={`http://127.0.0.1/usersImages/${props.image}`} alt='' />
            <p>{`${props.fname} ${props.lname}`}</p>
            <button>Contact</button>
        </div>
    ) 
}

export default CardUser
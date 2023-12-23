import '../img/error404png.png';
export default function NoPage(){
    return (
        <div style={{border: '0px solid black', width: '85%', height: '80vh', display: 'flex'}}>
            <img src={require('../img/error404png.png')} alt="Error 404" style={{height:'80vh', width:'90vh'}} />
        </div>
    )
}
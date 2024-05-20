import { CharImg, ImgCont } from "./Characters"
import styled from "styled-components";
import banner from "./assets/banner.jpeg"

const Cont = styled(ImgCont) /*style*/ `
margin-top:2rem;
width:100vw;
height:auto;
overflow: hidden; 
display: flex;
background:	rgb(151,206,76,.8);
box-shadow: 0px 4.59475px 4.59475px rgba(0, 0, 0, 0.25);
justify-content:center;
:hover{
opacity: unset;
}


`
const Img = styled(CharImg) /*style*/`
    object-fit:none;
    width: 50%;
    height:20%;
    position: relative;
    object-position:50% 50%;
    box-shadow: 0px 4.59475px 4.59475px rgba(0, 0, 0, 0.25);
    border-radius:19%;
  
  `;

const Banner = () => {

    return (
        <div 
        className="BannerCont"
        style={{transform:"scale(.9)"}}
        >
        <Cont>
            <Img
            src={banner}
            />
        </Cont>
        </div>
    )
}

export default Banner
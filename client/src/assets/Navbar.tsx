import styled from "styled-components";
import rick from "./rickHead.png"
import morty from "./mortHead.png"
import { Navigate, useNavigate } from "react-router-dom";

const NavBarContainer = styled.div /*style*/ `
width:100vw;
height:5rem;
background:white;
margin-bottom:0 !important;
margin-top:0 !important;
display:flex;
align-items:center;
box-shadow: 0px 4.59475px 4.59475px rgba(0, 0, 0, 0.25);

`

const MenuNav = styled.ul /*style*/ `
padding-right:2rem;
width:50%;
display:flex;
justify-content:flex-end;
gap:2rem;
font-weight:800;
list-style:none ;
.liStyle{
&:hover{
cursor: pointer !important;
color:purple !important;
}
}
`

const ImgCont = styled.div /*style*/ `
width:50%;
height:100%;
overflow: hidden; 
border-radius:2rem;
position: relative;
right:9rem;
:hover{
opacity: .9;

}
`
const CharImg = styled.img <{bottom:string}> /*style*/`
    object-fit:cover;
    width: 20%;
    height:auto;
    position: relative;
    object-position:50% 50%;
    bottom:${props =>(props.bottom )};
  `;


const NavBar = () => {

    const navigate = useNavigate()

    return(
<NavBarContainer>
    <ImgCont>
    <CharImg
    bottom=".9rem"
    src={rick}
    />
    <CharImg
    bottom="1.8rem"
    src={morty}
    />
    </ImgCont>
<MenuNav>
    <li className="liStyle"
    onClick={() => {navigate("/characters")}}
    >Characters</li>
    {/* <li className="liStyle"
    onClick={() => {navigate("/Locations")}}
    >Locations</li> */}
    <li className="liStyle"
    onClick={() => {navigate("/Favorites")}}
    >Favorites</li>
</MenuNav>
</NavBarContainer>
    )
}

export default NavBar
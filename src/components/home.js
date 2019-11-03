/* eslint-disable prefer-const */
/* eslint-disable no-alert */
/* eslint-disable no-undef */
/* eslint-disable func-names */
/* eslint-disable react/no-deprecated */
import React from "react";
import { Link } from "react-router-dom";
import { Button, Carousel } from "react-bootstrap";
import "../stylesheets/home.css";
import img1 from "../images/slide1.png";
import img2 from "../images/slide2.jpg";
import img3 from "../images/slide3.jpg";

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
     };
  }

 
 
  render(){
      return(
        <div>
            <Carousel className="custom-carousel" interval="3000" >
                <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={img1}
                    alt="First slide"
                />
                </Carousel.Item>
                <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={img2}
                    alt="Third slide"
                />
                </Carousel.Item>
                <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={img3}
                    alt="Third slide"
                />
                </Carousel.Item>
             </Carousel>
             <hr/>
             <div className="wrap">
             <Link to="/room">
                <Button className="play-button">Chơi ngay</Button>
             </Link>
                     
            </div>
        </div>
       
      );
  }
  
}
export default Home;

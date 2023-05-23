import React from "react";
import Navbar from "../../Navbar/navbar";
function Home(){
  
  return(
    <div className="page-hero bg-image overlay-dark" style={{backgroundImage: 'url(../assets/img/bg_image_1.jpg)'}}>
      <Navbar/>
        <div className="hero-section">
          <div className="container text-center wow zoomIn">
            <span className="subhead">Let's make your life happier</span>
            <h1 className="display-4">Healthy Living</h1>
            <a href="#" className="btn btn-primary">Let's Consult</a>
          </div>
        </div>
      </div>
    );
}

export default Home;
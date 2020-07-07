import React, { FunctionComponent } from "react";
import Navigation from "../../modules/Navigation";
import Slideshow, { ImageSlide } from "../../modules/Slideshow";
import AboutMe from "../../modules/AboutMe";
import InstagramSection from "../../modules/Instagram";
import Skills from "../../modules/Skills";
import ProjectsSection from "../../modules/Projects";
import climbing from "../../images/climbing.jpg";
import climbingWebp from "../../images/climbing.webp";
import seated from "../../images/seated.jpg";
import seatedWebp from "../../images/seated.webp";
import "../../modules/styles.scss";

const slideshowProps = [
    { image: { src: seated, srcWebp: seatedWebp } },
    { image: { src: climbing, srcWebp: climbingWebp } }
];

const Homepage: FunctionComponent = () => {
    return (
        <Navigation>
            <Slideshow
                items={ slideshowProps }
                component={ ImageSlide }
                options={ {
                    isHero: true,
                    overlayLogo: true,
                    hideMobile: true
                } }
            />
            <div className="section" id="about-me">
                <AboutMe />
            </div>
            <div className="section">
                <InstagramSection />
            </div>
            <div className="section fullwidth" id="skills">
                <Skills />
            </div>
            <div id="projects">
                <ProjectsSection />
            </div>
        </Navigation>
    );
};

export default Homepage;

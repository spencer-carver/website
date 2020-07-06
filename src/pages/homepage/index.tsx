import React from "react";
import Navigation from "../../modules/Navigation";
import Slideshow, { ImageSlide } from "../../modules/Slideshow";
import AboutMeSection from "../../modules/AboutMe";
import InstagramSection from "../../modules/Instagram";
import Skills from "../../modules/Skills";
import ProjectsSection from "../../modules/Projects";
import climbing from "../../images/climbing.jpg";
import climbingWebp from "../../images/climbing.webp";
import seated from "../../images/seated.jpg";
import seatedWebp from "../../images/seated.webp";
import { FunctionalComponent } from "../../@types/generic";
import "../../modules/styles.scss";

const slideshowProps = [
    { image: { src: seated, srcWebp: seatedWebp } },
    { image: { src: climbing, srcWebp: climbingWebp } }
];

const Homepage = (): JSX.Element => {
    return (
        <Navigation>
            { Slideshow({
                items: slideshowProps,
                component: ImageSlide as FunctionalComponent,
                options: {
                    isHero: true,
                    overlayLogo: true,
                    hideMobile: true
                }
            }) }
            { AboutMeSection() }
            { InstagramSection() }
            <div className="section">
                <Skills />
            </div>
            { ProjectsSection() }
        </Navigation>
    );
};

export default Homepage;

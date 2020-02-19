import React from "react";
import Navigation from "../../modules/Navigation";
import Slideshow from "../../modules/Slideshow";
import AboutMeSection from "../../modules/AboutMe";
import InstagramSection from "../../modules/Instagram";
import ProjectsSection from "../../modules/Projects";
import climbing from "../../images/climbing.jpg";
import seated from "../../images/seated.jpg";
const images = [
    seated,
    climbing
];

const Homepage = (): JSX.Element => {
    return (
        <Navigation>
            { Slideshow({ images, isHero: true, overlayLogo: true, hideMobile: true }) }
            { AboutMeSection() }
            { InstagramSection() }
            { Slideshow({ images, isHero: false, overlayLogo: false, hideMobile: false }) }
            { ProjectsSection() }
        </Navigation>
    );
};

export default Homepage;

import React from "react";
import Navigation from "../../modules/Navigation";
import Slideshow, { ImageSlide } from "../../modules/Slideshow";
import AboutMeSection from "../../modules/AboutMe";
import InstagramSection from "../../modules/Instagram";
import ProjectsSection from "../../modules/Projects";
import climbing from "../../images/climbing.jpg";
import seated from "../../images/seated.jpg";
import { FunctionalComponent } from "../../constants/Types";

const slideshowProps = [
    { image: seated },
    { image: climbing }
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
            { ProjectsSection() }
        </Navigation>
    );
};

export default Homepage;

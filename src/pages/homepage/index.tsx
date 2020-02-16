import React, { useEffect } from "react";
import { API_URL } from "../../constants/ExternalUrls";
import Navigation from "../../modules/Navigation";
import AboutMeSection from "../../modules/AboutMe";
import InstagramSection from "../../modules/Instagram";
import ProjectsSection from "../../modules/Projects";

const Homepage = (): JSX.Element => {
    useEffect(() => {
        window.fetch(`${API_URL}/api/healthcheck`)
            .then(response => response.json());
    });

    return (
        <Navigation isHomepage={ true }>
            { AboutMeSection() }
            { InstagramSection() }
            { ProjectsSection() }
        </Navigation>
    );
};

export default Homepage;

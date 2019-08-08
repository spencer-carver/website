import React from "react";
import PropTypes from "prop-types";
import websiteImage from "../../images/website-image.png";
import watchdogImage from "../../images/watchdog-echo-skill.png";
import styles from "./styles.module.scss";
import "../styles.scss";

const Projects = () => {
    return (
        <div id="projects" className="section">
            <div className="sectionContent">
                <h1 className={styles.header}>Projects</h1>
                <div className={styles.projectContainer}>
                    <ProjectCard { ...PROJECT_DETAILS["website"] } />
                    <ProjectCard { ...PROJECT_DETAILS["watchdog"] } />
                </div>
            </div>
        </div>
    );
};

const PROJECT_DETAILS = {
    website: {
        title: "My Website",
        description: "A React.js website built using Amazon Web Services. You're on it right now!",
        imageUrl: websiteImage,
        imageAlt: "This website's logo",
        githubUrl: "https://github.com/spencer-carver/website"
    },
    watchdog: {
        title: "Watchdog",
        description: "An Amazon Alexa App that can track the comings and goings of family members.",
        imageUrl: watchdogImage,
        imageAlt: "The Watchdog alexa skill logo",
        siteUrl: "https://smile.amazon.com/Spencer-Carver-Watch-Dog/dp/B01DKMZ04A/",
        githubUrl: "https://github.com/spencer-carver/watchdog"
    }
};

const ProjectCard = ({title, description, imageUrl, imageAlt, siteUrl, githubUrl}) => {

    const siteLinkHTML = siteUrl
        ? <a className={styles.siteLink} href={siteUrl}><img className={styles.image} src={imageUrl} alt={imageAlt}></img></a>
        : <div className={styles.siteLink}><img className={styles.image} src={imageUrl} alt={imageAlt}></img></div>;

    return (
        <div className={styles.card}>
            <span className={styles.title}>{ title }</span>
            <div className={styles.imageContainer}>
                { siteLinkHTML }
                { githubUrl ? <a className={styles.githubLink} href={githubUrl}>link to github project</a> : null }
            </div>
            <span className={styles.description}>{ description }</span>
        </div>
    );
};

ProjectCard.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    imageAlt: PropTypes.string.isRequired,
    siteUrl: PropTypes.string,
    githubUrl: PropTypes.string
};

export default Projects;

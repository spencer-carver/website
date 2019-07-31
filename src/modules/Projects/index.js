import React from "react";
import siteImage from "../../images/logo.png";
import watchdogImage from "../../images/watchdog-echo-skill.png";
import styles from "./styles.module.css";
import "../styles.css";

const PROJECT_DETAILS = {
    website: {
        title: "My Website",
        description: "A React.js website built using Amazon Web Services. You're on it right now!",
        imageUrl: siteImage,
        siteUrl: "",
        githubUrl: "https://github.com/spencer-carver/website"
    },
    watchdog: {
        title: "Watchdog",
        description: "An Amazon Alexa App that can track the comings and goings of family members",
        imageUrl: watchdogImage,
        siteUrl: "https://smile.amazon.com/Spencer-Carver-Watch-Dog/dp/B01DKMZ04A/",
        githubUrl: "https://github.com/spencer-carver/alexa/tree/master/watch-dog"
    }
};

const Projects = () => {
    return (
        <div id="projects" className="section">
            <div className={`sectionContent ${styles.projectContainer}`}>
                <ProjectCard id="website" />
                <ProjectCard id="watchdog" />
            </div>
        </div>
    );
};

const ProjectCard = ({ id }) => {
    const {
        title,
        description,
        imageUrl,
        siteUrl,
        githubUrl
    } = PROJECT_DETAILS[id];

    return (
        <div className={styles.card}>
            <div className={styles.imageContainer}>
                <a className={styles.siteLink} href={siteUrl}>
                    <img className={styles.image} src={imageUrl}></img>
                </a>
                <a className={styles.githubLink} href={githubUrl}></a>
            </div>
            <span className={styles.title}>{ title }</span>
            <span className={styles.description}>{ description }</span>
        </div>
    );
};

export default Projects;
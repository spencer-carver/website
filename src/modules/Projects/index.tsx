import React from "react";
import websiteImage from "../../images/website-image.png";
import watchdogImage from "../../images/watchdog-echo-skill.png";
import emailImage from "../../images/email.png";
import backgroundImage from "../../images/projects-background.jpg";
import backgroundImageWebp from "../../images/projects-background.webp";
import Slideshow, { Image } from "../Slideshow";
import {
    REACT_LOGO,
    TS_LOGO,
    AWS_LOGO,
    JS_LOGO,
    PYTHON_LOGO,
    GITHUB_LOGO,
    ALEXA_LOGO
} from "../../constants/Logos";
import { FunctionalComponent } from "../../constants/Types";
import styles from "./styles.module.scss";
import "../styles.scss";

interface Resource {
    image: string;
    alt: string;
    url?: string;
}

export interface Project {
    title: string;
    description: string;
    extendedDescription?: string;
    imageUrl: string;
    imageAlt: string;
    utilizes?: Array<Resource>;
    resources?: Array<Resource>;
}

const PROJECT_DETAILS: { [key: string]: Project } = {
    website: {
        title: "My Website",
        description: "A React.js website built using Amazon Web Services. You're on it right now!",
        extendedDescription: "This website is a living resume and example of what front-end work I do. It also serves as a public location where I can put anything I make that I find interesting, such as puzzles.",
        imageUrl: websiteImage,
        imageAlt: "This website's logo",
        utilizes: [{
            image: REACT_LOGO,
            alt: "React.js"
        }, {
            image: TS_LOGO,
            alt: "Typescript"
        }, {
            image: AWS_LOGO,
            alt: "Amazon Web Services"
        }],
        resources: [{
            image: GITHUB_LOGO,
            alt: "Github",
            url: "https://github.com/spencer-carver/website"
        }]
    },
    watchdog: {
        title: "Watchdog",
        description: "An Amazon Alexa App that can track the comings and goings of family members.",
        extendedDescription: "Watchdog is my first published Alexa skill that relies on Amazon's name parsing and dynamoDB to store a single datapoint for referencing when someone left home.",
        imageUrl: watchdogImage,
        imageAlt: "The Watchdog alexa skill logo",
        utilizes: [{
            image: JS_LOGO,
            alt: "Javascript"
        },{
            image: AWS_LOGO,
            alt: "Amazon Web Services"
        }],
        resources: [{
            image: ALEXA_LOGO,
            alt: "Amazon Skill Page",
            url: "https://smile.amazon.com/Spencer-Carver-Watch-Dog/dp/B01DKMZ04A/"
        },{
            image: GITHUB_LOGO,
            alt: "Github",
            url: "https://github.com/spencer-carver/watchdog"
        }]
    },
    mail: {
        title: "Serverless Mail",
        description: "AWS Setup to route carvers.info emails to my personal gmail.",
        extendedDescription: "Amazon SES recieves all incoming messages to carvers.info, and then dumps the contents into s3. A lambda function picks up the change, rewrites message headers, and reroutes to gmail.",
        imageUrl: emailImage,
        imageAlt: "an envelope",
        utilizes: [{
            image: PYTHON_LOGO,
            alt: "Python"
        },{
            image: AWS_LOGO,
            alt: "Amazon Web Services"
        }]
    }
};

const Resources = ({ title, resources = [] }: { title: string; resources?: Array<Resource> }): JSX.Element | null => {
    if (resources.length === 0) {
        return null;
    }

    return (
        <div className={ styles.resources }>
            <span className={ styles.sectionTitle }>{ title }:</span> 
            {
                resources.map(({ image, alt, url }, index) => {
                    return url
                        ? <a key={ index } className={ styles.resourceLink } href={ url }><img className={ `${ styles.resource } ${ styles.link }` } src={ image } alt={ alt } title={ alt }></img></a>
                        : <img key={ index } className={ styles.resource } src={ image } alt={ alt } title={ alt }></img>;
                })
            }
        </div>
    );
};

const ProjectCard = (props: Project): JSX.Element => {
    const {
        title,
        description,
        extendedDescription,
        imageUrl,
        imageAlt,
        utilizes,
        resources
    } = props;

    return (
        <div className={ styles.card }>
            <div className={ styles.main }>
                <span className={ styles.title }>{ title }</span>
                <div className={ styles.imageContainer }>
                    <div className={ styles.siteLink }><img className={ styles.image } src={ imageUrl } alt={ imageAlt }></img></div>
                </div>
            </div>
            <div className={ styles.info }>
                <span className={ styles.description }>{ description }</span>
                <span className={ styles.extendedDescription }>{ extendedDescription }</span>
                <Resources title="Technologies" resources={ utilizes } />
                <Resources title="Resources" resources={ resources } />
            </div>
        </div>
    );
};

interface ProjectCardProps extends Project {
    index: number;
    selected: number;
}

const ProjectCardContainer = (props: ProjectCardProps): JSX.Element => {
    const {
        index,
        selected
    } = props;

    return (
        <div key={ index } className={ `${ styles.cardContainer } ${ selected === index ? styles.selected : "" }` }>
            <ProjectCard { ...props } />
        </div>
    );
};

const Projects = (): JSX.Element => {
    const projects = Object.keys(PROJECT_DETAILS).map((key) => PROJECT_DETAILS[key]);

    return (
        <div id="projects" className={ `section fullwidth ${ styles.projects }` }>
            <Image image={ { src: backgroundImage, srcWebp: backgroundImageWebp } } alt="background" imageStyle={ styles.background } />
            <Slideshow items={ projects } component={ ProjectCardContainer as FunctionalComponent } options={ {} } />
        </div>
    );
};

export default Projects;

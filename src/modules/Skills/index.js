import React from "react";
import PropTypes from "prop-types";
import calculateYearsBetween from "../../utils/calculateYearsBetween";
import {
    REACT_LOGO,
    JS_LOGO,
    JAVA_LOGO,
    CLIMBING_LOGO,
    SCUBA_LOGO,
    MAGIC_JUDGES_LOGO
} from "../../constants/Logos";
import styles from "./styles.module.scss";

const Skills = () => {
    return (
        <div className={ styles.section }>
            <TechnicalSkills />
            <Interests />
        </div>
    );
};

const STARTED_WITH_REACT = new Date(2016, 6, 1);
const STARTED_WITH_JAVASCRIPT = new Date(2015, 7, 1);
const STARTED_WITH_JAVA = new Date(2009, 8, 1);
const ENDED_WITH_JAVA = new Date(2015, 4, 10);

const TechnicalSkills = () => {
    return (
        <div className={ styles.module }>
            <h1 className={ styles.header }>
                Skills
            </h1>
            <div className={ styles.skills }>
                <SkillTab title="React" startDate={ STARTED_WITH_REACT }>
                    <img className={ `${ styles.logo } ${ styles.react }` } src={ REACT_LOGO } alt="React.js logo"></img>
                </SkillTab>
                <SkillTab title="Javascript" startDate={ STARTED_WITH_JAVASCRIPT }>
                    <img className={ `${ styles.logo } ${ styles.js }` } src={ JS_LOGO } alt="JS logo"></img>
                </SkillTab>
                <SkillTab title="Java" startDate={ STARTED_WITH_JAVA } endDate={ ENDED_WITH_JAVA }>
                    <img className={ `${ styles.logo } ${ styles.java }` } src={ JAVA_LOGO } alt="Java logo"></img>
                </SkillTab>
            </div>
        </div>
    );
};

const STARTED_ROCK_CLIMBING = new Date(2015, 9, 1);
const STARTED_MAGIC_JUDGING = new Date(2016, 9, 10);

const Interests = () => {
    return (
        <div className={ styles.module }>
            <h1 className={ styles.header }>
                Interests
            </h1>
            <div className={ styles.skills }>
                <SkillTab title="Rock Climbing" startDate={ STARTED_ROCK_CLIMBING }>
                    <img className={ `${ styles.logo } ${ styles.climbing }` } src={ CLIMBING_LOGO } alt="Rock Climbing"></img>
                </SkillTab>
                <SkillTab title="SCUBA Diving" experienceLevel="Advanced Open Water Diver">
                    <img className={ `${ styles.logo } ${ styles.scuba }` } src={ SCUBA_LOGO } alt="SCUBA Dive Flag"></img>
                </SkillTab>
                <SkillTab title="Magic Judging" startDate={ STARTED_MAGIC_JUDGING } experienceLevel="Level 1 Judge" showTenure={ true }>
                    <img className={ `${ styles.logo } ${ styles.magicJudging }` } src={ MAGIC_JUDGES_LOGO } alt="Magic Judges logo"></img>
                </SkillTab>
            </div>
        </div>
    );
};

const SkillTab = ({ title, startDate, endDate = null, experienceLevel, showTenure = false, children }) => {
    const experienceYears = calculateYearsBetween(startDate, endDate);
    const experienceText = experienceYears === 0
        ? "Learning"
        : `${ experienceYears } Years`;

    return (
        <div className={ styles.container }>
            <div className={ styles.skill }>
                { children }
                <div className={ styles.details }>
                    <span className={ styles.title }>{ title }</span>
                    { experienceLevel && <span className={ styles.experience }>{ experienceLevel }</span> }
                    { !experienceLevel && <span className={ styles.experience }>{ experienceText }</span> }
                    { !(experienceLevel && !showTenure) && <span className={ styles.tenure }>{ startDate.getFullYear() } - { endDate ? endDate.getFullYear() : "Present" }</span> }
                </div>
            </div>
        </div>
    );
};

SkillTab.propTypes = {
    title: PropTypes.string.isRequired,
    startDate: PropTypes.instanceOf(Date),
    endDate: PropTypes.instanceOf(Date),
    experienceLevel: PropTypes.string,
    showTenure: PropTypes.bool,
    children: PropTypes.element
};

export default Skills;

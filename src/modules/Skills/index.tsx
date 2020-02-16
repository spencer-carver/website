import React, { useState } from "react";
import PropTypes from "prop-types";
import calculateYearsBetween from "../../utils/calculateYearsBetween";
import {
    REACT_LOGO,
    JS_LOGO,
    JAVA_LOGO,
    TS_LOGO,
    CLIMBING_LOGO,
    SCUBA_LOGO,
    MAGIC_JUDGES_LOGO,
    MAGIC_GAME_LOGO,
    AWS_LOGO,
    PHOTOSHOP_LOGO,
    NEWRELIC_LOGO
} from "../../constants/Logos";
import Flipcard from "../Flipcard";
import styles from "./styles.module.scss";

const STARTED_WITH_REACT = new Date(2016, 6, 1);
const STARTED_WITH_JAVASCRIPT = new Date(2015, 7, 1);
const STARTED_WITH_JAVA = new Date(2009, 8, 1);
const ENDED_WITH_JAVA = new Date(2015, 4, 10);
const STARTED_WITH_TYPESCRIPT = new Date(2019, 6, 10);
const RESTARTED_WITH_JAVA = new Date(2019, 9, 1);
const STARTED_WITH_AWS = new Date(2016, 10, 1);
const STARTED_ROCK_CLIMBING = new Date(2015, 9, 1);
const STARTED_MAGIC_JUDGING = new Date(2016, 9, 10);
const STARTED_MAGIC_PLAYING = new Date(2012, 7, 15);
const STARTED_IMAGE_EDITING = new Date(2015, 5, 10);
const NEW_RELIC_CERTIFIED = new Date(2019, 6, 10);

const Skills = (): JSX.Element => {
    const [ showSkills, setShowSkills ] = useState(false);
    const [ showInterests, setShowInterests ] = useState(false);
    const [ showCerts, setShowCerts ] = useState(false);

    const toggleSkills = (): void => setShowSkills(!showSkills);
    const toggleInterests = (): void => setShowInterests(!showInterests);
    const toggleCerts = (): void => setShowCerts(!showCerts);

    return (
        <div>
            <div className={ styles.section }>
                <div className={ styles.controls }>
                    <span className={ `${ styles.selector } ${ styles.skills } ${ showSkills ? styles.enabled : styles.disabled }` } onClick={ toggleSkills }>Skills</span> &amp; 
                    <span className={ `${ styles.selector } ${ styles.interests } ${ showInterests ? styles.enabled : styles.disabled }` } onClick={ toggleInterests }>Interests</span> &amp;
                    <span className={ `${ styles.selector } ${ styles.certifications } ${ showCerts ? styles.enabled : styles.disabled }` } onClick={ toggleCerts }>Certifications</span>
                </div>
                <Flipcard theme={ styles.skills } selected={ showSkills } onClick={ toggleSkills } imageStyles={ styles.react } imageSrc={ REACT_LOGO } imageAlt="React.js logo">
                    <SkillTab title="React" startDate={ STARTED_WITH_REACT } />
                </Flipcard>
                <Flipcard theme={ styles.skills } selected={ showSkills } onClick={ toggleSkills } imageStyles={ styles.js } imageSrc={ JS_LOGO } imageAlt="JS logo">
                    <SkillTab title="Javascript" startDate={ STARTED_WITH_JAVASCRIPT } />
                </Flipcard>
                <Flipcard theme={ styles.interests } selected={ showInterests } onClick={ toggleInterests } imageStyles={ styles.climbing } imageSrc={ CLIMBING_LOGO } imageAlt="Rock Climbing">
                    <SkillTab title="Rock Climbing" startDate={ STARTED_ROCK_CLIMBING } />
                </Flipcard>
                <Flipcard theme={ styles.skills } selected={ showSkills } onClick={ toggleSkills } imageStyles={ styles.ts } imageSrc={ TS_LOGO } imageAlt="TS logo">
                    <SkillTab title="Typescript" startDate={ STARTED_WITH_TYPESCRIPT } />
                </Flipcard>
                <Flipcard theme={ styles.interests } selected={ showInterests } onClick={ toggleInterests } imageStyles={ styles.magic } imageSrc={ MAGIC_GAME_LOGO } imageAlt="MTG logo">
                    <SkillTab title="Magic TCG" startDate={ STARTED_MAGIC_PLAYING } />
                </Flipcard>
                <Flipcard theme={ styles.certifications } selected={ showCerts } onClick={ toggleCerts } imageStyles={ styles.newrelic } imageSrc={ NEWRELIC_LOGO } imageAlt="New Relic logo">
                    <SkillTab title="New Relic" startDate={ NEW_RELIC_CERTIFIED } experienceLevel="Certified Performance Pro" showTenure={ true } />
                </Flipcard>
                <Flipcard theme={ styles.skills } selected={ showSkills } onClick={ toggleSkills } imageStyles={ styles.java } imageSrc={ JAVA_LOGO } imageAlt="Java logo">
                    <SkillTab title="Java" startDate={ STARTED_WITH_JAVA } endDate={ ENDED_WITH_JAVA } restartDate={ RESTARTED_WITH_JAVA } />
                </Flipcard>
                <Flipcard theme={ styles.skills } selected={ showSkills } onClick={ toggleSkills } imageStyles={ styles.aws } imageSrc={ AWS_LOGO } imageAlt="AWS logo">
                    <SkillTab title="AWS" startDate={ STARTED_WITH_AWS } />
                </Flipcard>
                <Flipcard theme={ styles.interests } selected={ showInterests } onClick={ toggleInterests } imageStyles={ styles.scuba } imageSrc={ SCUBA_LOGO } imageAlt="SCUBA Dive Flag">
                    <SkillTab title="SCUBA Diving" experienceLevel="Advanced Open Water Diver" />
                </Flipcard>
                <Flipcard theme={ styles.certifications } selected={ showCerts } onClick={ toggleCerts } imageStyles={ styles.magicJudging } imageSrc={ MAGIC_JUDGES_LOGO } imageAlt="Magic Judges logo">
                    <SkillTab title="Magic Judge" startDate={ STARTED_MAGIC_JUDGING } experienceLevel="Level 1" showTenure={ true } />
                </Flipcard>
                <Flipcard theme={ styles.interests } selected={ showInterests } onClick={ toggleInterests } imageStyles={ styles.photoshop } imageSrc={ PHOTOSHOP_LOGO } imageAlt="Photoshop logo">
                    <SkillTab title="Image Editing" startDate={ STARTED_IMAGE_EDITING } />
                </Flipcard>
            </div>
        </div>
    );
};

interface SkillTabParams {
    title: string;
    startDate?: Date;
    endDate?: Date;
    restartDate?: Date;
    reendDate?: Date;
    experienceLevel?: string;
    showTenure?: boolean;
}

const SkillTab = (props: SkillTabParams): JSX.Element => {
    const {
        title,
        startDate,
        endDate = undefined,
        restartDate = undefined,
        reendDate = undefined,
        experienceLevel,
        showTenure = false
    } = props;

    const experienceYears = calculateYearsBetween(startDate, endDate) + calculateYearsBetween(restartDate, reendDate);
    const experienceText = experienceYears === 0
        ? "Learning"
        : `${ experienceYears } Years`;

    return (
        <div className={ styles.container }>
            <div className={ styles.skill }>
                <div className={ styles.details }>
                    <span className={ styles.title }>{ title }</span>
                    { experienceLevel && <span className={ styles.experience }>{ experienceLevel }</span> }
                    { !experienceLevel && <span className={ styles.experience }>{ experienceText }</span> }
                    { !(experienceLevel && !showTenure) && startDate && <span className={ styles.tenure }>{ startDate.getFullYear() } - { endDate ? endDate.getFullYear() : "Present" }</span> }
                    { !(experienceLevel && !showTenure) && restartDate && <span className={ styles.tenure }>{ restartDate.getFullYear() } - { reendDate ? reendDate.getFullYear() : "Present" }</span> }
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

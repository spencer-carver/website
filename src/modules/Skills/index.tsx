import React, { useState } from "react";
import PropTypes from "prop-types";
import calculateYearsBetween from "../../utils/calculateYearsBetween";
import Flipcard from "../Flipcard";
import SKILLS, { SkillType } from "./skills";
import styles from "./styles.module.scss";


const Skills = (): JSX.Element => {
    const [ selectedCategory, setSelectedCategory ] = useState(SkillType.skill);

    return (
        <div>
            <div className={ styles.section }>
                <div className={ styles.controls }>
                    <span className={ `${ styles.selector } ${ styles.skills } ${ selectedCategory === SkillType.skill ? styles.enabled : styles.disabled }` }
                        onClick={ (): void => setSelectedCategory(SkillType.skill) }>
                        Skills
                    </span> &amp; 
                    <span className={ `${ styles.selector } ${ styles.interests } ${ selectedCategory === SkillType.interest ? styles.enabled : styles.disabled }` }
                        onClick={ (): void => setSelectedCategory(SkillType.interest) }>
                        Interests
                    </span> &amp;
                    <span className={ `${ styles.selector } ${ styles.certifications } ${ selectedCategory === SkillType.certification ? styles.enabled : styles.disabled }` }
                        onClick={ (): void => setSelectedCategory(SkillType.certification) }>
                        Certifications
                    </span>
                </div>
                {
                    SKILLS.map((entry, index) => {
                        return (
                            <Flipcard key={ index }
                                selected={ selectedCategory === entry.type }
                                onClick={ (): void => setSelectedCategory(entry.type) }
                                theme={ styles[entry.type] }
                                imageStyles={ styles[entry.id] }
                                imageSrc={ entry.imageSrc }
                                imageAlt={ entry.imageAlt }
                            >
                                <SkillTab { ...entry }/>
                            </Flipcard>
                        );
                    })
                }
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

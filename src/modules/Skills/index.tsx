import React, { useState, FunctionComponent } from "react";
import calculateYearsBetween from "../../utils/calculateYearsBetween";
import Flipcard from "../Flipcard";
import SKILLS, { SkillType } from "./skills";
import styles from "./styles.module.scss";


const Skills: FunctionComponent = () => {
    const [ selectedCategory, setSelectedCategory ] = useState(SkillType.skill);

    const setSkillsSelected = (): void => setSelectedCategory(SkillType.skill);
    const setInterestsSelected = (): void => setSelectedCategory(SkillType.interest);
    const setCertificationsSelected = (): void => setSelectedCategory(SkillType.certification);

    return (
        <div className={ styles.section }>
            <div className={ styles.controls }>
                <span className={ `${ styles.selector } ${ styles.skills } ${ selectedCategory === SkillType.skill ? styles.enabled : styles.disabled }` }
                    role="button"
                    aria-label="Skills"
                    tabIndex={ 0 }
                    onClick={ setSkillsSelected }
                    onKeyPress={ setSkillsSelected }>
                    Skills
                </span> &amp; 
                <span className={ `${ styles.selector } ${ styles.interests } ${ selectedCategory === SkillType.interest ? styles.enabled : styles.disabled }` }
                    role="button"
                    aria-label="Interests"
                    tabIndex={ 0 }
                    onClick={ setInterestsSelected }
                    onKeyPress={ setInterestsSelected }>
                    Interests
                </span> &amp;
                <span className={ `${ styles.selector } ${ styles.certifications } ${ selectedCategory === SkillType.certification ? styles.enabled : styles.disabled }` }
                    role="button"
                    aria-label="Certifications"
                    tabIndex={ 0 }
                    onClick={ setCertificationsSelected }
                    onKeyPress={ setCertificationsSelected }>
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
                            id={ entry.id }
                            imageSrc={ entry.imageSrc }
                            imageAlt={ entry.imageAlt }
                        >
                            <SkillTab { ...entry }/>
                        </Flipcard>
                    );
                })
            }
        </div>
    );
};

interface SkillTabParams {
    id: string;
    title: string;
    startDate?: Date;
    endDate?: Date;
    restartDate?: Date;
    reendDate?: Date;
    experienceLevel?: string;
    showTenure?: boolean;
}

const SkillTab: FunctionComponent<SkillTabParams> = (props) => {
    const {
        id,
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
                <div className={ `${ styles.details } ${ styles[id] }` }>
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
export default Skills;

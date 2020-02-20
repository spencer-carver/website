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

export enum SkillType {
    skill = "skills",
    interest = "interests",
    certification = "certifications"
}

export interface Skill {
    id: string;
    title: string;
    type: SkillType;
    imageSrc: string;
    imageAlt: string;
    startDate?: Date;
    endDate?: Date;
    restartDate?: Date;
    reendDate?: Date;
    experienceLevel?: string;
    showTenure?: boolean;
}

const SKILLS: Skill[] = [{
    id: "react",
    title: "React",
    type: SkillType.skill,
    imageSrc: REACT_LOGO,
    imageAlt: "React.js Logo",
    startDate: new Date(2016, 6, 1)
},{
    id: "js",
    title: "Javascript",
    type: SkillType.skill,
    imageSrc: JS_LOGO,
    imageAlt: "JS Logo",
    startDate: new Date(2015, 7, 1)
},{
    id: "climbing",
    title: "Rock Climbing",
    type: SkillType.interest,
    imageSrc: CLIMBING_LOGO,
    imageAlt: "Rock Climbing",
    startDate: new Date(2015, 9, 1)
},{
    id: "ts",
    title: "Typescript",
    type: SkillType.skill,
    imageSrc: TS_LOGO,
    imageAlt: "TS Logo",
    startDate: new Date(2019, 6, 10)
},{
    id: "newrelic",
    title: "New Relic",
    type: SkillType.certification,
    imageSrc: NEWRELIC_LOGO,
    imageAlt: "New Relic Logo",
    experienceLevel: "Certified Performance Pro",
    showTenure: true,
    startDate: new Date(2019, 6, 10)
},{
    id: "magic",
    title: "Magic TCG",
    type: SkillType.interest,
    imageSrc: MAGIC_GAME_LOGO,
    imageAlt: "MTG Logo",
    startDate: new Date(2012, 7, 15)
},{
    id: "java",
    title: "Java",
    type: SkillType.skill,
    imageSrc: JAVA_LOGO,
    imageAlt: "Java Logo",
    startDate: new Date(2009, 8, 1),
    endDate: new Date(2015, 4, 10),
    restartDate: new Date(2019, 9, 1)
},{
    id: "scuba",
    title: "SCUBA Diving",
    type: SkillType.certification,
    imageSrc: SCUBA_LOGO,
    imageAlt: "SCUBA Dive Flag",
    experienceLevel: "Advanced Open Water Diver"
},{
    id: "aws",
    title: "AWS",
    type: SkillType.skill,
    imageSrc: AWS_LOGO,
    imageAlt: "AWS Logo",
    startDate: new Date(2016, 10, 1)
},{
    id: "photoshop",
    title: "Image Editing",
    type: SkillType.interest,
    imageSrc: PHOTOSHOP_LOGO,
    imageAlt: "Photoshop Logo",
    startDate: new Date(2015, 5, 10)
},{
    id: "magicJudging",
    title: "Magic Judge",
    type: SkillType.certification,
    imageSrc: MAGIC_JUDGES_LOGO,
    imageAlt: "Magic Judges Logo",
    startDate: new Date(2016, 9, 10),
    experienceLevel: "Level 1",
    showTenure: true
}];

export default SKILLS;

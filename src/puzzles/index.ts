import { FunctionalComponent } from "../constants/Types";
import Tutorial from "./tutorial";
import CheeseSampler from "./cheese-sampler";
import ExplosiveDiscovery from "./an-explosive-discovery";

export enum PuzzleType {
    video = "video",
    pdf = "pdf",
    html = "html"
}

export interface Puzzle {
    title: string;
    description?: string;
    type: PuzzleType;
    srcUrl?: string;
    assetSrc?: string;
    content?: FunctionalComponent;
}

const PUZZLES: { [key: string]: Puzzle } = {
    "tutorial": {
        title: "Tutorial",
        type: PuzzleType.html,
        description: "If you follow the instructions and rearrange your thoughts, you'll get this in no time!",
        content: Tutorial
    },
    "tetris": {
        title: "Tetris",
        type: PuzzleType.video,
        description: "You don't see the appeal?",
        srcUrl: "https://spencer.carvers.info/static/puzzle/tetris.mp4",
        assetSrc: "https://spencer.carvers.info/static/puzzle/tetris.vtt"
    },
    "an-explosive-discovery": {
        title: "An Explosive Discovery",
        type: PuzzleType.html,
        description: "Find everything, but tread carefully!",
        content: ExplosiveDiscovery
    },
    "cheese-sampler": {
        title: "Cheese Sampler",
        type: PuzzleType.html,
        description: "My themed parody group is wrapping up it's first (and only) tour at our biggest venue ever!",
        content: CheeseSampler
    },
    "judge-calls-one": {
        title: "Judge Calls",
        type: PuzzleType.pdf,
        description: "Can you decrypt what the players are talking about?",
        srcUrl: "https://spencer.carvers.info/static/puzzle/judge-calls-one.pdf"
    }
};

export default PUZZLES;

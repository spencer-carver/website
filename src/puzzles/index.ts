import Tutorial from "./tutorial";
import CheeseSampler from "./cheese-sampler";
import ExplosiveDiscovery from "./an-explosive-discovery";
import YakuzaZero from "./yakuza-zero";
import TravelDiary from "./travel-diary";
import { PuzzleType, Puzzle } from "../@types/puzzles";

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
    "travel-diary": {
        title: "Travel Diary",
        type: PuzzleType.html,
        content: TravelDiary
    },
    "an-explosive-discovery": {
        title: "An Explosive Discovery",
        type: PuzzleType.html,
        description: "Find everything, but tread carefully!",
        content: ExplosiveDiscovery
    },
    "yakuza-zero": {
        title: "Yakuza 0",
        type: PuzzleType.html,
        description: "Is this really a game about the Japanese Mafia? Maybe we should google it...",
        content: YakuzaZero
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

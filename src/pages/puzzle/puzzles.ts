export enum PuzzleType {
    video = "video",
    pdf = "pdf"
}

export interface Puzzle {
    title: string;
    description?: string;
    type: PuzzleType;
    srcUrl: string;
}

const PUZZLES: { [key: string]: Puzzle } = {
    "tetris": {
        title: "Tetris",
        type: PuzzleType.video,
        description: "You don't see the appeal?",
        srcUrl: "https://spencer.carvers.info/static/media/tetris-puzzle.mp4"
    },
    "judge-calls-one": {
        title: "Judge Calls",
        type: PuzzleType.pdf,
        description: "Can you decrypt what the players are talking about?",
        srcUrl: "https://spencer.carvers.info/static/media/judge-calls-one.pdf"
    }
};

export default PUZZLES;

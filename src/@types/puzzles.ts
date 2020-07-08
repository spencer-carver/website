import { FunctionComponent } from "react";

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
    content?: FunctionComponent;
}

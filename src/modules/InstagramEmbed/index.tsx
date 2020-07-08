import React, { FunctionComponent } from "react";
import useScript from "../../utils/useScript";
import InstagramEmbed from "./component";

export const InstagramPosts = {
    pacificCrestTrail: "BlGuqGZlFvr",
    jacketInSubway: "BfCy39SBMQG",
    queensboroAtNight: "BcN30oqHNlI",
    tramInWinter: "BcfOceoHf4n",
    hackerman: "BviOsxQFv70",
    valentinesLove: "Bt3UqBnlWNG",
    threeViewsOfOregon: "Bx56tKRJOnp",
    tayaki: "ByLeyT-p6M-"
};

declare global {
    interface Window {
        instgrm: {
            Embeds: {
                process: Function;
            };
        };
    }
}

export function reloadInstagramEmbeds(): void {
    window.instgrm
        && window.instgrm.Embeds
        && typeof window.instgrm.Embeds.process == "function"
        && window.instgrm.Embeds.process();
}

const InstagramEmbedContainer: FunctionComponent<{ postId?: string }> = ({ postId = InstagramPosts.pacificCrestTrail }) => {
    useScript("https://www.instagram.com/embed.js");

    return <InstagramEmbed postId={ postId } />;
};

export default InstagramEmbedContainer;

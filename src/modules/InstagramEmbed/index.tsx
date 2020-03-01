import React from "react";
import useScript from "../../utils/useScript";
import PropTypes from "prop-types";
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

const InstagramEmbedContainer = ({ postId = InstagramPosts.pacificCrestTrail }): JSX.Element => {
    useScript("https://www.instagram.com/embed.js");

    return <InstagramEmbed postId={ postId } />;
};

InstagramEmbedContainer.propTypes = {
    postId: PropTypes.string
};

export default InstagramEmbedContainer;

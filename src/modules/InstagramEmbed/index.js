import React from "react";
import PropTypes from "prop-types";
import InstagramEmbed from "./component.js";

export const InstagramPosts = {
    pacificCrestTrail: "BlGuqGZlFvr",
    jacketInSubway: "BfCy39SBMQG",
    queensboroAtNight: "BcN30oqHNlI",
    tramInWinter: "BcfOceoHf4n",
    hackerman: "BviOsxQFv70",
    valentinesLove: "Bt3UqBnlWNG"
};
  

const InstagramEmbedContainer = ({ postId = InstagramPosts.pacificCrestTrail }) => {
    return <InstagramEmbed postId={ postId } />;
};

InstagramEmbedContainer.propTypes = {
    postId: PropTypes.string
};

export default InstagramEmbedContainer;

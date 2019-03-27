import React from "react";
import InstagramEmbed from "./component.js";

const InstagramPosts = {
    pacificCrestTrail: "BlGuqGZlFvr",
    jacketInSubway: "BfCy39SBMQG",
    queensboroAtNight: "BcN30oqHNlI",
    tramInWinter: "BcfOceoHf4n"
};
  

const InstagramEmbedContainer = () => {
    return <InstagramEmbed postId={ InstagramPosts.pacificCrestTrail } />;
};

export default InstagramEmbedContainer;

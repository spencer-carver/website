import React from "react";
import InstagramEmbed from "./component.js";

const InstagramPosts = [
    "BnpCRfeFoJa", // smol_royce
    "BlGuqGZlFvr", // PCT
    "BfCy39SBMQG", // parka
    "BeLnJLDnzkw", // whiskey
    "BcN30oqHNlI", // night
    "BcfOceoHf4n"  // winter
  ];
  

const InstagramEmbedContainer = () => {
    const randomPostId = InstagramPosts[Math.round(Math.random() * (InstagramPosts.length - 1))];

    return <InstagramEmbed postId={ randomPostId } />;
};

export default InstagramEmbedContainer;
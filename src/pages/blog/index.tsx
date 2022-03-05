import React, { FunctionComponent, useEffect, useState } from "react";
import post from "./posts/TEST.md";
import ReactMarkdown from "react-markdown";

const Blog: FunctionComponent = () => {
    const [ contents, setContents ] = useState("");

    useEffect(() => {
        fetch(post).then(res => res.text()).then(setContents);
    }, []);

    if (!contents) {
        return null;
    }

    // eslint-disable-next-line react/no-children-prop
    return <ReactMarkdown children={ contents } />;
};

export default Blog;

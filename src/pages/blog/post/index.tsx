import React, { FunctionComponent, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { API_URL } from "../../../constants/ExternalUrls";
import Navigation from "../../../modules/Navigation";
import fetchFromCache from "../../../utils/cache";

interface BlogPostRouterProps {
    match: {
        params: {
            post: string;
        };
    };
}

const Blog: FunctionComponent<BlogPostRouterProps> = (props) => {
    const {
        post
    } = props.match.params;
    const [ contents, setContents ] = useState("");

    useEffect(() => {
        fetchFromCache(`${ API_URL }/api/blog/${ post }`).then((data) => setContents(data as unknown as string));
    }, []);

    if (!contents) {
        return null;
    }

    // eslint-disable-next-line react/no-children-prop
    return <Navigation><ReactMarkdown children={ contents } /></Navigation>;
};

export default Blog;

import React, { FunctionComponent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../../constants/ExternalUrls";
import Navigation from "../../modules/Navigation";
import fetchFromCache from "../../utils/cache";

const Blog: FunctionComponent = () => {
    const [ posts, setPosts ] = useState([] as string[]);

    useEffect(() => {
        fetchFromCache(`${ API_URL }/api/blog`).then((data) => setPosts(data as unknown as string[]));
    }, []);

    if (!posts) {
        return null;
    }

    return (
        <Navigation>
            <ul>{ posts.map((post, index) => <Link key={ index } to={ `/blog/${ post }` }><li>{ post }</li></Link>) }</ul>
        </Navigation>
    );
};

export default Blog;

import React from "react";

export interface ImageSrc {
    src: string;
    srcWebp?: string;
}

interface ImageProps {
    image: ImageSrc;
    alt: string;
    title?: string;
    imageStyle: string;
}

const Image = ({ image: { src, srcWebp }, alt, title, imageStyle }: ImageProps): JSX.Element => {

    return (
        <picture className={ imageStyle }>
            { srcWebp && <source srcSet={ srcWebp } type="image/webp" /> }
            <source srcSet={ src } /> 
            <img className={ imageStyle } src={ src } alt={ alt } title={ title } />
        </picture>
    );
};

export default Image;

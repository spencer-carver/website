import React, { useState, useEffect } from "react";
import backgroundImage from "../../images/bg.jpg";
import { FunctionalComponent, PropsObject } from "../../constants/Types";
import styles from "./styles.module.scss";

const TRANSITION_TIME = 8000; // in ms

declare global {
    interface Window {
        slideshowTimer: NodeJS.Timeout;
    }
}

interface SlideshowOptions {
    isHero?: boolean;
    overlayLogo?: boolean;
    hideMobile?: boolean;
    backgroundImage?: string;
}

interface SlideshowProps {
    items: Array<PropsObject>;
    component: FunctionalComponent;
    options: SlideshowOptions;
}

const Slideshow = ({ items, component: Component, options }: SlideshowProps): JSX.Element => {
    const {
        isHero = false,
        overlayLogo = false,
        hideMobile = false
    } = options;

    const [ selected, setSelected ] = useState(0);

    function nextItem(): void {
        const newIndex = selected === items.length - 1
            ? 0
            : selected + 1;

        setSelected(newIndex);

        if (!isHero) {
            return;
        }

        clearInterval(window.slideshowTimer);
        window.slideshowTimer = setInterval(nextItem, 2 * TRANSITION_TIME);
    }

    function previousItem(): void {
        const newIndex = selected === 0
            ? items.length - 1
            : selected - 1;

        setSelected(newIndex);

        if (!isHero) {
            return;
        }

        clearInterval(window.slideshowTimer);
        window.slideshowTimer = setInterval(previousItem, 2 * TRANSITION_TIME);
    }

    useEffect(() => {
        if (!isHero) {
            return;
        }

        window.slideshowTimer = setInterval(nextItem, TRANSITION_TIME);

        return (): void => clearInterval(window.slideshowTimer);
    });

    return (
        <div>
            <div className={ `${ isHero ? styles.hero : "" } ${ styles.container } ${ overlayLogo ? styles.overlayLogo : "" }` }>
                <div className={ `${ isHero ? styles.hero : "" } ${ styles.slideshow } ${ hideMobile ? styles.hideMobile : "" }` }>
                    <img src={ backgroundImage } className={ `${ styles.image } ${ styles.placeholder }` } alt="background" />
                    { items.map((props, index) => <Component { ...props } key={ index } index={ index } selected={ selected } />) }
                    <div className={ styles.indicators }>
                        { items.map((item, index) => <Indicator key={ index } index={ index } selected={ selected } setSelected={ setSelected } />) }
                    </div>
                    <div className={ styles.prev } onClick={ previousItem }>&#10094;</div>
                    <div className={ styles.next } onClick={ nextItem }>&#10095;</div>
                </div>
            </div>
        </div>
        
    );
};

interface IndicatorProps {
    index: number;
    selected: number;
    setSelected: Function;
}

const Indicator = ({ index, selected, setSelected }: IndicatorProps): JSX.Element => {
    return (
        <div className={ `${ styles.indicator } ${ selected === index ? styles.selected : "" }` }
            onClick={ (): void => setSelected(index) }>
            <span className={ styles.indicatorText }>{ index + 1 }</span>
        </div>
    );
};

interface ImageSlideProps {
    index: number;
    selected: number;
    image: string;
}

export const ImageSlide = ({ index, image, selected }: ImageSlideProps): JSX.Element => {
    return (
        <div className={ `${ styles.slide } ${ selected === index ? styles.selected : "" }` }>
            <img src={ image } className={ styles.image } alt="Spencer" />
        </div>
    );
};

export default Slideshow;

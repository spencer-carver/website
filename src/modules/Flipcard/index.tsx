import React, { ReactElement } from "react";
import styles from "./styles.module.scss";

interface FlipcardProps {
    id: string;
    imageSrc: string;
    imageAlt: string;
    theme: string;
    selected: boolean;
    onClick: Function;
    children?: Array<ReactElement> | ReactElement;
}

const Flipcard = (props: FlipcardProps): JSX.Element => {
    const {
        id,
        imageSrc,
        imageAlt,
        theme,
        selected,
        onClick,
        children
    } = props;

    function enableGroup(): void {
        return !selected && onClick();
    }

    return (
        <div className={ `${ styles.flipCard } ${ selected ? styles.enabled : styles.disabled }` }
            role="button"
            aria-label="Select Card"
            tabIndex={ 0 }
            onClick={ enableGroup }
            onKeyPress={ enableGroup }>
            <div className={ styles.flipCardInner }>
                <div className={ styles.flipCardFront }>
                    <div className={ `${ styles.earmark } ${ theme }` }></div>
                    <img className={ `${ styles.logo } ${ styles[id] }` } src={ imageSrc } alt={ imageAlt } />
                </div>
                <div className={ `${ styles.flipCardBack } ${ theme }` }>
                    { children }
                </div>
            </div>
        </div>
    );
};

export default Flipcard;

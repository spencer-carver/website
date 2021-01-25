import React, { FunctionComponent, useState } from "react";
import styles from "./styles.module.scss";

const Theme: FunctionComponent<{ setTheme: Function }> = ({ setTheme }) => {
    const [ showMenu, setShowMenu ] = useState(false);

    const onClick = (): void => setShowMenu(!showMenu);

    return (
        <>
            { showMenu && (
                <div className={ styles.menu }>
                    Theme: <button className={ styles.light } onClick={ (): void => setTheme("light") }>light</button> | <button className={ styles.dark } onClick={ (): void => setTheme("dark") }>dark</button>
                </div>
            ) }
            <span className={ styles.selector }
                tabIndex={ 0 }
                onClick={ onClick }
                onKeyPress={ onClick }
                role="button"
            />
        </>
    );
};

export default Theme;

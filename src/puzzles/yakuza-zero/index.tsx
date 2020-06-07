import React from "react";
import styles from "./styles.module.scss";

const DANCE_FLOOR = [
    [ "", "M I", "D", "I C N L", "" ],
    [ "N S", "O", "H", "A", "Y S" ],
    [ "H", "D N B T I E A", "E", "E L S M", "B R" ],
    [ "T E I", "L N", "R Y N", "J", "I R" ],
    [ "", "N B I O G", "W", "X T U R", "" ]
];

const YakuzaZero = (): JSX.Element => {
    return (
        <div className={ styles.content }>
            <div>
                <h3>How to Dance:</h3>
                <ul>
                    <li>Reference the video.</li>
                    <li>The first time you visit a cell, use the left-most letter.</li>
                    <li>On subsequent visits, you can use any letter already used, or the next unused one</li>
                </ul>
            </div>
            <table className={ styles.danceFloor }>
                {
                    DANCE_FLOOR.map((row, rowIndex) => {
                        return (
                            <tr key={ rowIndex }>
                                {
                                    row.map((cell, columnIndex) => {
                                        const isCorner = (rowIndex === 0 || rowIndex === 4) && (columnIndex === 0 || columnIndex === 4);
                                        const className = `${ styles.tile } ${ isCorner ? styles.corner : "" }`;
                                        return (
                                            <td key={ `cell-${ rowIndex }-${ columnIndex }` } className={ className }>{ cell }</td>
                                        );
                                    })
                                }
                            </tr>
                        );
                    })
                }
            </table>
            <iframe className={ styles.video }
                title="part 1"
                src="https://www.youtube.com/embed/CcWqo5UsXyg"
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen>
            </iframe>
            <div>
                <h3>How to Sing:</h3>
                <ul>
                    <li>Have your dance moves down pat.</li>
                    <li>Reference the video.</li>
                    <li>Sing your heart out.</li>
                </ul>
            </div>
            <iframe className={ styles.video }
                title="part 2"
                src="https://www.youtube.com/embed/_3Mo7U0XSFo"
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen>
            </iframe>
        </div>
    );
};

export default YakuzaZero;

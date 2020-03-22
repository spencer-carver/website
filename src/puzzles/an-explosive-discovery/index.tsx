import React, { useState } from "react";
import styles from "./styles.module.scss";

const WORD_SEARCH = [
    [ "E", "V", "I", "F", "O", "U", "R", "R", "H", "J", "Q", "E", "E", "S", "A", "B", "D", "A", "Q", "N", "C", "T", "T", "N", "E", "M", "E", "L", "E" ],
    [ "R", "A", "W", "T", "O", "N", "E", "G", "I", "O", "N", "Z", "Z", "L", "E", "U", "Q", "J", "E", "N", "J", "U", "A", "R", "D", "D", "W", "T", "S" ],
    [ "E", "B", "D", "U", "D", "O", "D", "X", "G", "S", "M", "J", "R", "A", "J", "E", "T", "H", "G", "I", "E", "T", "M", "O", "H", "M", "X", "S", "N" ],
    [ "T", "B", "O", "N", "E", "S", "W", "T", "H", "J", "A", "E", "U", "Q", "R", "E", "P", "I", "P", "D", "C", "I", "P", "O", "X", "I", "S", "N", "I" ],
    [ "A", "E", "G", "A", "P", "S", "O", "C", "K", "I", "N", "G", "T", "J", "V", "A", "D", "E", "R", "J", "E", "C", "I", "N", "R", "D", "X", "U", "A" ],
    [ "W", "I", "N", "T", "R", "Y", "P", "U", "J", "N", "V", "E", "F", "A", "S", "C", "A", "S", "K", "J", "I", "V", "N", "Z", "I", "P", "U", "T", "R" ],
    [ "L", "E", "B", "I", "C", "E", "D", "O", "J", "T", "O", "R", "J", "V", "Q", "U", "J", "I", "E", "S", "L", "T", "G", "S", "E", "R", "I", "F", "G" ],
    [ "V", "O", "L", "U", "P", "R", "T", "U", "L", "D", "I", "P", "J", "A", "U", "S", "Q", "U", "E", "X", "C", "O", "U", "U", "G", "I", "S", "T", "E" ],
    [ "Q", "J", "O", "R", "J", "T", "Q", "R", "U", "I", "N", "M", "U", "Q", "J", "A", "D", "N", "A", "J", "A", "I", "S", "N", "C", "P", "E", "T", "N" ],
    [ "U", "R", "F", "I", "S", "E", "W", "E", "N", "I", "N", "T", "R", "A", "J", "D", "Q", "C", "N", "U", "Q", "A", "J", "U", "R", "T", "Q", "X", "S" ],
    [ "I", "Q", "C", "U", "T", "S", "J", "A", "C", "I", "O", "C", "H", "A", "R", "G", "E", "V", "Q", "U", "J", "O", "Q", "R", "Q", "O", "X", "A", "V" ],
    [ "C", "E", "V", "J", "S", "R", "A", "D", "D", "S", "Q", "J", "N", "N", "T", "I", "O", "J", "V", "C", "O", "G", "N", "I", "T", "J", "E", "O", "R" ],
    [ "R", "O", "O", "M", "A", "E", "S", "T", "E", "V", "J", "P", "Q", "F", "U", "L", "E", "V", "A", "W", "T", "U", "C", "P", "A", "R", "T", "H", "A" ],
    [ "I", "N", "E", "R", "T", "I", "A", "S", "R", "E", "P", "A", "U", "O", "J", "D", "I", "N", "W", "L", "E", "N", "V", "U", "W", "T", "M", "U", "Q" ],
    [ "A", "G", "C", "U", "E", "D", "A", "R", "G", "O", "U", "B", "O", "T", "T", "M", "Q", "L", "E", "L", "T", "P", "G", "I", "R", "C", "E", "T", "J" ],
    [ "R", "O", "J", "T", "U", "D", "R", "V", "J", "I", "J", "E", "F", "S", "U", "N", "E", "U", "O", "J", "E", "R", "R", "K", "Y", "J", "S", "Q", "U" ],
    [ "J", "G", "U", "Q", "A", "T", "R", "A", "T", "E", "D", "U", "G", "I", "J", "N", "F", "S", "T", "J", "V", "N", "N", "D", "E", "L", "A", "Y", "O" ],
    [ "J", "A", "Q", "E", "R", "O", "L", "O", "R", "E", "Z", "S", "N", "E", "E", "R", "J", "U", "S", "N", "I", "T", "R", "O", "T", "J", "J", "A", "Y" ],
    [ "A", "S", "J", "T", "L", "J", "E", "T", "S", "E", "R", "O", "P", "E", "N", "E", "D", "I", "H", "U", "S", "L", "T", "N", "T", "E", "Q", "R", "L" ],
    [ "W", "W", "D", "J", "Q", "R", "E", "J", "S", "T", "M", "P", "O", "R", "K", "W", "E", "Q", "A", "J", "O", "G", "R", "V", "N", "Z", "Z", "E", "A" ],
    [ "P", "A", "D", "N", "D", "O", "W", "T", "S", "M", "A", "R", "A", "U", "G", "S", "E", "J", "R", "Q", "L", "S", "P", "R", "I", "N", "G", "Z", "U" ],
    [ "R", "U", "B", "A", "G", "C", "U", "E", "A", "R", "I", "O", "T", "C", "−", "4", "W", "Y", "D", "N", "P", "O", "G", "D", "B", "R", "F", "I", "D" ],
    [ "N", "I", "T", "R", "A", "T", "E", "D", "L", "A", "N", "R", "O", "C", "K", "F", "O", "X", "P", "O", "X", "R", "💣", "L", "O", "E", "O", "L", "P" ],
    [ "T", "U", "N", "G", "O", "O", "P", "E", "B", "A", "R", "D", "T", "E", "I", "E", "E", "Q", "A", "T", "E", "W", "X", "A", "M", "L", "R", "A", "S" ],
    [ "N", "O", "B", "P", "N", "E", "R", "P", "J", "U", "L", "H", "L", "R", "J", "C", "A", "G", "N", "I", "T", "S", "A", "L", "B", "L", "C", "G", "D" ],
    [ "U", "B", "U", "B", "E", "L", "I", "R", "C", "J", "R", "A", "I", "C", "O", "V", "E", "L", "L", "M", "E", "Q", "O", "R", "S", "O", "E", "E", "I" ],
    [ "H", "W", "S", "X", "T", "A", "M", "S", "E", "E", "R", "N", "N", "G", "A", "R", "F", "T", "G", "E", "D", "E", "O", "I", "B", "C", "D", "E", "T" ],
    [ "S", "U", "P", "R", "O", "M", "E", "G", "E", "O", "G", "I", "A", "C", "L", "V", "J", "D", "I", "D", "G", "W", "Q", "J", "E", "D", "Q", "R", "D" ],
    [ "B", "O", "O", "S", "T", "E", "R", "A", "J", "B", "P", "V", "T", "G", "O", "R", "E", "G", "E", "N", "Q", "O", "J", "Z", "A", "D", "W", "J", "O" ]
];

const WORDS = [
    "ADDED",
    "AIR",
    "AMMONIUM",
    "ANFO",
    "ARM",
    "AWE",
    "AXES",
    "BASE",
    "BLASTING",
    "BOMBS",
    "BOOSTER",
    "BURN",
    "BUS",
    "C-4",
    "CAP",
    "CHARGE",
    "COG",
    "CURE",
    "DECIBEL",
    "DELAY",
    "DET",
    "DUD",
    "EIGHT",
    "ELEMENT",
    "EOD",
    "ERG",
    "EXPLOSIVE",
    "FIRING",
    "FIRES",
    "FIVE",
    "FORCE",
    "FOUR",
    "FRAG",
    "FUEL",
    "FUSE",
    "FUZE",
    "GAP",
    "GEL",
    "GRADE",
    "GRAINS",
    "GUN",
    "HARDPAN",
    "HIGH",
    "HMX",
    "HOAX",
    "HOME",
    "IED",
    "INERT",
    "ION",
    "LIE",
    "MAIN",
    "NINE",
    "NITRATE",
    "NITRO",
    "ONE",
    "OPENED",
    "ORDER",
    "PAD",
    "PART",
    "PBX",
    "PETN",
    "PIN",
    "PIPE",
    "POWDER",
    "PRIMER",
    "RATED",
    "RDX",
    "RIG",
    "RUN",
    "SAFE",
    "SEAM",
    "SEMTEX",
    "SET",
    "SHUNT",
    "SIX",
    "SPRING",
    "TAMPING",
    "TEN",
    "THREE",
    "TIMED",
    "TNT",
    "TOE",
    "TWO",
    "WATER",
    "WAVE",
    "ZERO",
    "💣",
    "ANY 'J' OR 'Q'"
];

const Wordsearch = (): JSX.Element => {
    const [ showLetters, setShowLetters ] = useState(true);
    const [ showGrid, setShowGrid ] = useState(true);

    const toggleLetters = (): void => setShowLetters(!showLetters);
    const toggleGrid = (): void => setShowGrid(!showGrid);

    /*
     * If you&apos;re looking at this file to try and get hints to solve this puzzle, it won&apos;t help!
     */

    return (
        <div className={ styles.content }>
            <div className={ styles.controls }>
                <div className={ showLetters ? "" : styles.enabled }
                    role="button"
                    tabIndex={ 0 }
                    onClick={ toggleLetters }
                    onKeyPress={ toggleLetters }>
                    { showLetters ? "Hide" : "Show" } Letters
                </div>
                <div className={ showGrid ? "" : styles.enabled }
                    role="button"
                    tabIndex={ 0 }
                    onClick={ toggleGrid }
                    onKeyPress={ toggleGrid }>
                    { showGrid ? "Hide" : "Show" } Grid
                </div>
            </div>
            <table className={ styles.table } role="grid">
                <tbody>
                    { WORD_SEARCH.map((row, rowIndex) => {
                        return (
                            <tr key={ `row-${ rowIndex }` } className={ styles.row }>
                                { row.map((value, cellIndex) => {
                                    return (
                                        <Cell key={ `cell-${ rowIndex }-${ cellIndex }` }
                                            value={ value }
                                            showLetters={ showLetters }
                                            showGrid={ showGrid }
                                        />
                                    );
                                }) }
                            </tr>
                        );
                    }) }
                </tbody>
            </table>
            <ul className={ styles.bank }>
                { WORDS.map((word, index) => <Word key={ index } word={ word } />) }
            </ul>
        </div>
    );
};

const Word = ({ word }: { word: string }): JSX.Element => {
    const [ found, setFound ] = useState(false);

    const toggleFound = (): void => setFound(!found);

    /* eslint-disable jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/no-noninteractive-element-to-interactive-role */
    return (
        <li className={ `${ styles.word } ${ found ? styles.found : "" }` }
            role="button"
            tabIndex={ 0 }
            onClick={ toggleFound }
            onKeyPress={ toggleFound }>
            { word }
        </li>
    );
    /* eslint-enable jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/no-noninteractive-element-to-interactive-role */
};

const Cell = ({ value, showLetters, showGrid }: { value: string; showLetters: boolean; showGrid: boolean }): JSX.Element => {
    const [ redacted, setRedacted ] = useState(false);
    const [ selected, setSelected ] = useState(false);

    const controlStyles = `${ showLetters || value === "💣" ? "" : styles.hideLetters }  ${ showGrid ? "" : styles.noGrid }`;
    const className = `${ styles.cell } ${ controlStyles } ${ redacted ? styles.redacted : "" } ${ selected ? styles.selected : "" }`;

    const onClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
        event.preventDefault();

        if (showLetters && selected) {
            return setSelected(!selected);
        }

        if (showLetters) {
            return setRedacted(!redacted);
        }

        return setSelected(!selected);
    };

    return (
        <td className={ className } onClick={ onClick } role="gridcell">
            { value }
        </td>
    );
};

export default Wordsearch;

import React, { FunctionComponent } from "react";
import styles from "./styles.module.scss";

type Segment = [string, number];

const Route: FunctionComponent<{ route: Segment[] }> = ({ route }) => {
    return (
        <div className={ styles.row }>
            { route.map(([symbol, stops]) => (
                <>
                    <div key={ symbol } className={ `${ styles.symbol } ${ styles[symbol] }` }></div>
                    { stops !== 0 && <span>{ stops }</span> }
                </>
            )) }
        </div>
    );
};

const Subway: FunctionComponent = () => {
    return (
        <div className={ styles.content }>
            <Route route={ [[ "1", 2 ], [ "C", 2 ], [ "E", 2 ]] } />
            <Route route={ [[ "M", 2 ], [ "W", 3 ], [ "6", 3 ]] } />
            <Route route={ [[ "1", 3 ], [ "⮍", 1 ], [ "2", 1 ]] } />
            <Route route={ [[ "F", 3 ], [ "🚶", 0 ], [ "7", 1 ], [ "6", 4 ], [ "L", 1 ]] } />
            <Route route={ [[ "S", 1 ], [ "🚶", 0 ], [ "E", 2 ], [ "D", 2 ], [ "M", 3 ]] } />
            <Route route={ [[ "N", 1 ], [ "R", 5 ]] } />
        </div>
    );
};

export default Subway;

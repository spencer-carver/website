import React, { useState } from "react";
import Navigation from "../../../modules/Navigation";
import recipes, { Recipe } from "../recipes";
import styles from "./styles.module.scss";

interface RecipeRouterProps {
    match: {
        params: {
            recipeName: string;
        };
    };
}

const RecipeComponent = (props: RecipeRouterProps): JSX.Element => {
    const {
        recipeName
    } = props.match.params;

    const [ scaleFactor, setScaleFactor ] = useState(1.0);


    const recipe = (recipes as { [key: string]: Recipe })[recipeName];

    if (!recipe) {
        return (
            <Navigation isHomepage={ false }>
                <div>This isn&apos;t a recipe</div>
            </Navigation>
        );
    }

    const {
        name,
        ingredients,
        directions
    } = recipe;

    return (
        <Navigation isHomepage={ false }>
            <div className={ styles.recipe }>
                <h2 className={ styles.title }>{ name }</h2>
                <h3 className={ styles.section }>Ingredients: </h3>
                <div>
                    { ingredients.map(({ quantity, item, style, measurement }, index) => {
                        if (quantity === "to taste") {
                            return (
                                <p className={ styles.ingredient }>
                                    { item } { quantity }
                                </p>
                            );
                        }

                        const amount = quantity * scaleFactor;

                        return (
                            <p key={ index } className={ styles.ingredient }>
                                <ScaleByIngredent originalAmount={ quantity } currentAmount={ amount } setScaleFactor={ setScaleFactor } />
                                { measurement } { style } { item }{ (amount !== 1 && !measurement) ? "s" : "" }
                            </p>
                        );
                    }) }
                </div>
                <h3 className={ styles.section }>Steps: </h3>
                <div>
                    { directions.map((direction, index) => <Step key={ index } index={ index } direction={ direction } />) }  
                </div>
            </div>
        </Navigation>
    );
};

function formatQuantity(value: number): string {
    const decimalString = value.toString().split(".")[1] || "";
    if (decimalString.length > 2) {
        return value.toFixed(2);
    }

    return value.toString();
}

interface ScaleByIngredientProps {
    originalAmount: number;
    currentAmount: number;
    setScaleFactor: Function;
}

const ScaleByIngredent = ({ originalAmount, currentAmount, setScaleFactor }: ScaleByIngredientProps): JSX.Element => {
    const [ currentValue, setCurrentValue ] = useState(currentAmount.toString());

    function filterValue(value: string): number {
        if (!value) {
            setCurrentValue("");

            return originalAmount;
        }

        if (value.length > 4) {
            return parseFloat(currentValue);
        }

        setCurrentValue(value);

        return parseFloat(value);
    }

    return (
        <input className={ styles.ingredientQuantity }
            type="number"
            step="0.01"
            maxLength={ 4 }
            placeholder={ formatQuantity(currentAmount) }
            value={ parseFloat(currentValue) === currentAmount ? formatQuantity(currentAmount) : "" }
            onChange={ (e): void => setScaleFactor(filterValue(e.target.value) / originalAmount) }
        />
    );
};

interface StepProps {
    index: number;
    direction: string;
}

const Step = ({ index, direction }: StepProps): JSX.Element => {
    const [ complete, setComplete ] = useState(false);

    const toggleComplete = (): void => setComplete(!complete);

    return (
        <div className={ `${ styles.step } ${ complete ? styles.complete : "" }` } role="button" tabIndex={ 0 } onClick={ toggleComplete } onKeyPress={ toggleComplete }>
            <span className={ `${ styles.stepNumber } ${ complete ? styles.complete : "" }` }>{ index + 1 }</span>
            { direction }
        </div>
    );
};


export default RecipeComponent;

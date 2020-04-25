import React, { useState } from "react";
import Navigation from "../../../modules/Navigation";
import recipes, { Recipe, RecipeDetails } from "../recipes";
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
        ingredients,
        directions
    } = recipe;

    return (
        <Navigation isHomepage={ false }>
            <div className={ styles.recipe }>
                <Header scaleFactor={ scaleFactor } { ...recipe } />
                <div className={ styles.bodyContent }>
                    <ul className={ styles.ingredients }>
                        <h3 className={ styles.section }>Ingredients: </h3>
                        { ingredients.map(({ quantity, item, style, measurement }, index) => {
                            if (quantity === "to taste") {
                                return (
                                    <li className={ styles.ingredient }>
                                        { item } { quantity }
                                    </li>
                                );
                            }

                            const amount = quantity * scaleFactor;

                            return (
                                <Ingredient key={ index }
                                    amount={ amount }
                                    measurement={ measurement }
                                    quantity={ quantity }
                                    style={ style }
                                    item={ item }
                                    setScaleFactor={ setScaleFactor }
                                />
                            );
                        }) }
                    </ul>
                    <ul className={ styles.directions }>
                        <h3 className={ styles.section }>Directions: </h3>
                        { directions.map((direction, index) => <Step key={ index } index={ index } direction={ direction } />) }
                    </ul>
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

interface HeaderProps extends RecipeDetails {
    scaleFactor: number;
}

const Header = ({ name, scaleFactor, author, link, tools, timing: { prepTime, cookTime, totalTime }, output }: HeaderProps): JSX.Element => {
    const makes = output ? Math.max(Math.floor(scaleFactor * output.amount), 1) : 1;
    const units = output ? output.unit : "serving";

    return (
        <div className={ styles.header }>
            <h2 className={ styles.title }>{ name }</h2>
            { author && <span><b>Recipe From:</b> { author }</span> }
            { link && <a href={ link } rel="noopener noreferrer" target="_blank">Source</a> }
            <br />
            <span><b>Requires:</b> { tools }</span>
            <div>
                <div className={ styles.timing }>
                    <span><b>Prep Time:</b> { prepTime }</span>
                    <span><b>Cook Time:</b> { cookTime }</span>
                    <span><b>Total Time:</b> { totalTime }</span>
                </div>
                { output && <span><b>Yield:</b> { makes } { makes !== 1 ? `${ units }s` : units }</span> }
            </div>
        </div>
    );
};

interface IngredientProps {
    amount: number;
    quantity: number;
    measurement?: string;
    style?: string;
    item: string;
    setScaleFactor: Function;
}

const Ingredient = ({ amount, measurement, quantity, style, item, setScaleFactor }: IngredientProps): JSX.Element => {
    const [ editable, setEditable ] = useState(false);

    const onClick = (): void => setEditable(!editable);
    const onEnterPress = (event: React.KeyboardEvent<HTMLLIElement>): void => {
        if (event.key !== "Enter") {
            return;
        }

        onClick();
    };
    const onBlur = (): void => {
        setTimeout(() => setEditable(false), 150);
    };

    return (
        // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
        <li className={ styles.ingredient } onClick={ onClick } onKeyPress={ onEnterPress } onBlur={ onBlur }>
            <ScaleByIngredent originalAmount={ quantity } currentAmount={ amount } editable={ editable } setScaleFactor={ setScaleFactor } />
            { measurement } { style } { item }{ (amount !== 1 && !measurement) ? "s" : "" }
        </li>
    );
};

interface ScaleByIngredientProps {
    originalAmount: number;
    currentAmount: number;
    editable: boolean;
    setScaleFactor: Function;
}

const ScaleByIngredent = ({ originalAmount, currentAmount, editable, setScaleFactor }: ScaleByIngredientProps): JSX.Element => {
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

    if (!editable) {
        return <span className={ styles.ingredientQuantity }>{ formatQuantity(currentAmount) }</span>;
    }

    return (
        <input className={ styles.ingredientQuantity }
            type="number"
            step="0.01"
            maxLength={ 4 }
            autoFocus={ true } //eslint-disable-line jsx-a11y/no-autofocus
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
        // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
        <li className={ `${ styles.step } ${ complete ? styles.complete : "" }` } role="button" tabIndex={ 0 } onClick={ toggleComplete } onKeyPress={ toggleComplete }>
            <span className={ `${ styles.stepNumber } ${ complete ? styles.complete : "" }` }>{ index + 1 }</span>
            <span>{ direction }</span>
        </li>
    );
};


export default RecipeComponent;

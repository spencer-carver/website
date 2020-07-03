import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navigation from "../../../modules/Navigation";
import { Recipe, RecipeDetails, Direction, RecipeListDetails } from "../../../@types/recipes";
import styles from "./styles.module.scss";
import { API_URL } from "../../../constants/ExternalUrls";
import fetchFromCache from "../../../utils/cache";
import Video from "../../../components/video";
import Image from "../../../components/image";

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

    const [ loaded, setLoaded ] = useState(false);
    const [ recipe, setRecipe ] = useState(null as unknown as Recipe);
    const [ scaleFactor, setScaleFactor ] = useState(1.0);

    useEffect(() => {
        fetchFromCache(`${ API_URL }/api/recipes/${ recipeName }`)
            .then((data: JSON) => {
                setLoaded(true);
                setRecipe(data as unknown as Recipe);
            });
    }, [ recipeName ]);


    if (!loaded) {
        return (
            <Navigation isLoading={ true }>
                <div></div>
            </Navigation>
        );
    }

    if (!recipe) {
        return (
            <Navigation>
                <div>This isn&apos;t a recipe</div>
            </Navigation>
        );
    }

    const {
        ingredients,
        directions,
        relatedRecipes = {}
    } = recipe;

    return (
        <Navigation>
            <div className={ styles.recipe }>
                <Header scaleFactor={ scaleFactor } { ...recipe } />
                <div className={ styles.bodyContent }>
                    <ul className={ styles.ingredients }>
                        <h3 className={ styles.section }>Ingredients: </h3>
                        { ingredients.map(({ quantity, item, style, measurement }, index) => {
                            if (quantity === "to taste") {
                                return (
                                    <li key={ index } className={ styles.ingredient }>
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
                <div>
                    {
                        relatedRecipes.prev && (
                            <div className={ `${ styles.relatedRecipes } ${ styles.prev }` }>
                                <h3>Prerequisite recipes:</h3>
                                <RelatedRecipe { ...relatedRecipes.prev[0] } />
                            </div>
                        )
                    }
                    {
                        relatedRecipes.next && (
                            <div className={ `${ styles.relatedRecipes } ${ styles.next }` }>
                                <h3>Use this in:</h3>
                                <RelatedRecipe { ...relatedRecipes.next[0] } />
                            </div>
                        )
                    }
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

function minutesToLargerTime(value: number): string {
    let remaining = value;

    const day = Math.floor(remaining / 1440);
    remaining = remaining % 1440;
    const hour = Math.floor(remaining / 60);
    remaining = remaining % 60;

    const time: { [key: string]: number } = {
        day,
        hour,
        minute: remaining
    };

    return Object.keys(time).reduce((acc, part) => {
        const partValue = time[part];

        if (partValue === 0) {
            return acc;
        }

        if (acc === "") {
            return `${ partValue } ${ part }${ partValue === 1 ? "" : "s" }`;
        }

        if (part === "minute") {
            return `${ acc } and ${ partValue } ${ part }${ partValue === 1 ? "" : "s" }`;
        }

        return `${ acc } ${ partValue } ${ part }${ partValue === 1 ? "" : "s" }`;


    }, "");
}

interface HeaderProps extends RecipeDetails {
    scaleFactor: number;
}

const Header = (props: HeaderProps): JSX.Element => {
    const { name, scaleFactor, author, link, tools, timing: { prepTime, cookTime, totalTime }, output, image, video } = props;
    const makes = output ? Math.max(Math.floor(scaleFactor * output.amount), 1) : 1;
    const units = output ? output.unit : "serving";

    return (
        <div className={ styles.header }>
            <div className={ styles.details }>
                <h2 className={ styles.title }>{ name }</h2>
                { author && <span><b>Recipe From:</b> { author }</span> }
                { link && <a href={ link } rel="noopener noreferrer" target="_blank">Source</a> }
                <br />
                <span><b>Requires:</b> { tools }</span>
                <div>
                    <div className={ styles.timing }>
                        <span><b>Prep Time:</b> { minutesToLargerTime(prepTime) }</span>
                        <span><b>Cook Time:</b> { minutesToLargerTime(cookTime) }</span>
                        <span><b>Total Time:</b> { minutesToLargerTime(totalTime) }</span>
                    </div>
                    { output && <span><b>Yield:</b> { makes } { makes !== 1 ? `${ units }s` : units }</span> }
                </div>
            </div>
            { video && <div className={ styles.video }><Video src={ video } poster={ image }/></div> }
            { !video && image && <Image image={ { src: image } } alt={ name } imageStyle="" /> }
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
    direction: Direction;
}

const Step = ({ index, direction }: StepProps): JSX.Element => {
    const [ complete, setComplete ] = useState(false);

    const toggleComplete = (): void => setComplete(!complete);

    return (
        // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
        <li className={ `${ styles.step } ${ complete ? styles.complete : "" }` } role="button" tabIndex={ 0 } onClick={ toggleComplete } onKeyPress={ toggleComplete }>
            <span className={ `${ styles.stepNumber } ${ complete ? styles.complete : "" }` }>{ index + 1 }</span>
            <span>{ direction.instructions }</span>
        </li>
    );
};

const RelatedRecipe = ({ id, name }: RecipeListDetails): JSX.Element => {
    return <Link to={ `/recipe/${ id }` }>{ name }</Link>;
};

export default RecipeComponent;

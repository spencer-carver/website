import React, { useState } from "react";
import styles from "./styles.module.scss";

const BRAILLE_LINK = "https://en.wikipedia.org/wiki/English_Braille#Alphabet";
const MORSE_CODE_LINK = "https://en.wikipedia.org/wiki/Morse_code#/media/File:International_Morse_Code.svg";
const SEMAPHORE_LINK = "https://en.wikipedia.org/wiki/Flag_semaphore#Contemporary_semaphore_flag_system";
const NAVAL_FLAGS_LINK = "https://www.navy.mil/navydata/communications/flags/flags.html";
const RESISTOR_BANDS_LINK = "https://static4.arrow.com/-/media/arrow/images/miscellaneous/h/how-to-read-resistor-color-codes.jpg?la=en";
const ASCII_LINK = "https://www.asciitable.com/";

const Tutorial = (): JSX.Element => {
    const [ showRowNumbers, setShowRowNumbers ] = useState(false);

    const rowNumberStyle = `${ styles.rowNumber } ${ showRowNumbers ? styles.visible : "" }`;
    const onHelpClick = (): void => setShowRowNumbers(true);

    /*
     * If you&apos;re looking at this file to try and get hints to solve this puzzle, Congratulations!
     * You have a good intuition for trying to get around actually doing the work, which can come in handy!
     * Unfortunately for you, looking at this file will only reveal the row numbers, which skips the simple step
     * of reading the first letter of each row and clicking a word. In the future I may make a puzzle where inspecting the contents
     * reveals something, but for now you just need to solve it as intended!
     */

    return (
        <div className={ styles.content }>
            <p className={ styles.row }>
                <span className={ rowNumberStyle }>8</span>
                <span className={ styles.dropLetter }>C</span>ompleting a puzzlehunt style puzzle involves three main steps.
                First you need to understand what the puzzle is asking you to do; this revelation is called the &apos;Aha&apos;.
                Second you need to find what is hidden, and figure out how to get it out. This is called &apos;Extraction&apos;.
                Finally, after you figure out how to extract, you need to do it and solve the puzzle!
                Sometimes you need to repeat these steps multiple times in order to finish the full puzzle.
                However, if you stick to these general steps, you can finish it no matter the quantity!
            </p>
            <p className={ styles.row }>
                <span className={ rowNumberStyle }>6</span>
                <span className={ styles.dropLetter }>L</span>ooking carefully at this page, you&apos;ll see there are three sections.
                The title of the puzzle is the most sparse, but does generally hint at the theme.
                The description of the puzzle (if it exists) can contain hints about how you need to solve the puzzle!
                Lastly the content of the puzzle is well... the puzzle; though in some cases it can actually contain multiple puzzles.
            </p>
            <p className={ styles.row }>
                <span className={ rowNumberStyle }>5</span>
                <span className={ styles.dropLetter }>I</span>n order to solve the puzzles on my website, pay attention to the bottom of the screen.
                This form allows you to submit guesses, ask for a hint, or verify you are on the right track.
                To guess, you just need to type your guess and press enter (or click submit).
                If the guess appears with a red background, it&apos;s just wrong!
                If the guess appears with a yellow background, it means you entered an intermediate solution and are doing well!
                If the guess appears with a green background, you&apos;ve found the answer!
                This should also add a &apos;solved&apos; banner to the page and show up on this page&apos;s parent.
            </p>
            <p className={ styles.row }>
                <span className={ rowNumberStyle }>13</span>
                <span className={ styles.dropLetter }>C</span>onstantly guessing has no penalties,
                but if you are truely stumped you do have other options.
                Taking the piece you are stuck on to a search engine is a good place to start, but as you&apos;re on my website,
                I have something extra.
                In the answer submission box, you can type the word  &apos;hint&apos;
                for <span className={ styles.hint } role="button" tabIndex={ 0 } onKeyPress={ onHelpClick } onClick={ onHelpClick }>help</span>.
                This gives you a clue from me on how to resume solving.
            </p>
            <p className={ styles.row }>
                <span className={ rowNumberStyle }>42</span>
                <span className={ styles.dropLetter }>K</span>nowing when to ask for a hint is a good skill.
                I don&apos;t expect everyone to know every reference I try to put into puzzles.
                If you want to ask a friend that&apos;s better, since you then organically proceed,
                but if you are solving on your own the guidance does exist too.
            </p>
            <p className={ styles.row }>
                <span className={ rowNumberStyle }>19</span>
                <span className={ styles.dropLetter }>T</span>he background color for a hint is blue.
                You don&apos;t actually need to know the color to make use of the hint, it&apos;s just there to prevent confusion.
                In the event you are blind, I&apos;m honestly not sure how well you can interact with my puzzles,
                but I did try and set up screen reader audio support.
            </p>
            <p className={ styles.row }>
                <span className={ rowNumberStyle }>11</span>
                <span className={ styles.dropLetter }>H</span>aving covered the specifics of how to submit answers on this site,
                it&apos;s time to go over some general tips!
                There are a lot of public ways to communicate that are used in puzzles,
                such as <a href={ BRAILLE_LINK }>Braille</a>, <a href={ MORSE_CODE_LINK }>Morse Code</a>, <a href={ SEMAPHORE_LINK }>Semaphore</a>, 
                the NATO Phoenetic Alphabet, <a href={ NAVAL_FLAGS_LINK }>Naval Flags</a>, <a href={ ASCII_LINK }>ASCII encoding</a>,
                or <a href={ RESISTOR_BANDS_LINK }>Resistor Bands</a>.
                You can also make anagrams, encode messages with some sort of cypher or encryption,
                or hide things in plain sight in a non-obvious way!
                Even if you aren&apos;t familiar with a particular strategy, once you identify it there are plenty of available tools to assist you.
            </p>
            <p className={ styles.row }>
                <span className={ rowNumberStyle }>11</span>
                <span className={ styles.dropLetter }>E</span>ach method of obfuscation has advantages and disadvantages.
                Flags are pretty obvious in most cases, and Braille has strict requirements to make sense.
                The more familiar you become with these types of puzzles, the easier it gets to figure out the kind to decode!
            </p>
            <p className={ styles.row }>
                <span className={ rowNumberStyle }>22</span>
                <span className={ styles.dropLetter }>W</span>hen you attempt to solve more difficult puzzles,
                you may even encounter multiple layers of obfuscation at once!
                These complex challenges, paired with clever &apos;Aha&apos; moments are part of what makes puzzle solving such a stellar activity!
            </p>
            <p className={ styles.row }>
                <span className={ rowNumberStyle }>19</span>
                <span className={ styles.dropLetter }>O</span>ne of the more common techniques utilized in a puzzle
                hunt style puzzle is called &apos;Indexing&apos;.
                As the name suggests, you have some number (index) and find the Nth item in a larger set of items.
                This can be a letter in a word or sentence, a syllable, or anything else that can be counted out of a group.
            </p>
            <p className={ styles.row }>
                <span className={ rowNumberStyle }>38</span>
                <span className={ styles.dropLetter }>R</span>emoving punctuation and spaces is common when indexing,
                though if you see a detail which suggests otherwise; give it a try!
            </p>
            <p className={ styles.row }>
                <span className={ rowNumberStyle }>4</span>
                <span className={ styles.dropLetter }>D</span>ozens of other methods exist as well,
                with a delicate balance existing between making a puzzle too easy and too difficult.
                The important thing is to pick inclusions that make sense, are hidden, but not too difficult to find,
                and actually benefit the puzzle in some way, rather than feeling tacked on. 
            </p>
            <p className={ styles.row }>
                <span className={ rowNumberStyle }>32</span>
                <span className={ styles.dropLetter }>H</span>aving covered a decent amount of the basics,
                it&apos;s finally time to give the remainder of the instructions for this puzzle!
                You should have already read the description for the hints it provides (even if you don&apos;t know how they are relevant).
                Keep that in mind.
                Also look at this puzzle itself, does anything stand out?
                In general if it looks a bit peculiar, it&apos;s probably important!
            </p>
            <p className={ styles.row }>
                <span className={ rowNumberStyle }>2</span>
                <span className={ styles.dropLetter }>E</span>ach word (well not every one,
                but a surprising number) in this puzzle was chosen for a reason.
                My use of strange grammar or weird synonyms may or may not be relevant, but it should at least cause you to think it through!
            </p>
            <p className={ styles.row }>
                <span className={ rowNumberStyle }>9</span>
                <span className={ styles.dropLetter }>L</span>astly, each step is supposed to make logical sense from the previous.
                If, in the course of solving this puzzle, you are making giant leaps and unlikely guesses, you may have made a mistake earlier; check!
            </p>
            <p className={ styles.row }>
                <span className={ rowNumberStyle }>19</span>
                <span className={ styles.dropLetter }>P</span>.S. You should have picked up this hint already,
                but try reading the first letter of each paragraph.
                It does look different than the other letters in the row, no?
            </p>
        </div>
    );
};

export default Tutorial;

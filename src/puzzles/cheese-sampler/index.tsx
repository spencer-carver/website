import React from "react";
import ImageComponent from "../../components/image";
import AudioTrack from "../../components/audio";
import styles from "./styles.module.scss";

const ASSET_BASE_URL = "https://spencer.carvers.info/puzzle/cheese-sampler";
const CHEESES: { [key: string]: string } = {
    "ricotta": "1 🧀 3 🎵",
    "camembert": "7 🧀 1 🎵",
    "kashkaval": "9 🧀 9 🎵",
    "brie": "4 🧀 4 🎵",
    "asiago": "1 🧀 4 🎵",
    "swiss": "1 🧀 2 🎵",
    "manchego": "6 🧀 5 🎵",
    "gouda": "4 🧀 4 🎵",
    "havarti": "2 🧀 6 🎵",
    "stilton": "2 🧀 6 🎵",
    "muenster": "3 🧀 3 🎵",
    "colby-jack": "2 🧀 5 🎵",
    "parmesan": "3 🧀 3 🎵",
    "cheddar": "5 🧀 6 🎵",
    "mozzarella": "7 🧀 3 🎵",
    "gruyere": "2 🧀 14 🎵",
    "primo-sale": "3 🎵"
};

const CheeseSampler = (): JSX.Element => {


    /*
     * No hints here, and the only giveaway is the cheese associated with the audio files and images,
     * which is fairly obvious if you just listen (or attempt to download it).
     * I know I don't have the best singing voice, but you didn't need to avoid hearing it completely!
     */

    return (
        <div className={ styles.content }>
            <div className={ styles.images }>{ Object.keys(CHEESES).map((cheese, index) => (<Image key={ index } cheese={ cheese } />)) }</div>
            <div className={ styles.songs }>{ Object.keys(CHEESES).sort().map((cheese, index) => (<Song key={ index } cheese={ cheese } />)) }</div>
        </div>
    );
};

const Image = ({ cheese }: { cheese: string }): JSX.Element => {
    return (
        <div className={ styles.imageContainer }>
            <span className={ styles.label }>{ CHEESES[cheese] }</span>
            <ImageComponent
                image={ {
                    src: `${ ASSET_BASE_URL }/${ cheese }.jpg`,
                    srcWebp: `${ ASSET_BASE_URL }/${ cheese }.webp`
                } }
                alt="cheese"
                imageStyle={ styles.image }
            />
        </div>
    );
};

const Song = ({ cheese }: { cheese: string }): JSX.Element => {
    return <AudioTrack audioStyles={ styles.song } src={ `${ ASSET_BASE_URL }/${ cheese }.mp3` } subtitleSrc={ `${ ASSET_BASE_URL }/${ cheese }.vtt` } />;
};

export default CheeseSampler;

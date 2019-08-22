import React, { useState } from "react";

const DCIWithAuth = ({ dciNumber, setDciNumber, userSecret, setUserSecret }) => {
    const [ localSecret, setLocalSecret ] = useState(null);

    const onStoreSecret = () => {
        if (!localSecret) {
            return;
        }

        try {
            window.localStorage.setItem("userSecret", localSecret);
            setUserSecret(localSecret);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <input type="text" placeholder="dciNumber"></input>
            { userSecret
                ? <span>Your secret is saved to this browser</span>
                : (<div>
                    <input
                        type="password"
                        placeholder="password"
                        onChange={ (event) => setLocalSecret(event.target.value) }
                        value={ localSecret }
                    />
                    <input type="checkbox" onClick={ onStoreSecret }></input> Save
                </div>)
            }
        </div>
    );
};

export default DCIWithAuth;

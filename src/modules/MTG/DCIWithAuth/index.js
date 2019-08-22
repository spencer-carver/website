import React, { useState } from "react";
import FormElement from "../../FormElement";
import "../../../styles/form.scss";

const DCIWithAuth = ({ dciNumber, setDciNumber, userSecret, setUserSecret }) => {
    const [ localSecret, setLocalSecret ] = useState("");

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
            <FormElement id="dciNumber" label="DCI Number" onChange={ setDciNumber } />
            { userSecret
                ? <span>A password is saved to this browser</span>
                : (<div>
                    <FormElement
                        id="password"
                        type="password"
                        label="Password"
                        onChange = { (event) => setLocalSecret(event.target.value) }
                        value={ localSecret }
                    />
                    <button type="button" onClick={ onStoreSecret }>Save</button>
                </div>)
            }
        </div>
    );
};

export default DCIWithAuth;

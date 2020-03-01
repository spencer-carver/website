import { useState, useEffect } from "react";

// Hook from https://usehooks.com/useScript/
const cachedScripts: string[] = [];

function useScript(src: string): [boolean, boolean] {
    // Keeping track of script loaded and error state
    const [ state, setState ] = useState({ loaded: false, error: false });

    useEffect(() => {
        // If cachedScripts array already includes src that means another instance of this hook already loaded this script, so no need to load again.
        if (cachedScripts.indexOf(src) !== -1) {
            setState({ loaded: true, error: false });

            return;
        }

        cachedScripts.push(src);

        // Create script
        const script = document.createElement("script");
        script.src = src;
        script.async = true;
        script.defer = true;

        // Script event listener callbacks for load and error
        const onScriptLoad = (): void => { setState({ loaded: true, error: false }); };

        const onScriptError = (): void => {
            // Remove from cachedScripts we can try loading again
            const index = cachedScripts.indexOf(src);

            if (index >= 0) { cachedScripts.splice(index, 1); }
            script.remove();

            setState({ loaded: true, error: true });
        };

        script.addEventListener("load", onScriptLoad);
        script.addEventListener("error", onScriptError);

        // Add script to document body
        document.head.appendChild(script);

        // Remove event listeners on cleanup
        return (): void => {
            script.removeEventListener("load", onScriptLoad);
            script.removeEventListener("error", onScriptError);
        };
    }, [ src ] // Only re-run effect if script src changes
    );

    return [ state.loaded, state.error ];
}

export default useScript;

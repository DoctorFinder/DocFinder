import { useCallback, useEffect, useRef, useState } from "react";
import { debounce } from "lodash";

export default function useAddressPredictions(input) {
    const [predictions, setPredictions] = useState([]);

    const autocomplete = useRef();

    // create a new session token 
    const sessionToken = new window.google.maps.places.AutocompleteSessionToken();

//    if (!sessionToken.current) {
  //      sessionToken.current = 
    //        new window.google.maps.places.AutocompleteSessionToken();
    //}

    //pass the token to the autocomplete service.

    if (!autocomplete.current) {
        autocomplete.current =
            new window.google.maps.places.AutocompleteService();
    }

    function getPlacePredictions(input) {
        if (input != "") {
            console.log(sessionToken);
            autocomplete.current.getPlacePredictions(
                {
                    input,
                    sessionToken: sessionToken
                },
                predictions => {
                    setPredictions(                        
                        predictions.map(prediction => {                                                 
                            return prediction;
                        })
                    );
                }
            );
        }        
    }

    const debouncedGetPlacePredictions = useCallback(
        debounce(getPlacePredictions, 500),
        []
    );

    useEffect(() => {
        debouncedGetPlacePredictions(input);
    }, [input]);

    return predictions;
}
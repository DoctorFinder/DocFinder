//import { useCallback, useEffect, useRef, useState } from "react";
//import { debounce } from "lodash";

//export default function useAddressPredictions(input) {
//    const [predictions, setPredictions] = useState([]);

//    const autocomplete = useRef();

//    if (!autocomplete.current) {
//        autocomplete.current =
//            new window.google.maps.places.AutocompleteService();
//    }

//    function getPlacePredictions(input) {
//        //if (input != "") {
//        //    autocomplete.current.getPlacePredictions(
//        //        { input },
//        //        predictions => {
//        //            setPredictions(                        
//        //                predictions.map(prediction => {                                                 
//        //                    return prediction;
//        //                })
//        //            );
//        //        }
//        //    );
//        //}        
//    }

//    const debouncedGetPlacePredictions = useCallback(
//        debounce(getPlacePredictions, 500),
//        []
//    );

//    useEffect(() => {
//        debouncedGetPlacePredictions(input);
//    }, [input]);

//    return predictions;
//}
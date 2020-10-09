//import { useCallback, useEffect, useRef, useState } from "react";
//import { debounce } from "lodash";

//export default function usePlaceDetails(placeId) {
//    const [placeInfo, setPlaceInfo] = useState([]);

//    const placeDetails = useRef();

//    const request = {
//        placeId: placeId,
//        fields: ["name", "formatted_address", "place_id", "geometry"],
//    };

//    const map = new window.google.maps.Map();

//    if (!placeDetails.current) {
//        placeDetails.current =
//            new window.google.maps.places.PlacesService(document.createElement('div'));
//    }

//    function getPlacePredictions(placeId) {
//        if (placeId != "") {
//            placeDetails.current.getDetails(
//                { placeId }, (place, status) => {
//                    console.log(place);
//                    console.log(status);
//                    setPlaceInfo(place); 
//                }   
//            );
//        }        
//    }

//    const debouncedGetPlacePredictions = useCallback(
//        debounce(getPlacePredictions, 500),
//        []
//    );

//    useEffect(() => {
//        debouncedGetPlacePredictions(placeId);
//    }, [placeId]);

//    return placeInfo;
//}
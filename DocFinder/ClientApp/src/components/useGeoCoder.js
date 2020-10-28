import { useCallback, useEffect, useRef, useState } from "react";
import { debounce } from "lodash";

export default function usePlaceDetails(placeaddress) {
    const [placeInfo, setPlaceInfo] = useState([]);


    const geocoder = useRef();
    const map = useRef();


    if (!geocoder.current) {
        map.current = new window.google.maps.Map(document.createElement('div'));
        geocoder.current =
            new window.google.maps.Geocoder();
    }

    function getPlacePredictions(placeaddress, resultMap) {
        if (placeaddress != "") {            
            geocoder.current.geocode({ address: placeaddress }, (results, status) => {
                if (status === "OK") {
                    let location = [];
                    location.push(results[0].geometry.location.lat());
                    location.push(results[0].geometry.location.lng());
                    setPlaceInfo(location);                    
                    console.log(results);
                } else {
                    alert("Geocode was not successful for the following reason: " + status);
                }
            });
        }
    }

    const debouncedGetPlacePredictions = useCallback(
        debounce(getPlacePredictions, 500),
        []
    );

    useEffect(() => {
        debouncedGetPlacePredictions(placeaddress, map);
    }, [placeaddress]);

    return placeInfo;
}
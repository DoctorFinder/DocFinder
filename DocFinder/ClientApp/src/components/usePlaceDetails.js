import { useCallback, useEffect, useRef, useState } from "react";
import { debounce } from "lodash";

export default function useGeoCoder(placeId) {
    const [placeInfo, setPlaceInfo] = useState([]);


    const placeDetails = useRef();

    const request = {
        placeId: placeId,
        fields: ["name", "formatted_address", "place_id", "geometry"],
    };


    if (!placeDetails.current) {
        let map = new window.google.maps.Map(document.createElement('div'));
        placeDetails.current =
            new window.google.maps.places.PlacesService(map);
    }

    function getPlacePredictions(placeId) {
        if (placeId != "") {
            placeDetails.current.getDetails(
                {
                    placeId: placeId
                }, (place, status) => {
                    setPlaceInfo(place);
                }
            );
        }
    }

    const debouncedGetPlacePredictions = useCallback(
        debounce(getPlacePredictions, 500),
        []
    );

    useEffect(() => {
        debouncedGetPlacePredictions(placeId);
    }, [placeId]);

    return placeInfo;
}

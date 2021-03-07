import React, { useState, useEffect, useRef, useContext } from "react";
import fetchDestinations from "../../api/FetchDestinations";
import StopPickerComponent from "./StopPickerComponent";
import originArrayBuilder from "../Utilities/OriginArrayBuilder";
import destinationArrayBuilder from "../Utilities/DestinationArrayBuilder";
import AppContext from "../AppContext";

export default function StopPicker(props) {
  const [allDestinations, setAllDestinations] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]); // "to" soovitused
  const [originSuggestions, setOriginSuggestions] = useState([]); // "from" soovitused
  const destinationStops = []; // lõplik peatuste nimekiri
  const context = useContext(AppContext);
  const origin = context.values.searchState.origin;
  const destination = context.values.searchState.destination;
  const destinationRef = useRef(null);
  const originRef = useRef();
  let origins = [];
  const allStopNames = [];
  const allStopsIds = [];

  function clickSwitch() {
    // vahetab From->To.
    const oldOrigin = origin;
    console.log(oldOrigin);
    props.setField("origin", destination);
    props.setField("destination", oldOrigin);
    console.log(oldOrigin);
    getContent(destination);
  }


  // Put all the possible origins to an array.
  origins = originArrayBuilder(props.stops, allStopNames, allStopsIds);

  // Get all destinations that are possible from the selected origin.
  async function getContent(newValue) {
    const result = await destinationArrayBuilder(
      newValue,
      allStopNames,
      props.stops,
      fetchDestinations,
      allStopsIds
    );
    setAllDestinations(result[0]);
  }

  allDestinations.map((value) => {
    if (value.hasOwnProperty("name")) {
      destinationStops.push(value.name);
    } else {
      destinationStops.push(value);
    }
    return null;
  });

  // Automatically move focus "From->To".
  useEffect(() => {
    if (allDestinations.length > 0) {
      destinationRef.current.focus();
    }
  }, [allDestinations]);

  const originClassName =
    props.alertState && origin.length === 0
      ? "left-section-false"
      : "left-section";
  const switchClassName =
    (props.alertState && origin.length === 0) ||
    (props.alertState && destination.length === 0)
      ? "separator-false"
      : "separator";
  const destinationClassName =
    props.alertState && destination.length === 0
      ? "destination-section-false"
      : "destination-section";

  return (
    <>
      <div
        className={originClassName}
        onClick={() => originRef.current.focus()}
      >
        <StopPickerComponent
          reference={originRef}
          placeholder="From"
          name="origin"
          className="origin-input"
          value={origin}
          getContent={getContent}
          setField={props.setField}
          setSuggestions={setOriginSuggestions}
          stops={origins}
          suggestions={originSuggestions}
          directionState={props.directionState}
        />
      </div>
      <div className={switchClassName}>
        <div className="rectangle"></div>
        <div
          className="switch-origin-destination"
          onClick={() => clickSwitch()}
        ></div>
        <div className="rectangle"></div>
        {destinationSuggestions.length > 0 ? (
          <div
            className="triangle"
            style={{
              marginTop: "72px",
              marginLeft: "5%",
              position: "absolute",
              height: "65px",
              width: "50px",
              zIndex: 0,
            }}
          ></div>
        ) : null}
      </div>
      <div
        className={destinationClassName}
        onClick={() => destinationRef.current.focus()}
      >
        <StopPickerComponent
          reference={destinationRef}
          placeholder="To"
          value={destination}
          name="destination"
          className="destination-input"
          getContent={getContent}
          setField={props.setField}
          stops={destinationStops}
          setSuggestions={setDestinationSuggestions}
          suggestions={destinationSuggestions}
        />
        {originSuggestions.length > 0 ? (
          <div
            className="triangle"
            style={{
              marginTop: "-5px",
              marginLeft: "-100%",
              height: "70px",
              width: "60px",
            }}
          ></div>
        ) : null}
      </div>
    </>
  );
}

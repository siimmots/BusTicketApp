import React from "react";
import Autosuggest from "react-autosuggest";

export default function StopPickerComponent(props) {
  function subheading(data) {
    return <div className="run-animation">{data.toUpperCase()}</div>;
  }
  const getSuggestionValue = (suggestion) => suggestion;

  const renderSuggestion = (suggestion) => (
    <div className="suggestion">
      <span>{suggestion}</span>{" "}
    </div>
  );

  // suggestion rendering conditions
  function shouldRenderSuggestions(value, target) {
    if (target === "" || value.trim().length > 0) {
      return true;
    }
    return false;
  }

  // teach autosuggest how to suggest values
  const getSuggestions = (value, stops) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0
      ? stops.sort((a, b) => a.localeCompare(b))
      : stops.filter(
          (option) => option.toLowerCase().slice(0, inputLength) === inputValue
        );
  };

  return (
    <div className={props.className}>
      {props.value ? subheading(props.placeholder) : null}

      <Autosuggest
        inputProps={{
          ref: props.reference,
          placeholder: props.placeholder,
          value: props.value,
          onChange: (event, { newValue }) => {
            props.getContent(newValue);
            // eslint-disable-next-line no-unused-expressions
            props.directionState === "return"
              ? null
              : props.setField(props.name, newValue);
          },
        }}
        // focusInputOnSuggestionClick={false}
        onSuggestionsFetchRequested={({ value }) => {
          if (!value) {
            props.setSuggestions([]);
          }
          props.setSuggestions(getSuggestions(props.value, props.stops));
        }}
        onSuggestionsClearRequested={() => {
          props.setSuggestions([]);
        }}
        suggestions={props.suggestions}
        getSuggestionValue={getSuggestionValue}
        shouldRenderSuggestions={() =>
          shouldRenderSuggestions(props.value, props.value)
        }
        renderSuggestion={renderSuggestion}
      />
    </div>
  );
}

import React, { useReducer, useEffect } from "react";
import { useTermsList } from "../customHooks";
import { withStyle } from "../hoc";

export type TypeAheadProps = {
  value: string;
  placeHolder: string;
  onChange: (string) => any;
};

const reducer = (state, { type, ...payload }) => {
  switch (type) {
    case "SET_INPUT":
      return {
        ...state,
        input: payload.input,
        options: [],
        selectedOption: 0,
        intermediateInput: "",
      };
    case "SET_FOCUS":
      return {
        ...state,
        isFocused: true,
      };
    case "SET_BLUR":
      return {
        ...state,
        isFocused: false,
        options: [],
        intermediateInput: "",
      };
    case "ON_PREES_ARROW_UP":
      const newSelectedOption =
        state.selectedOption > 0
          ? (state.selectedOption - 1) % payload.options.length
          : payload.options.length - 1;
      return {
        ...state,
        selectedOption: newSelectedOption,
        intermediateInput: state.input,
      };
    case "ON_PREES_ARROW_DOWN":
      return {
        ...state,
        selectedOption: (state.selectedOption + 1) % payload.options.length,
        intermediateInput: state.input,
      };
    case "SET_INTERMEDIATE_INPUT":
      return {
        ...state,
        intermediateInput: state.input,
        selectedOption: payload.selectedOption,
      };
    case "SET_OPTIONS":
      let newOptions: string[] = [];

      if (state.input && state.isFocused) {
        const regex = new RegExp(`^.*${state.input.toLowerCase()}.*$`);
        const filteredTermsList = payload.termsList.filter((term) =>
          regex.test(term.toLowerCase())
        );
        newOptions =
          filteredTermsList.length > 5
            ? filteredTermsList.slice(0, 5)
            : filteredTermsList;
      }
      return {
        ...state,
        options: newOptions,
      };

    default:
      return { ...state };
  }
};

const TypeAhead: React.FunctionComponent<TypeAheadProps> = ({
  value,
  placeHolder,
  onChange,
}) => {
  const [
    { input, intermediateInput, isFocused, selectedOption, options },
    dispatch,
  ] = useReducer(reducer, {
    input: value,
    intermediateInput: "",
    isFocused: false,
    selectedOption: 0,
    options: [],
  });
  const termsList = useTermsList();

  useEffect(() => {
    !isFocused && onChange && onChange(input);
  }, [isFocused]);
  useEffect(() => {
    dispatch({ type: "SET_OPTIONS", termsList });
  }, [input, isFocused, termsList]);

  // event handlers
  const onChangeHandler = (e) => {
    dispatch({ type: "SET_INPUT", input: e.target.value });
  };
  const onKeyUpHandler = (e) => {
    if (e.key === "ArrowUp") {
      dispatch({
        type: "ON_PREES_ARROW_UP",
        options,
      });
    }
    if (e.key === "ArrowDown") {
      dispatch({
        type: "ON_PREES_ARROW_DOWN",
        options,
      });
    }
    if (e.key === "Enter" && options[selectedOption]) {
      dispatch({
        type: "SET_INPUT",
        input: options[selectedOption],
      });
    }
  };
  const onFocusHandler = () => {
    dispatch({ type: "SET_FOCUS" });
  };
  const onBlurHandler = (e) => {
    setTimeout(() => {
      dispatch({ type: "SET_BLUR" });
      e.preventDefault();
    }, 1000);
  };
  const onOptionSelected = (value) => () => {
    dispatch({ type: "SET_INPUT", input: value });
  };
  const handleOnMouseEnter = (selectedOption) => () => {
    dispatch({ type: "SET_INTERMEDIATE_INPUT", selectedOption });
  };

  // render section
  const renderOption = (option) => {
    const termIndex = option.toLowerCase().search(input.toLowerCase());
    const prefix = option.slice(0, termIndex);
    const matchedTerm = option.slice(termIndex, termIndex + input.length);
    const postfix = option.slice(termIndex + input.length);

    return (
      <span>
        {prefix}
        <b>{matchedTerm}</b>
        {postfix}
      </span>
    );
  };

  return (
    <div className="typeAheadContainer">
      <div className="suggestionsWrapper">
        <div className="suggestions">
          <div className="textInput">
            <input
              type="text"
              placeholder={placeHolder}
              value={intermediateInput ? options[selectedOption] : input}
              onChange={onChangeHandler}
              onKeyUp={onKeyUpHandler}
              onFocus={onFocusHandler}
              onBlur={onBlurHandler}
            />
          </div>
          <div className="options">
            {options.map((option, index) => (
              <span
                key={`${index}_${option}`}
                className={`option ${
                  index === selectedOption ? "highlight" : ""
                }`}
                onClick={onOptionSelected(option)}
                onMouseEnter={handleOnMouseEnter(index)}
              >
                {renderOption(option)}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

TypeAhead.defaultProps = {
  value: "",
  placeHolder: "",
};

const style: string = `
.typeAheadContainer {
		display: flex;
		justify-content: center;
		background-color: lightskyblue;
    flex-direction: column
    width: 300px;
    padding-top: 10vh;
    font-family: cursive;

  .suggestionsWrapper {
    position: relative;
    user-select: none;
    width: 100%;

    .suggestions {
      position: relative;
      display: flex;
      flex-direction: column;

      .textInput {
        position: relative;
        font-weight: 300;
        color: black;
        height: 40px;
        line-height: 60px;
        background: white;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;

        input {
          width: 100%;
          height: 100%;
          font-size: 18px;
          padding-left: 15px
        }
      }

      .options {
        position: absolute;
        display: block;
        top: 100%;
        left: 0;
        right: 0;
        background: white;
        z-index: 2;
        visibility: hidden;
        pointer-events: none;
        visibility: visible;
        pointer-events: all;
        margin-top: 3px;
        border-radius: 10px;

        .option {
          position: relative;
          display: block;
          padding: 0 22px 0 22px;
          font-size: 18px;
          font-weight: 300;
          color: black;
          line-height: 40px;
          cursor: pointer;

          b {
            color: lightcoral;
          }

          &:hover {
            background-color: lightcyan;
          }
        }

        .highlight {
          background-color: lightcyan;
        }
      }
    }
  }
}
`;

export default withStyle(style)(TypeAhead);

import React, { useState } from "react";
import { withStyle } from "../hoc";
import { TypeAhead } from "../components";

const Body: React.FunctionComponent<{}> = () => {
  const [fruit, setFruit] = useState("");
  const [submitValue, setSubmitValue] = useState("");

  const onSubmitHandler = (e) => {
    setSubmitValue(fruit);
    e.preventDefault();
  };

  const onInputHandlerChange = (value) => {
    setFruit(value);
  };

  return (
    <div className="bodyContainer">
      <form onSubmit={onSubmitHandler}>
        <TypeAhead
          value={fruit}
          placeHolder="fruit"
          onChange={onInputHandlerChange}
        />
        <div className="inputWrapper">
          <input type="submit" value="submit" />
        </div>
      </form>
      {submitValue && <p>You have submitted: {submitValue}</p>}
    </div>
  );
};

const style = `
	.bodyContainer {
    form {
      .inputWrapper {
        display: flex;
        justify-content: center;

        input {
          margin-top: 10px;
          height: 30px;
          width: 50%;
        }
      }
    }

    p {
      font-size: 18px;
      text-align: center;
      font-family: cursive;
      color: white;
    }
	}
`;

export default withStyle(style)(Body);

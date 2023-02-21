import "./styles.css";
import { useState } from "react";
import { states } from "./Data";
export default function App() {
  const [isShowDrop, setShowDrop] = useState(false);
  const [checkedInput, setCheckInput] = useState<Record<string, boolean>>(
    states.reduce(
      (obj, state) => ({
        ...obj,
        [state.name]: false
      }),
      {}
    )
  );
  const [isSelected, setSelected] = useState({
    word: "select All",
    value: false
  });
  const numberOfSelected = Object.values(checkedInput).filter(Boolean).length;

  const displayName = (): string | number => {
    let arr = [];
    for (let key in checkedInput) {
      if (checkedInput[key]) {
        arr.push(key);
      }
    }
    if (numberOfSelected <= 8) {
      return arr.join(",");
    } else {
      return `${numberOfSelected} selected`;
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    state: typeof states[number] // type:  {code: string, name: string}[number], number is index => (states[0])
    // {code: string, name: string}[] => {code: string, name: string}
  ) => {
    setCheckInput({
      ...checkedInput,
      [state.name]: e.target.checked
    });
  };
  const selectStates = () => {
    let checked = states.reduce((obj, state) => {
      if (!isSelected.value) {
        setSelected({ word: "Un select All", value: true });
        // ;
        return { ...obj, [state.name]: true };
      } else {
        setSelected({ ...isSelected, word: "selecte All ", value: false });
        return { ...obj, [state.name]: false };
      }
    }, {});
    setCheckInput(checked);
  };
  return (
    <div className="App">
      <h4> multi-select #5 </h4>
      <div className="container">
        <button
          className="drop-down-btn"
          onClick={() => setShowDrop((prev) => !prev)}
        >
          <p> {numberOfSelected === 0 ? `select-states` : displayName()} </p>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
            width="20px"
            height="20px"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        </button>
        {isShowDrop && (
          <div className="states-options">
            <div>
              {" "}
              <button className="select-states" onClick={selectStates}>
                {isSelected.word}
              </button>
            </div>

            {states.map((state) => (
              <div
                key={state.code}
                className={checkedInput[state.name] ? "selected" : ""}
              >
                <input
                  type="checkbox"
                  id={`input-${state.code}`}
                  onChange={(e) => handleChange(e, state)}
                  checked={checkedInput[state.name]}
                />
                <label htmlFor={`input-${state.code}`}> {state.name}</label>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

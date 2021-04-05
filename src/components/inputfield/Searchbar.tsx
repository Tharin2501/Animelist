import React, { useRef, useEffect, useState } from "react";

// Searchbar: https://www.emgoto.com/react-search-bar/

// TODO: Controllable component DONE + searchbar filter https://www.youtube.com/watch?v=OlVkYnVXPl0
const Searchbar: React.FunctionComponent<React.ReactNode> = () => {
  // https://fettblog.eu/typescript-react/hooks/#useref to prevent -> Object is possibly 'undefined'.  TS2532
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState<string>(""); // For an input to be controlled, its value must correspond to that of a state variable.

  useEffect(() => {
    // with the initial value of a ref being null, inputRef might be null. TypeScript complains that you should do a strict null check.
    if (inputRef.current !== null) {
      inputRef.current.focus();
    }
  }, []);

  // https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/forms_and_events/ event type for form
  const handleOnChange = (event: React.FormEvent<HTMLInputElement>): void => {
    return setValue(event.currentTarget.value); // currentTarget = element that has the event listener(input).
  };

  return (
    <form autoComplete="off">
      <label>
        add logo
        <input
          type="text"
          placeholder="Search..."
          ref={inputRef}
          value={value}
          onChange={handleOnChange}
        ></input>
      </label>
    </form>
  );
};

export default Searchbar;

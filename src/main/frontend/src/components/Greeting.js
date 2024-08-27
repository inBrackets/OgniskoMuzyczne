import { useState } from "react";

export function Greeting({ name, message }) {
  const [messageState, setMessage] = useState(message);
  const changeMessage = () => {
    setMessage("Goodbye");
  };
  return (
    <>
      <h2>
        {messageState}, {name}!
      </h2>
      <p>{messageState}</p>
      <button onClick={changeMessage}>Change Message</button>
    </>
  );
}

export default Greeting;

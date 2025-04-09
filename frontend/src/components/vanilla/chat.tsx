import React, { useState } from "react";

export default function Chat() {
  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    setMessage(event.target.value);
  }
  function onClick() {
    setMessage("");
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    console.log(message);
    try {
      await fetch(`http://localhost:5000/roomID/123`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: message }),
      });
      setMessage("");
    } catch (e) {
      console.log(e);
    }
  }

  const [message, setMessage] = useState<string>();
  return (
    <>
      <div>{}</div>
      <div
        style={{
          position: "relative",
          alignContent: "center",
          justifyContent: "center",
          background: "grey",
          color: "red",
          boxSizing: "border-box",
        }}
      >
        <form
          onSubmit={onSubmit}
          style={{
            position: "fixed",
            left: 500,
            bottom: 10,

            textAlign: "left",
            display: "flex",
            // flexDirection: "column",
            width: "400px",
            margin: "50px ",
            padding: "20px",
            borderRadius: "8px",
            gap: "10px",
          }}
        >
          <input
            type="text"
            placeholder="Type your message..."
            name="message"
            onChange={onChange}
            style={{
              padding: "10px",
              width: "100%",
              boxSizing: "border-box",
            }}
          />
          <input
            type="submit"
            style={{
              padding: "10px",
              width: "100px",
              backgroundColor: "#007bff",
              borderRadius: "8px",
              border: "none",
              // color:"white"
            }}
            value={"Send"}
            onClick={onClick}
          />
        </form>
      </div>
    </>
  );
}

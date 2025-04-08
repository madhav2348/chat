import React, { useState } from "react";

export default function Chat() {
  function onChange(
    event: React.ChangeEvent<HTMLInputElement>
    // formData
    // e: React.SyntheticEvent | Event
  ) {
    // console.log(e.target);
    setMessage(event.target.value);
  }
  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log(message);
    try {
      await fetch(`http://localhost:5000/roomID`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: message }),
      });
    } catch (e) {
      console.log(e);
    }
  }

  const [message, setMessage] = useState<string>();
  return (
    <>
      <div>
        <main>
          <form
            onSubmit={onSubmit}
            style={{
              textAlign: "left",
              display: "flex",
              flexDirection: "column",
              width: "400px",
              margin: "50px auto",
              padding: "20px",
              borderRadius: "8px",
              gap: "10px",
            }}
          >
            <input
              type="text"
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
                width: "100%",
                backgroundColor: "#007bff",
                borderRadius: "8px",
                border: "none",
                // color:"white"
              }}
              value={"Submit"}
            />
          </form>
        </main>
      </div>
    </>
  );
}

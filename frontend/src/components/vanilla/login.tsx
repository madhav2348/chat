import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      await fetch("http://localhost:5000/addUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      navigate("/roomID");
    } catch (e) {
      console.log(e);
      
    }
  }

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    SetUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  }
  const navigate = useNavigate();
  const [userData, SetUserData] = useState({
    name: "",
    room: "",
    // roomId: uuid(),
  });
  return (
    <>
      <div>
        <div
          style={{
            // padding:"20px"
            textAlign: "center",
          }}
        >
          <ul
            style={{
              display: "flex",
              padding: "0",
              margin: "0",
              justifyContent: "center",
              listStyle: "none",

              gap: "20px",
              alignContent: "space-between",
              // alignItems:"center",
              // textAlign:"justify"
            }}
          >
            <li
              style={{
                borderBottom: "2px solid transparent",
                cursor: "pointer",
              }}
            >
              Create Room
            </li>
            <li
              style={{
                borderBottom: "2px solid transparent",
                cursor: "pointer",
              }}
            >
              Enter Room
            </li>
          </ul>
        </div>
        <div>
          <form
            action="/addUser"
            method="POST"
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
            <label htmlFor="" style={{}}>
              Name
            </label>
            <input
              onChange={onChange}
              style={{
                padding: "10px",
                width: "100%",
                boxSizing: "border-box",
              }}
              type="text"
              name="name"
            />

            <label
              htmlFor=""
              style={
                {
                  // margin:"5px"
                }
              }
            >
              Room ID
            </label>
            <input
              type="text"
              onChange={onChange}
              style={{
                padding: "10px",
                width: "100%",
                boxSizing: "border-box",
              }}
              name="room"
            />
            <input
              style={{
                padding: "10px",
                width: "100%",
                backgroundColor: "#007bff",
                borderRadius: "8px",
                border: "none",
                // color:"white"
              }}
              type="submit"
              value={"Submit"}
            />
          </form>
        </div>
      </div>
    </>
  );
}

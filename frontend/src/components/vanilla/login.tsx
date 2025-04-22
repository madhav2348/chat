import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      const url = await fetch("http://localhost:5000/addUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      let id = await url.json();
      navigate(`/roomID`);
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
  const [tab, setTab] = useState("create");
  const [userData, SetUserData] = useState({
    name: "",
    room: "",
    // Dd: uuid(),
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
              gap: "30%",
              justifyContent: "center",
              padding: 0,
              margin: 0,
              listStyle: "none",
            }}
          >
            <li
              style={{
                
                borderBottom:
                  tab === "create"
                    ? "2px solid #007BFF"
                    : "2px solid transparent",
                color: tab === "create" ? "#007BFF" : "#FFF",

                cursor: "pointer",
              }}
              onClick={() => setTab("create")}
            >
              Create Room
            </li>
            <li
              onClick={() => setTab("enter")}
              style={{
                borderBottom:
                  tab === "enter"
                    ? "2px solid #007BFF"
                    : "2px solid transparent",
                color: tab === "enter" ? "#007BFF" : "#FFF",
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

// import {
//   Box,
//   Button,
//   IconButton,
//   Snackbar,
//   SnackbarCloseReason,
//   Tab,
//   Tabs,
//   TextField,
//   Typography,
// } from "@mui/material";
// import React from "react";
// import { ChangeEvent,  useState } from "react";

// // interface RoomNameID {
// //   id: string;
// //   name: string;
// //   admin?: boolean;
// //   roomType?: boolean;
// //   password?: string;
// // }

// interface RoomTab {
//   index: number;
//   value: number;
//   Roomtype: string;
//   buttonName: String;
//   button: React.MouseEventHandler<HTMLButtonElement>;
//   nameChange: (event: ChangeEvent<HTMLInputElement>) => void;
//   roomChange: (event: ChangeEvent<HTMLInputElement>) => void;
// }

// function CustomRoomTab(props: RoomTab) {
//   const { value, index, ...other } = props;

//   return (
//     <div hidden={index !== value} id={`tab ${value}`}>
//       {value === index && (
//         <Box sx={{ display: "", textAlign: "start" }}>
//           <Typography>Name</Typography>
//           <TextField
//             type="text"
//             name="name"
//             onChange={other.nameChange}
//             sx={{ marginBottom: "10px", marginTop: "10px" }}
//           ></TextField>

//           <Typography>{other.Roomtype}</Typography>

//           <TextField
//             onChange={other.roomChange}
//             type="text"
//             name="room"
//             sx={{ marginBottom: "10px", marginTop: "10px" }}
//           ></TextField>
//           <br />
//           <Button href="/roomID" variant="contained" type="submit" onClick={other.button}>
//             {" "}
//             {other.buttonName}
//           </Button>
//         </Box>
//       )}
//     </div>
//   );
// }
// export default function CardBox() {
//   const [value, setValue] = useState(0);
//   const [snack, setSnack] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     room: "",
//   });

//   function handleTabChange(event: React.SyntheticEvent | Event, newValue: number) {
    
//     return setValue(newValue);
//   }

//   function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
//     const { name, value } = event.target;
//     return setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   }

//   function snackAction(text: string) {
//     return (
//       <React.Fragment>
//         {text}
//         <IconButton
//           size="small"
//           color="inherit"
//           onClick={closeSnack}
//         ></IconButton>
//       </React.Fragment>
//     );
//   }

//   function closeSnack(
//     event: React.SyntheticEvent | Event ,
//     reason?: SnackbarCloseReason
//   ) {
//     if (reason === "clickaway") {
//       return;
//     }
//     setSnack(false);
//   }

// // function  handleClickButton(){
// // console.log(formData)
// // setSnack(true)
    
// // }
//   return (
//     <Box>
//       <Box>
//         <Tabs value={value} onChange={handleTabChange}>
//           <Tab label="Create" />
//           <Tab label="Enter" />
//         </Tabs>

//       </Box>
//       <CustomRoomTab
//         button={() => console.log(formData)}
//         nameChange={handleInputChange}
//         roomChange={handleInputChange}
//         value={value}
//         index={0}
//         Roomtype="Room Name"
//         buttonName=" Create Room"
//       />

//       <CustomRoomTab
//         value={value}
//         index={1}
//         Roomtype="Room ID"
//         buttonName=" Enter Room"
//         button={() => console.log(formData)}
//         roomChange={handleInputChange}
//         nameChange={handleInputChange}
//       />

//       <Snackbar
//         open={snack}
//         autoHideDuration={6000}
//         action={snackAction("joined")}
//         onClose={closeSnack}
//       />
//       {/* <CustomTabPanel></CustomTabPanel> */}
//       {/* <Box sx={{ display: "", textAlign: "start" }}>
//           <Typography>Name</Typography>
//           <TextField
//             type="text"
//             sx={{ marginBottom: "10px", marginTop: "10px" }}
//           ></TextField>

//           <Typography>Room Id</Typography>

//           <TextField
//             type="text"
//             sx={{ marginBottom: "10px", marginTop: "10px" }}
//           ></TextField>
//           <br />
//           <Button variant="contained"> Enter Room</Button>
//         </Box> */}
//       {/* <Box style={{ textAlign: "start" }}>
//           <Typography>Name</Typography>
//           <TextField
//             type="text"
//             sx={{ marginBottom: "10px", marginTop: "10px" }}
//           ></TextField>

//           <Typography>Create Room </Typography>

//           <TextField
//             type="text"
//             sx={{ marginBottom: "10px", marginTop: "10px" }}
//           ></TextField>
//           <br />
//           <Button variant="contained"> Create Room</Button>
//         </Box> */}
//     </Box>
//   );
// }

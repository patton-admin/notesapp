// import React from "react";
// import Button from "@material-ui/core/Button";
// import Dialog from "@material-ui/core/Dialog";
// import DialogActions from "@material-ui/core/DialogActions";
// import DialogContent from "@material-ui/core/DialogContent";
// import DialogContentText from "@material-ui/core/DialogContentText";
// import DialogTitle from "@material-ui/core/DialogTitle";
// import Slide from "@material-ui/core/Slide";
//
// const Transition = React.forwardRef(function Transition(props, ref) {
//   return <Slide direction="up" ref={ref} {...props} />;
// });
//
// export default function AlertDialogSlide(props) {
//   const { showModal, handleClose, handleLogout } = props;
//
//   return (
//     <div>
//       <Dialog
//         open={showModal}
//         TransitionComponent={Transition}
//         keepMounted
//         onClose={handleClose}
//         aria-labelledby="alert-dialog-slide-title"
//         aria-describedby="alert-dialog-slide-description"
//       >
//         <DialogTitle id="alert-dialog-slide-title" style={{ color: "#f50057" }}>
//           {"You have been Idle!"}
//         </DialogTitle>
//         <DialogContent>
//           <DialogContentText id="alert-dialog-slide-description">
//             You will get timed out. Do You want to stay?
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleLogout} variant="contained" color="secondary">
//             Logout
//           </Button>
//           <Button onClick={handleClose} variant="contained" color="secondary">
//             Stay
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// }

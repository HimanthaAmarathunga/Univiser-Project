import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Alert, Box, Button, Snackbar, Typography } from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add,
  Remove,
} from "@mui/icons-material";
import "./AddCustomer.css";
import {
    addCustomer,
    fetchCustomers,
    modifyCustomer,
    removeCustomer,
    addPoints,
    redeemPoints,
    changeStateTrue,
    changeStateFalse,
  } from "../Features/CustomerSlice";
  import { useEffect } from "react";

export default function AddCustomer() {
  const dispatch = useDispatch();
  const {
    loading,
    customerList = [],
    error,
    updateState,
    response,
  } = useSelector((state) => state.customerKey);
  console.log();
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [points, setPoints] = useState();

  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(addCustomer({ name: name, email: email, points: points }));

    handleClickSnackbar();
    setName("");
    setEmail("");
    setPoints();
    console.log("Adding Data " +e);
  };

  const viewCustomers = (e) => {
    e.preventDefault();
    dispatch(fetchCustomers({name: name, email: email, points: points}));
    dispatch(changeStateFalse);
  }

  const updateCustomer = (item) => {
    setId(item._id);
    setName(item.name);
    setEmail(item.email);
    setPoints(item.points);
    dispatch(changeStateTrue());
  };

  const updateForm = () => {
    dispatch(
      modifyCustomer({ id: id, name: name, email: email, points: points })
    );
    dispatch(changeStateFalse());
    handleClickSnackbar();
    setId("");
    setName("");
    setEmail("");
    setPoints();
  };

  const addingPoints = () => {
    dispatch(
        addPoints({id: id, points: points})
    );
    dispatch(changeStateFalse());
    handleClickSnackbar();
    setPoints();
  }

  const redeemingPoints = () => {
    dispatch(
        redeemPoints({id: id, points: points})
    );
    dispatch(changeStateFalse());
    handleClickSnackbar();
    setPoints();
  }

  const deleteCustomer = (id) => {
    dispatch(removeCustomer(id));
    handleClickSnackbar();
  };

  const [open, setOpen] = useState(false);
  const handleClickSnackbar = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div className="AddCustomerContainer">
        <h2 className="h2-class">Add Customer</h2>
        <div
          className="container"
          style={{ border: "1px solid", borderRadius: "30px" }}
        >
          <form onSubmit={handleClick} className="customer-form">
            <div className="messages"></div>
            <div className="controls">
              <div className="row">
                <div className="col-sm-4">
                  <div className="form-group">
                    <label for="form_name">Name</label>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                      placeholder="Name"
                    />
                    <div className="help-block with-errors"></div>
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="form-group">
                    <label for="form_email">Email </label>
                    <input
                      type="text"
                      name="email"
                      className="form-control"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      placeholder="Email"
                    />
                    <div className="help-block with-errors"></div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-4">
                  <div className="form-group">
                    <label for="form_name">Points</label>
                    <input
                      type="number"
                      className="form-control"
                      name="points"
                      value={points}
                      onChange={(e) => {
                        setPoints(e.target.value);
                      }}
                      placeholder="Points"
                    />
                    <div className="help-block with-errors"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="clearfix"></div>
            {updateState ? (
              <Button
                onClick={(e) => {
                  updateForm(e);
                }}
              >
                Update
              </Button>
            ) : (
              <Button
                className="Button-Add"
                onClick={(e) => {
                  handleClick(e);
                }}
              >
                Add
              </Button>
            )}
          </form>
        </div>
        <div>
          <TableContainer component={Paper} sx={{ marginTop: "16px" }}>
            <Table sx={{ minWidth: 659 }} aria-label="simple table">
              <TableHead>
                <TableRow sx={{ backgroundColor: "black" }}>
                  <TableCell align="left">
                    <Typography sx={{ fontWeight: 600, color: "white" }}>
                      Name
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography sx={{ fontWeight: 600, color: "white" }}>
                      Email
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography sx={{ fontWeight: 600, color: "white" }}>
                      Points
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography sx={{ fontWeight: 600, color: "white" }}>
                      Add Points
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography sx={{ fontWeight: 600, color: "white" }}>
                      Redeem Points
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography sx={{ fontWeight: 600, color: "white" }}>
                      Event
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? <TableCell> Loading... </TableCell> : null}
                {!loading && customerList.length === 0 ? (
                  <TableCell> No Records </TableCell>
                ) : null}
                {!loading && error ? <TableCell> {error} </TableCell> : null}
                {customerList &&
                  customerList.map((item, index) => (
                    <TableRow
                      key={index}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell align="left">
                        <Typography> {item.name} </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography> {item.email} </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography> {item.points} </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Box
                          sx={{ color: "blue" }}
                          onClick={() => addingPoints(item.points)}
                        >
                          <Add />
                        </Box>
                      </TableCell>
                      <TableCell align="left">
                        <Box
                          sx={{ color: "blue" }}
                          onClick={() => redeemingPoints(item.points)}
                        >
                          <Remove />
                        </Box>
                      </TableCell>
                      <TableCell align="left">
                        <Box sx={{ display: "flex", cursor: "pointer" }}>
                          <Box
                            sx={{ color: "black", mr: 1 }}
                            onClick={() => updateCustomer(item)}
                          >
                            <EditIcon />
                          </Box>
                          <Box
                            sx={{ color: "red" }}
                            onClick={() => deleteCustomer(item._id)}
                          >
                            <DeleteIcon />
                          </Box>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <Snackbar
          open={open}
          autoHideDuration={5000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Alert onClose={handleClose} severity="info" sx={{ width: "100%" }}>
            {response === "add"
              ? "Customer added successfully"
              : response === "delete"
              ? "Customer delete successfully"
              : response === "update"
              ? "Customer update successfully"
              : null}
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
}

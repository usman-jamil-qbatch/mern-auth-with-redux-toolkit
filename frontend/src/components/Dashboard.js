import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/slices/authSlice";
import {
  getIntrests,
  createIntrest,
  deleteIntrest,
} from "../redux/slices/intrestSlice";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

export default function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [details, setDetails] = useState();

  const { intrests } = useSelector((state) => state.intrests);

  useEffect(() => {
    dispatch(getIntrests());
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setDetails(value);
  };

  const formSubmit = async (e) => {
    e.preventDefault();
    if (!details) {
      alert("Add intrest first");
      return;
    }
    dispatch(createIntrest(details));
  };

  const handleDelete = (intrest) => {
    dispatch(deleteIntrest(intrest));
  };
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "100vh" }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 360,
          maxHeight: 200,
          minHeight: 200,
          overflow: "auto",
          bgcolor: "background.paper",
        }}
      >
        <nav aria-label="main mailbox folders">
          <List>
            {intrests &&
              intrests.length > 0 &&
              intrests?.map((data, i) => (
                <ListItem
                  sx={{ border: 1, borderRadius: "8px" }}
                  key={i}
                  disablePadding
                >
                  <ListItemButton
                    key={i}
                    onClick={() => handleDelete(data.intrest)}
                  >
                    <ListItemText primary={data.intrest} />
                  </ListItemButton>
                </ListItem>
              ))}
          </List>
        </nav>
      </Box>
      <Box
        component="form"
        noValidate
        sx={{ mt: 1, width: "100%", maxWidth: 360 }}
      >
        <TextField
          onChange={handleChange}
          margin="normal"
          fullWidth
          id="intrests"
          label="Intrest"
          name="intrests"
          autoFocus
        />

        <Button
          type="submit"
          onClick={formSubmit}
          fullWidth
          variant="contained"
          sx={{ mt: 2, mb: 2 }}
        >
          Add
        </Button>
        <Grid container></Grid>
      </Box>
      <Button
        type="submit"
        onClick={handleLogout}
        variant="contained"
        sx={{ mt: 2, mb: 2 }}
      >
        Logout
      </Button>
    </Grid>
  );
}

import React from "react";
import axios from "axios";
import { useState } from "react";
import {
  Button,
  Typography,
  DialogTitle,
  ListItem,
  List,
  Dialog,
  TextField,
  Select,
  MenuItem,
  Input,
  Grid,
  ButtonGroup,
  FormControl,
  InputLabel,
} from "@mui/material";
export default function AddDialogComponent({
  Title,
  Description,
  RequestURL,
  SelectThings,
  RequestedFile,
  setGlobalVals,
}) {
  const [open, setOpen] = useState(false);
  const [descriptionVal, setDescriptionVal] = useState("");
  const [selectedVal, setsetSelectedVal] = useState("Select");
  const [file, setFile] = useState("");
  const [fileName, setFileName] = useState("No File Is Selected");
  let filedata;
  let data = {};

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };
  const handleDescription = (event) => {
    setDescriptionVal(event.target.value);
  };
  const handleChangeSelect = (event) => {
    setsetSelectedVal(event.target.value);
  };

  const handleFile = (event) => {
    setFile(event.target.files[0]);
    setFileName(event.target.files[0].name);
  };

  const handleSubmit = () => {
    if (RequestedFile) {
      filedata = new FormData();
      filedata.append("file", file);
      filedata.append("title", Title ? Title : "no Title");
      filedata.append(
        "description",
        descriptionVal ? descriptionVal : "no Description"
      );
      filedata.append(
        "selected",
        selectedVal ? selectedVal : "no Selected Value"
      );

      axios({
        method: "post",
        url: RequestURL,
        data: filedata,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then((response) => {
          console.log(response.status);
        })
        .then(
          setGlobalVals({
            title: Title,
            description: Description ? descriptionVal : "no Description",
            selected: SelectThings ? selectedVal : "No Selected Value",
          })
        )
        .then(setOpen(false))
        .then(setDescriptionVal(""))
        .then(setsetSelectedVal("Select"))
        .then(setFile(null));
    } else {
      Object.assign(
        data,
        { title: Title },
        Description && { description: descriptionVal },
        SelectThings && { selected: selectedVal }
      );

      console.log(JSON.stringify(data));
      axios({
        method: "post",
        url: RequestURL,
        data: data,
      })
        .then((response) => {
          console.log(response.status);
        })
        .then(setGlobalVals(data))
        .then(setOpen(false))
        .then(setDescriptionVal("unassigned"))
        .then(setsetSelectedVal("Select"));
    }
  };

  return (
    <div>
      <Button onClick={handleClickOpen}>{Title}</Button>

      <Dialog
        onClose={handleClose}
        open={open}
        fullWidth={true}
        style={{ margin: "5%" }}
      >
        <DialogTitle>{Title}</DialogTitle>
        <List>
          {Description ? (
            <ListItem>
              <Grid container spacing={3} style={{ marginBottom: "3%" }}>
                <Grid item xs={6}>
                  <Typography>{Description}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="standard-password-input"
                    autoComplete="current-password"
                    onChange={handleDescription}
                  />
                </Grid>
              </Grid>
            </ListItem>
          ) : null}
          {SelectThings ? (
            <Grid container spacing={3} style={{ marginBottom: "3%" }}>
              <Grid item xs={6}>
                <Typography>{SelectThings.description}</Typography>
              </Grid>
              <Grid item xs={6}>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel id="demo-simple-select-standard-label">
                    {/* label Of Select Box */}
                    {"Select"}
                  </InputLabel>
                  <Select
                    value={selectedVal}
                    onChange={handleChangeSelect}
                    input={<Input />}
                    autoWidth
                  >
                    {SelectThings.values.map((el) => (
                      <MenuItem value={el}>{el}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          ) : null}
          <>
            {RequestedFile ? (
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <Typography>{RequestedFile}</Typography>
                </Grid>
                <Grid item xs={3}>
                  <input type="file" onChange={handleFile} />
                </Grid>
              </Grid>
            ) : null}
          </>
        </List>
        <ButtonGroup
          variant="contained"
          aria-label="outlined primary button group"
          fullWidth={true}
        >
          <Button onClick={() => setOpen((open) => false)}>Return</Button>
          <Button onClick={handleSubmit} color="primary" autoFocus>
            Submit
          </Button>
        </ButtonGroup>
      </Dialog>
    </div>
  );
}

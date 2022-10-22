import { useState } from "react";
import Dialog from "./Dialog";
import { CardActions, Card, CardContent, Typography } from "@mui/material";
export default function App() {
  const [dialogValues, setDialogValues] = useState({});
  return (
    <Card
      sx={{ minWidth: 275 }}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "10%",
        marginLeft: "25%",
        marginRight: "25%",
        backgroundColor: "#10454F",
      }}
    >
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Latelly Submitted Customer's Info
        </Typography>
        <Typography variant="h5" component="div">
          Title: {dialogValues.title}
        </Typography>
        {dialogValues.description ? (
          <Typography variant="h6" component="div">
            Description: {dialogValues.description}
          </Typography>
        ) : null}
        {dialogValues.selected ? (
          <Typography variant="h6" component="div">
            Selected: {dialogValues.selected}
          </Typography>
        ) : null}
      </CardContent>
      <CardActions>
        <Dialog
          Title={"Add Customer"}
          Description={"Full Name"}
          SelectThings={{
            description: "Gender",
            values: ["Man", "Women", "Other"],
          }}
          RequestURL={"http://localhost:4000/"}
          RequestedFile={"Resume"}
          setGlobalVals={setDialogValues}
        />
      </CardActions>
    </Card>
  );
}

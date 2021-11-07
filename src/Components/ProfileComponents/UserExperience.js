import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import WorkIcon from "@mui/icons-material/Work";

export default function UserExperience(props) {

  function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [day, month, year].join('-');
}

  return (
    <Card
      id={props.id}
      sx={{ display: "flex", flexDirection: "row", paddingTop: "5px" }}
    >
      <CardHeader
        sx={{ flex: "5" }}
        avatar={
          <Avatar sx={{ bgcolor: "primary.dark" }} aria-label="Experience">
            <WorkIcon />
          </Avatar>
        }
        title={
          <Typography>
            <h4>
              {props.position} at {props.company}
            </h4>
            <p>
              From {formatDate(props.start_date)} till {formatDate(props.end_date)}
            </p>
          </Typography>
        }
      />
    </Card>
  );
}

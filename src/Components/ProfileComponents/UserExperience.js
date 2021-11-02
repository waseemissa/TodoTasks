import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import WorkIcon from "@mui/icons-material/Work";

export default function UserExperience(props) {
  return (
    <Card
      id={props.id}
      sx={{ display: "flex", flexDirection: "row", paddingTop: "5px" }}
    >
      <CardHeader
        sx={{ flex: "5" }}
        avatar={
          <Avatar sx={{ bgcolor: "primary.dark" }} aria-label="recipe">
            <WorkIcon />
          </Avatar>
        }
        title={
          <Typography>
            <p>
              {props.position} at {props.company}
            </p>
            <p>
              From {props.start_date} till {props.end_date}
            </p>
          </Typography>
        }
      />
    </Card>
  );
}

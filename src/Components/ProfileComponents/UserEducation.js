import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import StarIcon from "@mui/icons-material/Star";

export default function UserEducation(props) {
  return (
    <Card
      id={props.id}
      sx={{ display: "flex", flexDirection: "row", paddingTop: "5px" }}
    >
      <CardHeader
        sx={{ flex: "5" }}
        avatar={
          <Avatar sx={{ bgcolor: "primary.dark" }} aria-label="education">
            <StarIcon />
          </Avatar>
        }
        title={
          <Typography>
            <p>
              {props.degree} in {props.major}
            </p>
            <p>
              {props.university} ({props.year})
            </p>
          </Typography>
        }
      />
    </Card>
  );
}

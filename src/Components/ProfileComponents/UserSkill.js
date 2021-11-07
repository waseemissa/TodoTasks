import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import StarIcon from "@mui/icons-material/Star";

export default function UserSkill(props) {
  return (
    <Card
      id={props.id}
      sx={{ display: "flex", flexDirection: "row", paddingTop: "5px" }}
    >
      <CardHeader
        sx={{ flex: "5" }}
        avatar={
          <Avatar sx={{ bgcolor: "primary.dark" }} aria-label="Skill">
            <StarIcon />
          </Avatar>
        }
        title={
          <Typography>
            <h4>
            {props.title}
            </h4>
          </Typography>
        }
      />
    </Card>
  );
}

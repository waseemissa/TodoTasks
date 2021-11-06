import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";

export default function UserComment(props) {
  return (
    <Card
      id={props.id}
      sx={{ marginTop: "10px", fontFamily: "Roboto", fontSize: "15pt" }}
    >
      <CardHeader
        avatar={<Avatar aria-label="profile picture" src={props.picture}></Avatar>}
        title={
          <Typography
            style={{
              fontFamily: "Roboto",
              fontSize: "16pt",
              marginTop: "-35px",
            }}
          >
            {props.name}
          </Typography>
        }
      />
      <CardContent>
        <Typography
          style={{
            paddingLeft: "60px",
            marginTop: "-40px",
            fontFamily: "Roboto",
            fontSize: "12pt",
          }}
        >
          {props.text}
        </Typography>
      </CardContent>
    </Card>
  );
}

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions, Tooltip } from "@mui/material";

export default function MuiCard(props) {
  return (
    <Card sx={{ height: 300 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="170"
          image={"http://localhost:3000/" + props.img}
          alt={props.name}
        />
        <CardContent>
          <Tooltip title={props.name} arrow>
            <Typography gutterBottom variant="h5" noWrap component="div">
              {props.name}
            </Typography>
          </Tooltip>
        </CardContent>
      </CardActionArea>
      <CardActions>{props.children}</CardActions>
    </Card>
  );
}

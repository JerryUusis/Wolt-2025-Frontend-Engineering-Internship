import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";

function App() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100vw",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
      component={"form"}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "80%",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <Typography variant="h1">Delivery Order Price Calculator</Typography>
        <TextField label="Venue slug" />
        <TextField label="Cart value" />
        <TextField label="User latitude" />
        <TextField label="User longitude" />
        <Button>Get location</Button>
        <Button>Calculate delivery fee</Button>
        <Box sx={{ width: "100%" }}>
          <Typography variant="h2">Price Breakdown</Typography>
          <List>
            <ListItem secondaryAction={<span>0e</span>}>Cart value</ListItem>
            <ListItem secondaryAction={<span>0e</span>}>Delivery fee</ListItem>
            <ListItem secondaryAction={<span>0e</span>}>
              Delivery distance
            </ListItem>
            <ListItem secondaryAction={<span>0e</span>}>
              Small order surcharge
            </ListItem>
            <ListItem secondaryAction={<span>0e</span>}>Cart value</ListItem>
            <Divider />
            <ListItem secondaryAction={<span>0e</span>}>Total price</ListItem>
          </List>
        </Box>
      </Box>
    </Box>
  );
}

export default App;

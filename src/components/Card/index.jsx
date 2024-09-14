import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Icon from "@mui/material/Icon"; // Use qualquer ícone que você preferir

export const Card = ({ icon, title, value }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        backgroundColor: "white",
        borderRadius: "12px",
        padding: "16px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        width: "80%",
        height: "80%",
      
      }}
    >
      <Icon sx={{ fontSize: 40, marginRight: "16px" }}>{icon}</Icon>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          width: "100%",
        }}
      >
        <Typography variant="subtitle1" sx={{color:'#9F9F9F'}}>{title}</Typography>
        <Typography variant="h3" sx={{ fontWeight: "bold", fontSize:'32px'}}>
          {value}
        </Typography>
      </Box>
    </Box>
  );
};

export default Card;

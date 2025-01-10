import { Box, Button, Paper, Typography } from "@mui/material";
import PlayerCard from "./PlayerCard";
import { useSocketContext } from "../../providers/SocketProvider";
import { useUserContext } from "../../providers/UserProvider";

const Lobby = () => {
  const socket = useSocketContext();
  const { users } = useUserContext();
  const storedUserId = sessionStorage.getItem("userId");

  const handleChangeTeam = (team: number) => {
    socket.emit("changeTeam", { userId: storedUserId, team: team });
  };

  return (
    <Box
      className="Lobby"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 2,
      }}
    >
      <Paper sx={{ padding: 2, marginBottom: 2, textAlign: "center" }}>
        <Typography variant="h5" sx={{ marginBottom: 1 }}>
          Waiting for players... ({users?.length}/4)
        </Typography>
        <Typography variant="h6">Team Selection</Typography>
      </Paper>

      <Box sx={{ width: "100%", marginBottom: 2 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 2,
          }}
        >
          <Typography variant="h6" sx={{ marginBottom: 1 }}>
            Team 1
          </Typography>
          <Button variant="contained" onClick={() => handleChangeTeam(1)}>
            Join
          </Button>
        </Box>
        {users
          .filter((user) => user.team === 1)
          .map((user) => (
            <PlayerCard
              name={user.name}
              isUser={user.id == storedUserId}
              key={user.id}
            />
          ))}
      </Box>

      <Box sx={{ width: "100%", marginBottom: 2 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 2,
          }}
        >
          <Typography variant="h6">Team 2</Typography>
          <Button variant="contained" onClick={() => handleChangeTeam(2)}>
            Join
          </Button>
        </Box>
        {users
          .filter((user) => user.team === 2)
          .map((user) => (
            <PlayerCard
              name={user.name}
              isUser={user.id == storedUserId}
              key={user.id}
            />
          ))}
      </Box>
    </Box>
  );
};

export default Lobby;

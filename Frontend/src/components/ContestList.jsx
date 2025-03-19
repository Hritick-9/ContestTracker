import { useEffect, useState } from "react";
import { fetchAllContests } from "../api/contest";
import ContestCard from "./ContestCard";
import { Button, Container, Grid2, Typography } from "@mui/material";
import SpotlightCard from "./SpotlightCard";
import Particles from "./Particles";
import zIndex from "@mui/material/styles/zIndex";
const ContestList = () => {
  const [contests, setContests] = useState([]);

  useEffect(() => {
    const fetchContests = async () => {
      const contests = await fetchAllContests();
      setContests(contests);
    };
    fetchContests();
  }, []);

  return (
    <>
      <Typography variant="h4" color ="primary"sx={{
        marginTop: "100px",
        textAlign: "center",
        width: "100%",
        zIndex:2
      }}>
        Upcoming Contests
      </Typography>
      <Container maxWidth="xl" sx={{ mt: 4 }}>
        <Grid2 container spacing={3}>
          {contests.map((contest) => (
            <Grid2 item xs={12} sm={6} md={3} key={contest.name}>
              <SpotlightCard
                className="custom-spotlight-card"
                spotlightColor="rgba(0, 229, 255, 0.2)"
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: '20px'
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", marginBottom: "10px" }}
                >
                  {contest.name}
                </Typography>
                <Typography variant="body2" color="primary">
                  Platform: {contest.platform}
                </Typography>
                <Typography variant="body2" color="primary">
                  Start Time: {new Date(contest.startTime).toLocaleString()}
                </Typography>
                <Button
                  variant="contained"
                  sx={{ marginTop: "10px" }}
                  href={contest.url}
                  target="_blank"
                  color="black"
                >
                  View Contest
                </Button>
              </SpotlightCard>
            </Grid2>
          ))}
        </Grid2>
      </Container>
      
    </>
  );
};

export default ContestList;

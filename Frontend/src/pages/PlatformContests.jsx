import { useEffect, useState } from "react";
import { fetchContestsByPlatform } from "../api/contest";
import { useParams } from "react-router-dom";
import { Container, Typography, Grid, Grid2 } from "@mui/material";
import ContestCard from "../components/ContestCard";

const PlatformContests = () => {
    const { platform } = useParams();
    const [contests, setContests] = useState([]);

    useEffect(() => {
        const loadContests = async () => {
            const data = await fetchContestsByPlatform(platform);
            setContests(data);
        };
        loadContests();
    }, [platform]);

    return (
        <Container>
            <Typography variant="h4" sx={{ margin: "20px 0", textAlign: "center" }}>
                {platform} Contests
            </Typography>
            <Grid2 container spacing={3}>
                {contests.map((contest) => (
                    <Grid2 item xs={12} sm={6} md={4} key={contest._id}>
                        <ContestCard contest={contest} />
                    </Grid2>
                ))}
            </Grid2>
        </Container>
    );
};

export default PlatformContests;

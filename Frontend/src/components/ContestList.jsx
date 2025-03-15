import { useEffect,useState } from "react";
import { fetchAllContests } from "../api/contest";
import ContestCard from "./ContestCard";
import { Container, Grid2, Typography } from "@mui/material";




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
        <Container>
            <Typography variant="h4" sx={{ margin: "20px 0", textAlign: "center" }}>
                Upcoming Contests
            </Typography>
            <Grid2 container spacing={3}>
                {contests.map((contest) => (
                    <Grid2 item xs={12} sm={6} md={4} key={contest._id}>
                        <ContestCard contest={contest} />
                    </Grid2>
                ))}
            </Grid2>
        </Container>
    )};

export default ContestList;
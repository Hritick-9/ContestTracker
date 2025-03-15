import { Card, CardContent, Typography, Button } from "@mui/material";

const ContestCard = ({ contest }) => {
    return (
        <Card sx={{ background: "#f5f5f5", padding: "10px" }}>
            <CardContent>
                <Typography variant="h6">{contest.name}</Typography>
                <Typography variant="body2" color="textSecondary">
                    Platform: {contest.platform}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    Start Time: {new Date(contest.startTime).toLocaleString()}
                </Typography>
                <Button variant="contained" sx={{ marginTop: "10px" }} href={contest.url} target="_blank">
                    View Contest
                </Button>
            </CardContent>
        </Card>
    );
};

export default ContestCard;

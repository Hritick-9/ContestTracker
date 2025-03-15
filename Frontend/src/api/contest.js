import axios from "axios";
 

const API_BASE_URL = "http://localhost:3000/api/contests"; 


export const fetchAllContests = async () => {
    try {
        const response = await axios.get(API_BASE_URL);
        return response.data;
    } catch (error) {
        console.error("Error fetching contests:", error);
        return [];
    }
};

export const fetchContestsByPlatform = async (platform) => {
    try{
        const response = await axios.get(`${API_BASE_URL}/${platform}`);
        return response.data;
    }
    catch(error){
        console.error("Error fetching contests by platform:", error);
        return [];
    }
}
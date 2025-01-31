import axios from "axios";

const API_ROUTE = "/api/quiz"; 

export const fetchQuizData = async () => {
  try {
    const response = await axios.get(API_ROUTE);
    return response.data;
  } catch (error) {
    console.error("Error fetching quiz:", error);
    return null;
  }
};

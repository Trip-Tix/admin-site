// pages/api/getScheduleWiseBusDetails.js
import axios from 'axios';

const getScheduleWiseBusDetails = async (req, res) => {
  try {
    const response = await axios.get('https://triptix-backend.onrender.com/api/admin/getScheduleWiseBusDetails');
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response.status).json(error.response.data);
  }
};

export default getScheduleWiseBusDetails;
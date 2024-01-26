import axios from 'axios';

export const fetchIPDetails = async (ip = '') => {
  try {
    const response = await axios.get(`https://ipwho.is/${ip}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching IP details:', error);
    return null;
  }
};

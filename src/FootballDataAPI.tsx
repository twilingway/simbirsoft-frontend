// import axios from 'axios';
import config from 'config';

const conf = {
  headers: { 'X-Auth-Token': config.get('footballApiToken') },
};

export const getCompetition = async () => {
  try {
    // const response = await axios.get(
    //   'http://api.football-data.org/v2/competitions',
    //   conf
    // );
    // console.log('response :>> ', response);
    // return response.data.competitions;
  } catch (error) {}
};

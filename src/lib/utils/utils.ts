import axios, { AxiosResponse } from 'axios';
import { BSCSCAN_API_KEY } from '../constants';

const getPairAddress = (nameTokenOne: string, nameTokenTwo: string) => {
  /**
   * // TODO: query pairAddress from backend
   */
  if (nameTokenOne === 'ETH' && nameTokenTwo === 'BNB') {
    return '0x74E4716E431f45807DCF19f284c7aA99F18a4fbc' // return ETH/BNB for example
  } else if (nameTokenOne === 'BNB' && nameTokenTwo === 'BUSD') {
    return '0x58F876857a02D6762E0101bb5C46A8c1ED44Dc16' // return BNB/BUSD for example
  }
};

const getABI = async (address: string) => {
  let abi = null;
  /**
   * // TODO: query abi from backend
   */
  if (!abi) {
    const endpoint = `https://api.bscscan.com/api?module=contract&action=getabi&address=${address}&apikey=${BSCSCAN_API_KEY}`
    const response: AxiosResponse = await axios.get(endpoint);
    abi = JSON.parse(response.data.result);
  }
  return abi;
};

export { getPairAddress, getABI };

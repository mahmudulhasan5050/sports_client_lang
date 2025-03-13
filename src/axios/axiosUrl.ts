import axios from 'axios';
import { viteAPI } from '../config/config';


export const API = axios.create({
  baseURL: `${viteAPI}`,
  headers: {
    'Content-Type': 'application/json',
  },
});

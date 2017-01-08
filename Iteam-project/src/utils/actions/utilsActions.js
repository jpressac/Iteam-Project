import axios from 'axios'
import {UTILITIES} from '../../constants/HostConfiguration'

export function getProfessions() {
  return axios.get(UTILITIES.PROFESSIONS)
}

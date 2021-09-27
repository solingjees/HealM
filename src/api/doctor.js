import axios from '@/libs/request'
import qs from 'qs'

const HEADER = '/doctor'

export const updatePrescription = (data) => axios.post(HEADER + '/updatePrescription', data)

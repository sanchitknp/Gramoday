import express from 'express'
const router = express.Router()
import {getReport,createReport} from '../controllers/reportController.js'
 
router.route('/').post(createReport)
router.route('/').get(getReport)

export default router
import express from 'express';
import {GetData, SaveData,HomePage} from '../Controller/Fetch.js';
const router = express();
router.get('/',HomePage)
router.get('/data',GetData);
// router.get('/save',SaveData)

export default router;
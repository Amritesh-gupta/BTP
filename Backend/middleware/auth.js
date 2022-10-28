import jwt from 'jsonwebtoken';
import { User } from '../models/userModal.js';

export const auth = (req, res, next) => {
    try {
        const token = req.header('Authorization').replace("Bearer ", "");
        const decoded = jwt.verify(token, "btpProject");
        const user = User.findOne({ _id: decoded._id, 'tokens.token': token });

        if (!user) {
            throw new Error('');
        }
        req.user = user;
        next();
    }
    catch(err){
        res.send('Please authenticate');
    }
}

export const fileAuth = (req,res,next) =>{
    try {
        const token = req.query.token;
        const decoded = jwt.verify(token, "btpProject");
        const user = User.findOne({ _id: decoded._id, 'tokens.token': token });

        if (!user) {
            throw new Error('');
        }
        req.user = user;
        next();
    }
    catch(err){
        res.send('Please authenticate');
    }
}
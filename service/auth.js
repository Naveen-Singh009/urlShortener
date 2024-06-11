// const sessionIdToUserMap = new Map();

import jwt from 'jsonwebtoken';

const secret = "12121212";

function setUser(user) {
    return jwt.sign({
       _id: user._id,
       email: user.email ,
       role: user.role
    }, secret, { expiresIn: '1h' });
}

function getUser(token) {
    if (!token) return null;
    try {
        return jwt.verify(token, secret);
    } catch (error) {
        console.error('Token verification failed:', error.message);
        return null;
    }
}

export {
    setUser,
    getUser
}
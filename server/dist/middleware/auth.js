import jwt from 'jsonwebtoken';
export const authenticateToken = (req, res, next) => {
    // TODO: verify the token exists and add the user data to the request object
    const header = req.headers.authorization;
    if (header) {
        console.log(header);
        const token = header.split(' ')[1];
        jwt.verify(token, process.env.JWT_SECRET_KEY || '', (error, decoded) => {
            if (error) {
                return res.status(500);
            }
            req.user = decoded;
            return next();
        });
    }
    else {
        res.status(401);
    }
};

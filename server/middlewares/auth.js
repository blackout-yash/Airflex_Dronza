import errorHandler from '../utils/errorHandler.js'

export const isAuthenticated = (req, res, next) => {
    // console.log("auth1", req.session.user)
    // console.log("auth2", req.user)
    // console.log(req.isAuthenticated());
    const token = req.cookies['connect.sid'];
    if (!token) {
        return next(new errorHandler('Not logged in', 401))
    }
    next();
}

export const authorizeAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return next(new errorHandler('Only Admin Allowed', 405))
    }
    next()
}
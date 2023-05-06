import express from 'express'
import passport from 'passport'
import { myProfile, logout, getAdminUsers, getAdminStats, role } from '../controllers/user.js'
import { authorizeAdmin, isAuthenticated } from '../middlewares/auth.js'

const router = express.Router()

// router.get('/googlelogin', passport.authenticate('google', {
//     scope: ['profile']
// }))

router.get('/googlelogin', (req, res, next) => {
    console.log("first");
    res.cookie("connect.sid", "jdjjdjdl", {
        expires: new Date(Date.now() + 128986400),
        httpOnly: true,
        sameSite: 'none',
        secure: true
    });
    next();
})

router.get('/login',
    passport.authenticate('google', {
        successRedirect: "http://localhost:3000"
    })
)

router.get('/me', isAuthenticated, myProfile)
router.get('/logout', logout)

router.get('/admin/users', isAuthenticated, authorizeAdmin, getAdminUsers)
router.get('/admin/stats', isAuthenticated, authorizeAdmin, getAdminStats)
router.get('/admin/role/:id', isAuthenticated, authorizeAdmin, role)

export default router 
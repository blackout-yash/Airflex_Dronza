import express from 'express'
import passport from 'passport'
import { myProfile, logout, getAdminUsers, getAdminStats, role } from '../controllers/user.js'
import { authorizeAdmin, isAuthenticated } from '../middlewares/auth.js'

const router = express.Router()

// router.get('/googlelogin', passport.authenticate('google', {
//     scope: ['profile']
// }))

router.get('/googlelogin', (req, res, next) => {
    res.cookie("connect.sid", "jdjjdjdl", {
        expires: new Date(Date.now() + 128986400),
        httpOnly: true,
        sameSite: 'none',
        secure: true
    });
    next();
})

router.get('/me', isAuthenticated)
router.get('/logout', logout)

// router.get('/login',
//     passport.authenticate('google', {
//         successRedirect: "http://localhost:3000"
//     })
// )

// router.get("/me", (req, res) => {
//     const token = req.cookies['connect.sid'];
//     if (!token) {
//         res.status(401).json({
//             success: false,
//             message: 'Not logged in'
//         })
//     } else {
//         res.json({
//             token: token,
//             message: token
//         })
//     }
// })

// router.get("/logout", (req, res) => {
//     res.clearCookie('connect.sid');
//     res.json({
//         message: "logout"
//     })
// })

// router.get('/me', isAuthenticated, myProfile)
// router.get('/logout', logout)

// router.get('/admin/users', isAuthenticated, authorizeAdmin, getAdminUsers)
// router.get('/admin/stats', isAuthenticated, authorizeAdmin, getAdminStats)
// router.get('/admin/role/:id', isAuthenticated, authorizeAdmin, role)

export default router 
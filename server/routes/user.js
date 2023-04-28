import express from 'express'
import passport from 'passport'
import { myProfile, logout, getAdminUsers, getAdminStats, role } from '../controllers/user.js'
import { authorizeAdmin, isAuthenticated } from '../middlewares/auth.js'

const router = express.Router()

router.get('/googlelogin', passport.authenticate('google', {
    scope: ['profile']
}))

router.get('/login',
    passport.authenticate('google', {
        successRedirect: "http://localhost:3000"
    })
    // , (req, res) => {
    //     res.redirect(process.env.FRONTEND_URL);
    //     // res.redirect("http://localhost:4000/api/me");
    // }
)

router.get('/me', isAuthenticated, myProfile)
router.get('/logout', logout)

router.get('/admin/users', isAuthenticated, authorizeAdmin, getAdminUsers)
router.get('/admin/stats', isAuthenticated, authorizeAdmin, getAdminStats)
router.get('/admin/role/:id', isAuthenticated, authorizeAdmin, role)

export default router 
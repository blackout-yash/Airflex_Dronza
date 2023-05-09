import express from 'express'
import passport from 'passport'
import { myProfile, logout, getAdminUsers, getAdminStats, role } from '../controllers/user.js'
import { authorizeAdmin, isAuthenticated } from '../middlewares/auth.js'

const router = express.Router()

router.get('/googlelogin', passport.authenticate('google', { scope: ['profile'] }));

router.get('/login',
    passport.authenticate('google', {
        failureRedirect: 'http://localhost:4000',
        session: true
    }), (req, res) => {
        return res.redirect('http://localhost:3000');
    });


// router.get('/googlelogin', passport.authenticate('google', {
//     scope: ['profile']
// }))

// router.get('/login',
//     passport.authenticate('google', {
//         // successRedirect: "/api/profile"
//         session: true
//     }), (req, res) => {
//         req.session.save(function (err) {
//             if (err) {
//                 res.json({
//                     error: err
//                 })
//             } else {
//                 res.redirect('/api/profile');
//             }
//         });
//     }
// )

// router.get('/profile', (req, res, next) => {
//     const user = req.user;
//     // res.json({
//     //     mess: user
//     // })
//     req.session.user = user;
//     console.log(user);
//     console.log(req.session.user)
//     // next();
//     res.redirect("http://localhost:3000");
// });

router.get('/me', passport.authenticate('google'), isAuthenticated, myProfile);

router.get('/logout', logout)

router.get('/admin/users', isAuthenticated, authorizeAdmin, getAdminUsers)
router.get('/admin/stats', isAuthenticated, authorizeAdmin, getAdminStats)
router.get('/admin/role/:id', isAuthenticated, authorizeAdmin, role)

export default router 
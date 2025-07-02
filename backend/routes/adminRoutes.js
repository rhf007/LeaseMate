const express = require('express');
const {
    getPendingVerifications,
    approveVerification,
    rejectVerification,
    toggleBlockUser,
    getAllUsers
} = require('../controllers/adminController');

const { protect } = require('../middlewares/auth');
const { isAdmin } = require('../middlewares/admin');

const router = express.Router();

router.use(protect, isAdmin);

router.get('/verifications', getPendingVerifications);
router.patch('/verify/:userId/approve', approveVerification);
router.patch('/verify/:userId/reject', rejectVerification);

router.patch('/users/:userId/block', toggleBlockUser);
router.get('/users', getAllUsers);

module.exports = router;

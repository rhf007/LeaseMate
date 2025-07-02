const User = require('../models/user.model');

// Get all pending verifications
const getPendingVerifications = async (req, res) => {
    const users = await User.find({ 'verificationStatus.status': 'pending' })
        .select('name email phone verificationStatus role');
    res.json(users);
};

// Approve user verification
const approveVerification = async (req, res) => {
    const user = await User.findById(req.params.userId);

    if (!user) return res.status(404).json({ message: 'User not found' });

    user.verificationStatus.status = 'approved';
    user.verificationStatus.idVerified = true;
    user.verificationStatus.faceMatched = true;

    await user.save();
    res.json({ message: 'Verification approved' });
};

// Reject user verification
const rejectVerification = async (req, res) => {
    const user = await User.findById(req.params.userId);

    if (!user) return res.status(404).json({ message: 'User not found' });

    user.verificationStatus.status = 'rejected';
    user.verificationStatus.idVerified = false;
    user.verificationStatus.faceMatched = false;

    await user.save();
    res.json({ message: 'Verification rejected' });
};

// Block/Unblock user
const toggleBlockUser = async (req, res) => {
    const user = await User.findById(req.params.userId);

    if (!user) return res.status(404).json({ message: 'User not found' });

    user.isBlocked = !user.isBlocked;
    await user.save();

    res.json({
        message: user.isBlocked ? 'User blocked' : 'User unblocked'
    });
};

// Get all users
const getAllUsers = async (req, res) => {
    const users = await User.find().select('-password');
    res.json(users);
};

module.exports = {
    getPendingVerifications,
    approveVerification,
    rejectVerification,
    toggleBlockUser,
    getAllUsers
};
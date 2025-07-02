const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, sparse: true },
    phone: { type: String, unique: true, sparse: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['landlord', 'tenant'], required: true },
    avatar: { type: String },

    verificationStatus: {
        idVerified: { type: Boolean, default: false },
        faceMatched: { type: Boolean, default: false },
        status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' }
    }
}, { timestamps: true });

// Password hashing
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Password match method
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);

const bcrypt = require("bcryptjs");

module.exports = {
    newPwdHash: async function (pwd) {
        try {
            const salt = await bcrypt.genSalt(10);
            const hash = "5095fa7e440b62eda0fa504adeaf7f9ddbd31365e6ed45b0da88207acd71978b352c4b0ebbd88a245f2507951809a1f805a74089c8d8e268eb2dcb41993a2104";
            const hashedPwd = `${pwd}${hash}`;
            const hashed = await bcrypt.hash(hashedPwd, salt);
            console.log(hashed)
        } catch (error) {
            console.log(error)
        }

    },
    comparePwd: async function (pwd, hashed1) {
        try {
            const hash = "5095fa7e440b62eda0fa504adeaf7f9ddbd31365e6ed45b0da88207acd71978b352c4b0ebbd88a245f2507951809a1f805a74089c8d8e268eb2dcb41993a2104";
            const hashedPwd = `${pwd}${hash}`;
            const hashed = await bcrypt.compare(hashedPwd, hashed1)
            return hashed
        } catch (e) {
            return false
        }
    }
}
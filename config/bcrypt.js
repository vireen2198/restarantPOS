const bcrypt=require("bcryptjs");
const newPwdHash=async (pwd)=>{
    try {
        const salt=await bcrypt.genSalt(10);
        const hash="5095fa7e440b62eda0fa504adeaf7f9ddbd31365e6ed45b0da88207acd71978b352c4b0ebbd88a245f2507951809a1f805a74089c8d8e268eb2dcb41993a2104";
        const hashedPwd=`${pwd}${hash}`;
        const hashed=await bcrypt.hash(hashedPwd,salt);
        console.log(hashed)
    } catch (error) {
        console.log(error)
    }

}
const comparePwd=async (pwd)=>{
    try{
        const hash="5095fa7e440b62eda0fa504adeaf7f9ddbd31365e6ed45b0da88207acd71978b352c4b0ebbd88a245f2507951809a1f805a74089c8d8e268eb2dcb41993a2104";
        const hashedPwd=`${pwd}${hash}`;
        const hashed=await bcrypt.compare(hashedPwd,"$2a$10$8EsqBr4dF5LCZvdJHwomZeP4/3F/anunwuh.cMYBAEz//CV/cN9by")
        console.log(hashed)
    }catch(e){
        console.log(e)
    }
}

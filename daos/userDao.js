const User=require("../models/User");
const Company=require("../models/Company");
const util=require("../Util")
const sendUser=async (params)=>{
    try {

        const user=await User.findOne({_id:params}).select("-password");
        if(!user)throw new Error("unauthorised")
        const company=await Company.find().select("-_id")
        if(!company[0])throw new Error("company profile error !!! please contact our maintanance team")
        const {businessEmail,companyName,mobileNumber,address,tax,serviceCharges}=company[0];
        const {username,email,password,userMobileNumber,isAdmin}=user
        return {businessEmail,companyName,mobileNumber,address,tax,serviceCharges,username,email,password,userMobileNumber,isAdmin};
    } catch (error) {
        throw new Error(error);
    }
}
const sendAllUser=async (params)=>{
    try {
        const user=await User.find().select("-password");
        return user;
    } catch (error) {
        throw new Error(error);
    }
}
const userSettings=async(params)=>{
    try {
        const {user,business}=params;
        if(user){
            const {username,email,userMobileNumber}=user
            return await User.findOneAndUpdate({_id:params._id},{username,email,userMobileNumber},{runValidators:true})
        }
        if(business){
            const {companyName,tax,serviceCharges,mobileNumber,businessEmail,address:businessAddress}=business;
            const data=await sendUser(params._id);
            console.log(data)
            if(!data)throw new Error("access restricted")
            if(!data.isAdmin)throw new Error("access restricted");
            const companyData=await Company.find({})
            return await Company.findOneAndUpdate({_id:companyData[0]._id},{companyName,tax,serviceCharges,mobileNumber,businessEmail,address:businessAddress},{runValidators:true})
        }
    } catch (error) {
        throw new Error(error.message)
    }
}
const deleteWorker=async(params)=>{
    try {
        const {deleteWorker,_id}=params;

        if(!deleteWorker||!_id||String(deleteWorker)===String(_id))throw new Error("invalid parameters");
        const {isAdmin}=await sendUser(_id);
        if(!isAdmin)throw new Error("unauthorized!! admin permission required");
        await User.findOneAndDelete({_id:deleteWorker});
        return
    } catch (error) {
        throw new Error(error.message)
    }
}
const addNewWorker =async(params)=>{
    try {
        const user=await User.findOne({_id:params.userId});
        if(!user)throw new Error("unauthorized");
        if(!user.isAdmin)throw new Error("you do not have enough permission!!! please contact admin for assistance");
        const newUser={
            username:params.username,
            password:params.password,
            email:params.email
        }
        if(params.isAdmin.toLowerCase().match(/true/)){
            newUser.isAdmin=true
        }
        await User.create(newUser)
        return
    } catch (error) {
        if(error.message.toLowerCase().includes("e11000")){
            const {username,email}=error.keyValue;
            if(username)throw new Error(`username already in use`);
            if(email)throw new Error(`email already in use`)
        }
        throw new Error(error.message)
    }
}
const userPhoneNumber=async(params)=>{
    try {
        const user=await sendUser(params.userId);
        if(user.userMobileNumber===params.phoneNumber.split("").splice(2).join(""))throw new Error("your account is already registered with this phone number")
        await util.twilioSendSms(params.phoneNumber);
    } catch (error) {
        throw new Error (error.message)
    }
}
const verifyUserPhoneNumber=async(params)=>{
    try {
        const data=await util.twilioVerifyPhoneNumber(params);
        let newPhoneNumber=params.phoneNumber;
        newPhoneNumber=newPhoneNumber.split("").splice(2).join("")
        await User.findOneAndUpdate({_id:params.userId},{userMobileNumber:newPhoneNumber})
        return 
    } catch (error) {
        throw new Error (error.message)
    }
}
module.exports={
    sendUser,sendAllUser,userSettings,deleteWorker,addNewWorker,userPhoneNumber,verifyUserPhoneNumber
}
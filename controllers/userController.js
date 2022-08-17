// const bcrypt=require("../config/bcrypt");
let User=require("../models/User");
let Company=require("../models/Company")
const userService=require("../services/userService")
module.exports = {
  async sendUser(req, res) {
    try {

      const data=await userService.sendUser(req.user._id);
      return res
        .status(200)
        .json({user:data , message: "user retrieved successfully" });
    } catch (error) {
      return res.status(500).json({
        error,
        message: "something went wrong!!! please try again later",
      });
    }
  },
  async sendAllUser(req, res) {
    try {

      const users=await userService.sendAllUser();
      return res
        .status(200)
        .json({ users, message: "user retrieved successfully" });
    } catch (error) {
      return res.status(500).json({
        error,
        message: "something went wrong!!! please try again later",
      });
    }
  },
  // async registerUser(req, res) {
  //   try {
  //     const user=await User.create(req.body);

  //     return res
  //       .status(200)
  //       .json({ user, message: "user registered successfully" });
  //   } catch (error) {
  //     return res.status(500).json({
  //       error,
  //       message: "something went wrong!!! please try again later",
  //     });
  //   }
  // },
  // async registerBusiness(req, res) {
  //   try {
  //     const user=await Company.create(req.body);

  //     return res
  //       .status(200)
  //       .json({ user, message: "business registered successfully" });
  //   } catch (error) {
  //     return res.status(500).json({
  //       error,
  //       message: "something went wrong!!! please try again later",
  //     });
  //   }
  // },

  async userSettings(req,res){
    try {
      const data=await userService.userSettings({...req.body,_id:req.user._id})
      return res
      .status(200)
      .json({message: "successfully updated user" });
    } catch (error) {
      return res.status(500).json({e:true,message:error.message})
    }
  },
  async deleteWorker(req,res){
    try {
      const data=await userService.deleteWorker({...req.params,_id:req.user._id})
      return res
      .status(200)
      .json({message: "successfully deleted user" });
    } catch (error) {
      return res.status(500).json({e:true,message:error.message})
    }
  },
  async addNewWorker(req,res){
    try {
      const data = await userService.addNewWorker({...req.body,userId:req.user._id})
      return res
      .status(200)
      .json({message: "successfully added user" });
    } catch (error) {
      return res.status(500).json({e:true,message:error.message})
    }
  },
  async userPhoneNumber(req,res){
    try {
      const data = await userService.userPhoneNumber({...req.body,userId:req.user._id})
      return res
      .status(200)
      .json({data,message: "successfully sent TAC code" });
    } catch (error) {
      return res.status(500).json({e:true,message:error.message})
    }
  },
  async verifyUserPhoneNumber(req,res){
    try {
      await userService.verifyUserPhoneNumber({...req.body,userId:req.user._id})
      return res
      .status(200)
      .json({message: "successfully added phone number" });
    } catch (error) {
      return res.status(500).json({e:true,message:error.message})
    }
  }
}

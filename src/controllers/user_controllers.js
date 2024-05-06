const User = require("../model/user_model");
const {
  respo,
  hashPassword,
  comparePassword,
  createToken,
  verifyToken,
} = require("../utils/utils");

exports.createUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error("please fill the details");
    }
    const data = await User.findOne({ email });
    if (data) {
      throw new Error("user already");
    }
    const user = await User.create({ email, password });
    if (!user) {
      throw new Error("user not found");
    }
    const hash = await hashPassword(password);
    user.password = hash;
    await user.save();
    respo(res, 200, "created sucessfully", user);
    console.log(user.password);
  } catch (error) {
    respo(res, 500, error.message, error);
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error("please fill the details");
    }
    const data = await User.findOne({ email });
    console.log(data);
    if (!data) {
      throw new Error("email not found");
    }
    console.log(data.password);
    const equal = await comparePassword(password, data.password);
    console.log(equal);
    if (!equal) {
      throw new Error("invaild cred");
    }
    const token = await createToken(data._id);
    if (!token) {
      throw new Error("token not generate");
    }
    respo(res, 200, "login sucessfully", { data, token });
  } catch (error) {
    respo(res, 500, error?.message, error);
  }
};

exports.updatePassword = async (req, res) => {
  try {
    const { oldpassword, password } = req.body;
    if (!oldpassword || !password) {
      throw new Error("please fill the details");
    }
    const equal = await comparePassword(oldpassword, req.user.password);
    if (!equal) {
      throw new Error("old password not match");
    }
    const hash = await hashPassword(password);
    req.user.password = hash;
    await req.user.save();
    respo(res, 200, "password updated sucessfully", req.user);
  } catch (error) {
    respo(res, 500, error.message, {});
  }
};

exports.forgetPassword = async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) {
      throw new Error("please fill the details");
    }
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("user not found");
    }
    const token = await createToken(user._id);
    if (!token) {
      throw new Error("token not found");
    }
    respo(res, 200, "token generaed sucessfully", { token });
  } catch (error) {
    respo(res, 500, error.message, {});
  }
};

exports.validatePassword = async (req, res) => {
  try {
    const { token, password } = req.query;
    if (!token) {
      throw new Error("token not found");
    }
    const verify = await verifyToken(token, process.env.SECRET);
    if (!verify) {
      throw new Error("token not match");
    }
    const id = verify.id;
    const validatetime = Number(verify.iet + 2 * 60 * 1000);
    console.log(validatetime, Date.now());
    const limittime = Number(Date.now());
    console.log(validatetime > limittime);
    if (!(validatetime > limittime)) {
      throw new Error("request timeout");
    }

    if (!id) {
      throw new Error("no id found in token");
    }
    const user = await User.findById(id);
    if (!user) {
      throw new Error("user not found");
    }
    const hash = await hashPassword(password);
    user.password = hash;
    await user.save();
    respo(res, 200, "validation and passwort set sucessfully", user);
  } catch (error) {
    respo(res, 500, error.message, {});
  }
};

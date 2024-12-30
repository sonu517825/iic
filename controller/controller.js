const Schema = require("../schema/schema");
const s3 = require("../aws/s3");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const data = await Schema.findOne({ email, password });
    if (!data) {
      return res.status(404).send("Not found");
    }
    const token = jwt.sign({ email, id: data._id }, "abc");
    const resp = {
      token,
      user: {
        id: data._id,
        email,
        name: `${data?.name?.firstName} ${data?.name?.lastName}`,
      },
    };

    return res.status(200).json(resp);
  } catch (error) {
    return res.status(500).send(error);
  }
};
const postSubmissions = async (req, res) => {
  try {
    const { name, email, password, age, post, description } = req.body;
    const { firstName, lastName } = JSON.parse(name);

    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !age ||
      !post ||
      !description
    ) {
      return res.status(400).send("Provide required details");
    }

    const data = await Schema.findOne({ email });
    if (data) {
      return res.status(400).send("Provide required unique email");
    }

    const allowedPost = [
      "backend",
      "frontend",
      "testing",
      "development",
      "deployment",
    ];

    if (!allowedPost.includes(post)) {
      return res.status(400).send("Provide provide valid post");
    }

    const save = await Schema.create({
      name: {
        firstName,
        lastName,
      },
      email,
      password,
      age,
      post,
      description,
    });

    const resp = {
      message: "Submission created successfully",
      submissionId: save._id,
    };

    return res.status(201).json(resp);
  } catch (error) {
    return res.status(500).send(error);
  }
};
const getSubmissions = async (req, res) => {
  try {
  

    const { search, post } = req.query;
    const data = await Schema.aggregate([{
        $project:{
            id:"$_id",
            name:"$name",
            email:"$email",
            age:"$age",
            post:"$post",
            description:"$description",
            createdAt:"$createdAt",
            _id:0
        }
    }]);
    const resp = {
      total: data.length,
      skip: 0,
      limit: 0,
      submissions: data,
    };

    return res.status(200).json(resp);
  } catch (error) {
    return res.status(500).send(error);
  }
};
const updateSubmissions = async (req, res) => {
  try {
    const { name, email, age, post, description } = req.body;
    const { firstName, lastName } = JSON.parse(name);
    const { id } = req.params;

    const allowedPost = [
      "backend",
      "frontend",
      "testing",
      "development",
      "deployment",
    ];

    if (post && !allowedPost.includes(post)) {
      return res.status(400).send("Provide provide valid post");
    }

    const payload = {
      name: {
        firstName,
        lastName,
      },
      email,
      age,
      post,
      description,
    };

    await Schema.findByIdAndUpdate(
      { _id: id },
      { $set: payload },
      { new: true }
    );

    const resp = {
      message: "Submission updated successfully",
    };

    return res.status(200).json(resp);
  } catch (error) {
    return res.status(500).send(error);
  }
};
const deleteSubmissions = async (req, res) => {
  try {
    const { id } = req.params;

    await Schema.findByIdAndDelete({ _id: id });

    return res.status(200).json({
      message: "Submission deleted successfully",
    });
  } catch (error) {
    return res.status(500).send(error);
  }
};

module.exports = {
  login,
  postSubmissions,
  getSubmissions,
  updateSubmissions,
  deleteSubmissions,
};
// middleware

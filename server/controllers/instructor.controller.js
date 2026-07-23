const Instructor = require("../models/Instructor");
const createInstructor = async (req, res) => {
    try {

    const instructor = await Instructor.create(req.body);

    res.status(201).json({
        success: true,
        message: "Instructor created successfully",
        data: instructor,
    });
    } catch (error){
      res.status(400).json({
      success: false,
      message: error.message,
    }); 

    }

};
module.exports = {
    createInstructor,
};
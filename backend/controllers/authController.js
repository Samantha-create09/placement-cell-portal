const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


exports.register = async (req, res) => {
    
        const { name, email, password, role } = req.body;
        try {
            if (role === "admin") {
                return res.status(403).json({
                  message: "Admin registration not allowed"
                });
              }  

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        const hashedPassword =
            await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role,
        });
        const Student =
require("../models/Student");

const Company =
require("../models/Company");

if(role === "student"){

    await Student.create({
      userId:user._id,
      name,
      email
    });
  
  }
  
  if(role === "company"){
  
    await Company.create({
  
      userId:user._id,
  
      companyName:
        req.body.companyName || name,
  
      industry:
        req.body.industry || "",
  
      location:
        req.body.location || "",
  
      website:
        req.body.website || "",

    
  companyDocument:

  req.file

  ?

  `/uploads/company-documents/${req.file.filename}`

  :

  ""
  
    });
  
  }
        res.status(201).json({
            message: "User Registered",
            user
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

exports.login = async (req, res) => {
    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "User not found"
            });
        }

        if (
            user.role !== "admin" &&
            !user.isVerified
          ) {
          
            return res.status(403).json({
              message:
                "Your account is awaiting admin approval."
            });
          
          }

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        console.log("PASSWORD MATCH:", isMatch);

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid Password"
            });
        }

        const token = jwt.sign(
            {
                id: user._id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        res.status(200).json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {

        console.log("LOGIN ERROR:");
        console.log(error);
    
        res.status(500).json({
            message: error.message
        });
    }
};
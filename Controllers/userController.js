const users = require('../Models/UserModel');
const notes = require('../Models/NotesModel');
const { createToken, verifyToken } = require('../Utils/jwtVerifyToken');
const {hashPassword} = require('../Utils/hashPassword');
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);


const createUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const exists = await users.findOne({ email });
        if (!exists) {
            await users.create({
                name,
                email,
                password: await hashPassword(password)
            }
            )

            res.json({
                message: 'user created successfully'
            })
        } else {
            const err = new Error('user Already exists')
            next(err);
        }
    } catch (err) {
        next(err);
    }
}

const deleteUser = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const Currentuser = await users.findById(userId);

        if (!Currentuser) {
            const err = new Error('user not exists');
            next(err);
        }

        await users.findByIdAndDelete(userId);
        const note = await notes.find({ 'user._id': userId })
        if (note) {
            // Assuming 'note' is an array, you might want to loop through the notes and delete them individually
            for (const n of note) {
                await notes.findByIdAndDelete(n._id); // Assuming 'n._id' is the note's ObjectId
            }
        }
        res.json({
            message: 'user Deleted Successfully'
        })


    } catch (err) {
        next(err);
    }
}

const getUsers = async (req, res, next) => {
    try {
        const user = await users.find();
        if (!user) {
            const err = new Error('user not exists');
            next(err);
        }

        res.json({
            message: { user }
        })

    } catch (err) {
        next(err);
    }

}

const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!(email && password)) {
            const err = new Error("All fields required");
            return next(err);
        }
        const user = await users.findOne({ email })
        console.log(user)
        const verifyPass = bcrypt.compareSync(password, user.password);
        console.log(verifyPass);
        if (user && verifyPass) {
            const Token = createToken(user._id, user.name);
            res.json({
                message: 'Logged in successfully',
                token: Token
            })
        } else {
            const err = new Error("invalid Credentials");
            next(err);
        }
    } catch (err) {
        next(err);
    }
}

const getUser = async (req, res, next) => {
    try {
        const token = req.headers.token;
        const data = verifyToken(token);
        if (!token || !data) {
            const err = new Error('Login required');
            return next(err);
        }
        const user = await users.findById(data._id);

        res.json({
            message: 'User data fetched successfully',
            user: user
        })
    } catch (err) {
        next(err);
    }
}

const updateUserNotes = async (req, res, next) => {
    const NoteId = req.params.id;
    try {
        const Note = await notes.findById(NoteId);
        const userId = Note.user._id;
        if (userId) {
            const user = await users.findById(userId);
            user.notes.push(NoteId);
            await user.save();
            res.json({
                message: "Note added to user"
            })
        } else {
            next(err);
        }
    } catch (err) {
        next(err);
    }
}

const updateUser = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const userData = req.body;
        const user = await users.findById(userId)
       

        if (!user) {
            const err = new Error("user not exists")
            next(err);
        }
        else if(userData.name === '' || userData.password === ' '){
            const err = new Error("All fields required")
            next(err);
        }
        else {
            if(userData.password){
                const HashPassword = await  bcrypt.hash(userData.password, salt);
            
            user.name = userData.name || user.name,
            user.password = HashPassword|| user.password
        }

            await user.save();

            res.json({
                message: "user updated successfully, you need to login again",
                user: user
            })
        }

    } catch (err) {
        next(err);
    }
}



module.exports = {
    createUser, deleteUser, getUsers, loginUser, getUser, updateUserNotes, updateUser
}
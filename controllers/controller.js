const userDb = require('../models/model');
const paginationHelper = require('../utils/paginationHelper');

exports.addUser = async (req, res) => {
    try {
        const { name, email, gender, mobile, status } = req.body;
        const user = await userDb.create({
            name: name,
            email: email,
            gender: gender,
            status: status,
            mobile: mobile
        });
        res.send({ message: "success", data: user })

    } catch (error) {
        console.log(error);
        res.send({ message: "failed", error: error })
    }
}

exports.fetchUser = async (req, res) => {
    try {
        const { id } = req.query;
        const user = await userDb.findById(id)
        res.send({ message: "success", data: user })

    } catch (error) {
        console.log(error);
        res.send({ message: "failed", error: error })
    }
}

exports.fetchUsers = async (req, res) => {
    try {
        const { pageNo, pageSIze } = req.query;
        const { limit, offset } = paginationHelper.getLimitAndOffset(pageNo, pageSIze)
        const user = await userDb.find().limit(limit).skip(offset)
        const count = await userDb.countDocuments();
        const pagination = await paginationHelper.pagination(pageNo, pageSIze, count)
        res.send({ message: "success", data: { user: user, pagination: pagination } })
    } catch (error) {
        console.log(error);
        res.send({ message: "failed", error: error })
    }
}

exports.updateUser = async (req, res) => {
    try {
        const { id, name, email, gender, status, mobile } = req.body;
        const user = await userDb.findByIdAndUpdate(id, {
            name: name,
            email: email,
            gender: gender,
            status: status,
            mobile: mobile
        });
        const updated = await userDb.findById(user.id)
        res.send({ message: "success", data: updated })
    } catch (error) {
        console.log(error);
        res.send({ message: "failed", error: error })
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.query;
        const user = await userDb.findByIdAndDelete(id)
        res.send({ message: "success", data: user })

    } catch (error) {
        console.log(error);
        res.send({ message: "failed", error: error })
    }
}
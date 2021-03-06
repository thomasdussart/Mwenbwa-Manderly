/* eslint-disable no-sync */
const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

import {addFirstLeaves} from "./user.controller";
import {addFirstTrees} from "./tree.controller";

exports.signup = (req, res) => {
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        color: req.body.color,
        leaves: 0,
    });

    user.save((err, resp) => {
        if (err) {
            res.status(500).send({message: err});
            return;
        }

        addFirstLeaves(resp);
        addFirstTrees(resp);
        addFirstTrees(resp);
        addFirstTrees(resp);

        res.send({message: "User was registered successfully!"});
    });
};

exports.signin = (req, res) => {
    User.findOne({
        email: req.body.email,
    }).exec((err, user) => {
        if (err) {
            res.status(500).send({message: err});
            return;
        }

        if (!user) {
            res.status(404).send({message: "User Not found."});
            return;
        }

        const passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password,
        );

        if (!passwordIsValid) {
            res.status(401).send({
                accessToken: null,
                message: "Invalid Password!",
            });
            return;
        }

        const token = jwt.sign({id: user.id}, config.secret, {
            expiresIn: 86400, // 24 hours
        });

        res.status(200).send({
            _id: user._id,
            username: user.username,
            email: user.email,
            color: user.color,
            leaves: user.leaves,
            accessToken: token,
        });
    });
};

// USER PROFILE

exports.resetPassword = req => {
    // eslint-disable-next-line consistent-return
    User.findById(req.body.id, (err, doc) => {
        if (err) {
            return false;
        }
        doc.password = bcrypt.hashSync(req.body.password, 8);
        doc.save();
    });
};

exports.deleteUser = req => {
    // eslint-disable-next-line consistent-return
    User.findByIdAndRemove(req.body.id, err => {
        if (err) {
            return false;
        }
    });
};

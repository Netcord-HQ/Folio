const mongoose = require('mongoose');
const config = require("../../config.json");
const chalk = require("chalk");

mongoose.connect(config.mongooseUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => { console.log(chalk.bold.greenBright("Connected to database")); })
    .catch(error => { console.error(chalk.bold.redBright(error)); });

const Schema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: false
    },
    occupation: {
        type: String,
        required: true,
        default: "No occupation"
    },
    description: {
        type: String,
        required: true,
        default: "null"
    },
    theme: {
        type: String,
        required: true,
        default: "midnight"
    },
    likes: {
        type: Array,
        required: true,
        default: []
    },
    links: {
        type: Array,
        required: false,
        default: []
    },
    projects: {
        type: Array,
        required: false,
        default: []
    },
    images: {
        type: Array,
        required: false,
        default: []
    },
    lastEdit: {
        type: String,
        required: true,
        default: Date.now()
    },
    premiumUsers: {
        type: Array,
        required: true,
        default: []
    },
    verifiedUsers: {
        type: Array,
        required: true,
        default: []
    },
}, { timestamps: true });

const database = mongoose.model('Data', Schema);

module.exports = database;
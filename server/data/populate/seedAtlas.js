import fs from "fs"
import "dotenv/config"
import connection from "../../database/mongodbConnection.mjs"
import ROLES from "../presets/ROLES.mjs"
import Account from "../../model/account.mjs"
const populateData = fs.readFileSync("./populateData.json")

connection

;(async(data) => {
    //TODO: AUTOFILLING/DATA STUFFING TO ATLAS
})(populateData)


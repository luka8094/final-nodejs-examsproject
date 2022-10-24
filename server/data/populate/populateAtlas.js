import fs from "fs"
import "dotenv/config"
import connection from "../../database/mongodbConnection.mjs"
import Account from "../../model/account.mjs"

connection
const populateData = fs.readFileSync("./populateData.json")

//inisialisasi library
const express = require("express")
const app = express()

//import route siswa atau guru
const obat = require("./router/obat")
app.use("/obat", obat)

//membuat web server dengan port 8000
app.listen(8000, () => {
    console.log("server run on port 8000")
})

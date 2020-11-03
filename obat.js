const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const db = require("../config") //import konfigurasi database

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// end-point akses data obat
app.get("/", (req, res) => {
    // create sql query
    let sql = "select * from obat"

    // run query
    db.query(sql, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message // pesan error
            }            
        } else {
            response = {
                count: result.length, // jumlah data
                obat: result // isi data
            }            
        }
        res.json(response) // send response
    })
})

// end-point akses data obat berdasarkan id_penjualan_obat tertentu
app.get("/:id", (req, res) => {
    let data = {
        id_penjualan: req.params.id
    }
    // create sql query
    let sql = "select * from obat where ?"

    // run query
    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message // pesan error
            }            
        } else {
            response = {
                count: result.length, // jumlah data
                obat: result // isi data
            }            
        }
        res.json(response) // send response
    })
})

// end-point menyimpan data guru
app.post("/", (req,res) => {

    // prepare data
    let data = {
        id_obat: req.body.id_obat,
        id_pasien: req.body.id_pasien,
        tgl_beli: req.body.tgl_beli,
        harga: req.body.harga,
        total: req.body.total,
    }

    // create sql query insert
    let sql = "insert into obat set ?"

    // run query
    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " data berhasil disimpan"
            }
        }
        res.json(response) // send response
    })
})

// end-point mengubah data obat
app.put("/:id", (req,res) => {

    // prepare data
    let data = [
        // data
        {
            id_obat: req.body.id_obat,
            id_pasien: req.body.id_pasien,
            tgl_beli: req.body.tgl_beli,
            harga: req.body.harga,
            total: req.body.total,
        },

        // parameter (primary key)
        {
            id_penjualan: req.params.id
        }
    ]

    // create sql query update
    let sql = "update obat set ? where ?"

    // run query
    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " data berhasil diubah"
            }
        }
        res.json(response) // send response
    })
})

// end-point menghapus data obat
app.delete("/:id", (req,res) => {

    // prepare data
    let data = 
        // parameter (primary key)
        {
            id_penjualan: req.params.id
        }
    
    // create sql query delete
    let sql = "delete from obat where ?"

    // run query
    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " data berhasil dihapus"
            }
        }
        res.json(response) // send response
    })
})


module.exports=app;
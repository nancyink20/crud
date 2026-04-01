const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'crpms',
    
});

db.connect(err =>{
  if (err){
    console.error('Error connecting to MySQL:',err);
    return;
  }
  console.log('Connected to MySQL database');
  });

app.post('/services', (req,res) =>{
    const { serviceName, servicePrice} = req.body;

     const sql = "INSERT INTO Services (serviceName, servicePrice) VALUES (?, ?)";
    db.query(sql, [serviceName, servicePrice], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Service created" });
    });
});


app.get('/services', (req, res) => {
    db.query("SELECT * FROM Services", (err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result);
    });
});

app.put('/services/:id', (req, res) => {
    const { id } = req.params;
    const { serviceName, servicePrice } = req.body;

    const sql = "UPDATE Services SET serviceName=?, servicePrice=? WHERE serviceCode=?";
    db.query(sql, [serviceName, servicePrice, id], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Service updated" });
    });
});

app.delete('/services/:id', (req, res) => {
    const { id } = req.params;

    db.query("DELETE FROM Services WHERE serviceCode=?", [id], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Service deleted" });
    });
});


app.post('/car', (req, res) => {
    const { plateNumber, type, model, manufacturingYear, driverPhone, mechanicName } = req.body;

    const sql = `INSERT INTO Car 
    (plateNumber, type, model, manufacturingYear, driverPhone, mechanicName)
    VALUES (?, ?, ?, ?, ?, ?)`;

    db.query(sql, [plateNumber, type, model, manufacturingYear, driverPhone, mechanicName], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Car created" });
    });
});

app.get('/car', (req, res) => {
    db.query("SELECT * FROM Car", (err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result);
    });
});

app.put('/car/:plate', (req, res) => {
    const { plate } = req.params;
    const { type, model, manufacturingYear, driverPhone, mechanicName } = req.body;

    const sql = `
    UPDATE Car 
    SET type=?, model=?, manufacturingYear=?, driverPhone=?, mechanicName=? 
    WHERE plateNumber=?`;

    db.query(sql, [type, model, manufacturingYear, driverPhone, mechanicName, plate], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Car updated" });
    });
});


app.delete('/car/:plate', (req, res) => {
    const { plate } = req.params;

    db.query("DELETE FROM Car WHERE plateNumber=?", [plate], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Car deleted" });
    });
});

app.post('/servicerecord', (req, res) => {
    const { serviceDate, plateNumber, serviceCode } = req.body;

    const sql = "INSERT INTO ServiceRecord (serviceDate, plateNumber, serviceCode) VALUES (?, ?, ?)";
    db.query(sql, [serviceDate, plateNumber, serviceCode], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "ServiceRecord created" });
    });
});


app.get('/servicerecord', (req, res) => {
    db.query("SELECT * FROM ServiceRecord", (err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result);
    });
});


app.put('/servicerecord/:id', (req, res) => {
    const { id } = req.params;
    const { serviceDate, plateNumber, serviceCode } = req.body;

    const sql = `
    UPDATE ServiceRecord 
    SET serviceDate=?, plateNumber=?, serviceCode=? 
    WHERE recordNumber=?`;

    db.query(sql, [serviceDate, plateNumber, serviceCode, id], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "ServiceRecord updated" });
    });
});

app.put('/servicerecord/:id', (req, res) => {
    const { id } = req.params;
    const { serviceDate, plateNumber, serviceCode } = req.body;

    const sql = `
    UPDATE ServiceRecord 
    SET serviceDate=?, plateNumber=?, serviceCode=? 
    WHERE recordNumber=?`;

    db.query(sql, [serviceDate, plateNumber, serviceCode, id], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "ServiceRecord updated" });
    });
});


app.post('/payment', (req, res) => {
    const { amountPaid, paymentDate, recordNumber } = req.body;

    const sql = "INSERT INTO Payment (amountPaid, paymentDate, recordNumber) VALUES (?, ?, ?)";
    db.query(sql, [amountPaid, paymentDate, recordNumber], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Payment added" });
    });
});


app.listen(3000, () => {
    console.log("Server running on port 3001");
});
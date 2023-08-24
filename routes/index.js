var express = require('express');
const { cek } = require('../utils/helpers');
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/', async function (req, res, next) {
  const nik = req.body.nik
  if (nik == undefined || nik == null || nik == "") {
    return res.json({ 'status': false, 'message': 'Silahkan masukkan nik' });
  }
  console.log(nik)
  const hasil = await cek(nik)
  return res.json({ status: true, 'data': hasil})
});

module.exports = router;

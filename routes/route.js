const route = require('express').Router();
const { getAddress, addAddress,modifyAddress } = require('../controllers/controller')

route.get('/getaddress', getAddress);
route.post('/add-address', addAddress);
route.patch('/modify',modifyAddress);

module.exports = route;
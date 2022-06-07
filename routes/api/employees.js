const express = require('express');
const router = express.Router();

const {
    getAllEmployees,
    putNewEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployee
} = require('../../controller/employees.js');

const ROLES_LIST = require('../../config/roles_list.js');
const verifyRoles = require('../../middleware/verifyRoles.js');

router.route('/')
    .get(getAllEmployees)
    .post(verifyRoles([ROLES_LIST.Admin, ROLES_LIST.Editor]), putNewEmployee)
    .put(verifyRoles([ROLES_LIST.Admin, ROLES_LIST.Editor]), updateEmployee)
    .delete(verifyRoles([ROLES_LIST.Admin, ROLES_LIST.Editor]), deleteEmployee)

router.route('/:id')
    .get(getEmployee);

module.exports = router;
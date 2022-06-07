const verifyRoles = (allowedRoles) => {
    return (req, res, next) => {
        if (!req?.roles) return res.sendStatus(401); //Unauthorized

        const rolesArray = allowedRoles;

        console.log(allowedRoles);
        console.log(req.roles);

        const result = req.roles.map((roles) => rolesArray.includes(roles)).find((value) => value === true);

        console.log(result);

        if (!result) return res.sendStatus(401); //Unauthorized
        next();
    }
}

module.exports = verifyRoles;
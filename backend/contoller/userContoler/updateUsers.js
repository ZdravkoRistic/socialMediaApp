const updateUser = (req, res ) => {
    console.log(req.params);
    console.log(req.query);
    console.log(req.body);
    res.send("Update user");
}

module.exports = updateUser;
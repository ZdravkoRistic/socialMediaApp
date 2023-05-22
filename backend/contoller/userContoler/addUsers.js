const addUser = (req, res ) => {
    console.log(req.body);
    console.log("Hello");
    res.send("addUser");
}

module.exports = addUser;
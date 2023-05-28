const updateUser = (req, res) => {
    console.log("token", req.locals)
    console.log(req.body)
    res.send("Update user")
}

module.exports = updateUser

const getHome = (req, res) => {
    return res.render('dashboard.ejs');
}

module.exports = {
    getHome
}
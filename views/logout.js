router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error("Error destroying session: ", err);
            return res.redirect('/');
        }
        res.clearCookie('connect.sid'); 
        res.redirect('/login'); 
    });
});
export const loginPassport = async (req, res) => {

    req.user.email === "admincoder@coder.com" ? req.session.admin = true : req.session.admin = false
    req.session.first_name = req.user.first_name
    req.session.last_name = req.user.last_name
    req.session.email = req.user.email
    req.session.age = req.user.age
    req.session.cartId = req.user.cartId._id
    req.session.isLogged = true

    res.redirect('/products')
}

export const registerPassport = async (req, res) => {
    res.redirect('/login')
}

export const logout = async (req, res) => {
    req.session.destroy()
    res.redirect('/login')
}

export const githubLogin = async (req, res) => {
    req.user.email === "admincoder@coder.com" ? req.session.admin = true : req.session.admin = false
    req.session.first_name = req.user.first_name
    req.session.last_name = req.user.last_name
    req.session.email = req.user.email
    req.session.age = req.user.age
    req.session.cart = req.user.cartId
    req.session.cartId = req.user.cartId._id
    req.session.isLogged = true

    res.redirect('/products')
}
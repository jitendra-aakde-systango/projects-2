let errorMsg = ""

const homepage = (req, res) => {
    res.render('index');
};

const loginControl = (req, res) => {
    res.render('login');
};


const contactControl = (req, res) => {
    res.render('contacts');
};

const registerControl = (req, res) => {
    res.render('register');
};


const createUser = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.render('register', { errorMsg: "All fields are mandatory" });
    }

    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.render('register', { errorMsg: "User already registered. Please login." });
        }

        await User.create({ name, email, password });
        res.status(201).render('register', { errorMsg: errorMsg });
    } catch (error) {
        res.render('register', { errorMsg: errorMsg });
    }
};

const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.render('login', { errorMsg: "User not found" });
        }
        console.log("User verified");
        res.status(200).render('login', { errorMsg: "" });
    } catch (error) {
        res.render('login', { errorMsg: error.message });
    }
};

const showContactForUser = (req, res) => {
};

module.exports = {
    homepage,
    loginControl,
    contactControl,
    registerControl,
    createUser,
    loginUser,
};
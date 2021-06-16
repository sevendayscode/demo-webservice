const bcrypt = require('bcrypt');

const hashPassword = (password) => {
    const passHashed = bcrypt.hashSync(password, 10);
    return passHashed;
}

module.exports = {
    hashPassword
}

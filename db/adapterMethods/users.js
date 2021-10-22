const client = require("../client");

const createUser = async ({firstName, lastName, email, imageURL, username, password, isAdmin}) => {
    try {
        if (!isAdmin) {
            isAdmin = false;
        };
        if (!imageURL) {
            imageURL = 'https://louisville.edu/enrollmentmanagement/images/person-icon/image'
        };
        const {rows: [user] } = await client.query(`
            INSERT INTO users ("firstName", "lastName", email, "imageURL", username, password, "isAdmin")
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *;
        `, [firstName, lastName, email, imageURL, username, password, isAdmin]);
        return user;        
    } catch (error) {
        console.error(error);
    };
};

module.exports = {
    createUser
}
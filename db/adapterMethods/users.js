const {client} = require("../client");
const bcrypt = require("bcrypt");

const createUser = async ({ firstName, lastName, email, imageURL, username, password, isAdmin }) => {
    try {
        const saltRounds = 10;
        if (!isAdmin) {
            isAdmin = false;
        };
        if (!imageURL) {
            imageURL = 'https://louisville.edu/enrollmentmanagement/images/person-icon/image'
        };
const hashPw = await bcrypt.hash(password, saltRounds);
    const {rows: [user] } = await client.query(`
            INSERT INTO users ("firstName", "lastName", email, "imageURL", username, password, "isAdmin")
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *;
        `, [firstName, lastName, email, imageURL, username, hashPw, isAdmin]);
        return user; 
    } catch (error) {
        console.error(error);
    };
};

const getUser = async ({
    username,
    password
}) => {
    try {
        const userTarget = await getUserByUsername(username);
        const hashedPw = await userTarget.password;
        const res = await bcrypt.compare(password, hashedPw);
        if(res){
            const { rows: [ user ] } = await client.query(`
                SELECT *
                FROM users
                WHERE username=$1 
                AND password=$2;
            `, [username, hashedPw]);
            return user;
        }
        
    } catch (error) {
        throw error;
    }
}

const getAllUsers = async () => {
    try{
        const { rows: users } = await client.query(`
            SELECT *
            FROM users
        `);

        users.map((user)=>
        {
          delete user.password;
        });

      return users;
    } catch(error){
        throw error;
    }
}

const getUserById = async (id) => {
    try {
        const { rows: [ user ] } = await client.query(`
            SELECT *
            FROM users
            WHERE id=$1
            `, [id]);
        delete user.password;
        return user;
    } catch (error) {
        throw error;
    }
}

const getUserByUsername = async (username) => {
    try {
        const { rows: [ user ] } = await client.query(`
            SELECT *
            FROM users
            WHERE username=$1
            `, [username]);
        return user;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createUser,
    getUser,
    getAllUsers,
    getUserById,
    getUserByUsername
}
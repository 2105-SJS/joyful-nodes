const { client } = require ("../client");

const createUser = async ({ firstName, lastName, email, imageURL, username, password, isAdmin }) => {
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

async function getUser({
    username,
    password
}) {
    try {
        const { rows: [ user ] } = await client.query(`
            SELECT *
            FROM users
            WHERE username=$1 
            AND password=$2;
      `, [username, password]);
        return user;
    } catch (error) {
        throw error;
    }
}

async function getAllUsers(){
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

async function getUserById(id){
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

async function getUserByUsername(username){
    try {
        const { rows: [ user ] } = await client.query(`
            SELECT *
            FROM users
            WHERE username=$1
            `, [username]);
        delete user.password;
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
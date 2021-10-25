const { client } = require('../db/client');
const { rebuildDB } = require('../db/seed_data');
const { createUser, getUser, getUserById, getUserByUsername, getAllUsers } = require('../db/index');


describe('Database', () => {
    beforeAll(async() => {
      await client.connect();
      await rebuildDB();
    })
    afterAll(async() => {
      await client.end();
    })
    describe('Users', () => {
      let userToCreateAndUpdate, queriedUser;
      let userCredentials = {firstName: 'billy', lastName: 'bob', email: 'billybob@gmail.com', username: 'billybob', password: 'bobbybadboy'};
      describe('createUser({ firstName, lastName, email, username, password })', () => {
        beforeAll(async () => {
          userToCreateAndUpdate = await createUser(userCredentials);
          const {rows} = await client.query(`SELECT * FROM users WHERE username = $1`, [userCredentials.username]);
          queriedUser = rows[0];
        })
        it('Creates the user', async () => {
          expect(userToCreateAndUpdate.username).toBe(userCredentials.username);
          expect(queriedUser.username).toBe(userCredentials.username);
        });
        it('Does not store plaintext password in the database', async () => {
          expect(queriedUser.password).not.toBe(userCredentials.password);
        });
      })
      describe('getUser({ username, password })', () => {
        let verifiedUser;
        beforeAll(async () => {
          verifiedUser = await getUser(userCredentials);
        })
        it('Verifies the passed-in, plain-text password against the password in the database (the hashed password)', async () => {  
          const unVerifiedUser = await getUser({username: userCredentials.username, password: 'badPassword'});
          expect(verifiedUser).toBeTruthy();
          expect(verifiedUser.username).toBe(userCredentials.username);
          expect(unVerifiedUser).toBeFalsy();
        })
      })
      describe('getAllUsers()', () => {
        let Users;
        beforeAll(async () => {
          Users = await getAllUsers();
        })
        it('Does not return the passwords', async () => {  
          Users.map((user) => {
            expect(user.password).toBeFalsy();
            expect(typeof user).toBe("object");
          })
        })
          it('Returns all user objects', async () => {  
            Users.map((user) => {
              expect(typeof user).toBe("object");
            })
          
          
        })
      })
      describe('getUserById(id)', () => {
        it('Gets a user based on the user Id', async () => {
          const user = await getUserById(userToCreateAndUpdate.id);
          expect(user).toBeTruthy();
          expect(user.id).toBe(userToCreateAndUpdate.id);
        })
        it('Does not return the password', async () => {
            const user = await getUserById(userToCreateAndUpdate.id);
            expect(user).toBeTruthy();
            expect(user.password).toBeFalsy();
          })
      })
      describe('getUserByUsername(username)', () => {
        it('Gets a user based on the user Id', async () => {
          const user = await getUserByUsername(userToCreateAndUpdate.username);
          expect(user).toBeTruthy();
          expect(user.username).toBe(userToCreateAndUpdate.username);
        })
      })
    })
})

import { UsersCollection } from "../db/models/user.js";

import bcrypt from 'bcrypt';


export const registerUser = async (payload) => {
    const user = await 
    const encryptedPassword = await bcrypt.hash(payload.password, 10);

    return await UsersCollection.create({...payload, password: encryptedPassword});
};

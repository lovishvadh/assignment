import userSchema from '../../schemas/userSchema/index.js';

export async function saveNewUser(name, token) {
    try {
        const newUser = new userSchema({
            name: name.toLowerCase(),
            token,
            subscribedChannels: []
        });
        let response = await newUser.save();
        if (response.id) {
            return true;
        } else {
            return false;
        }
    } catch (err) {
        console.log(err);
        throw err;
    }
}

export async function checkUserAndSave(name, token) {
    try {
        if(await userSchema.findOne({
            name: name.toString(),
        })) {
            return true;
        } else {
            await saveNewUser(name, token);
            return true;
        }
    } catch (err) {
        console.log(err);
        throw err;
    }
}

export async function storeUsername(username, channel) {
    try {
        return await userSchema.findOneAndUpdate({
            name: username.toString(),
        }, {
            $push: { subscribedChannels: channel }
        }
        )
    } catch(err) {
        console.log(err);
        throw err;
    }
}
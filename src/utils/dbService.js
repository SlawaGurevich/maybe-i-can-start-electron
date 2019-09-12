const electron = require('electron');
const app = electron.remote.app;
const Datastore = require('nedb-promises');

const dbFactory = (fileName) => Datastore.create({
    filename: `${process.env.NODE_ENV === 'development' ? '.' : app.getPath('userData')}/data/${fileName}`,
    timestampData: true,
    autoload: true
});

const Databases = {
    options: dbFactory('options.db'),
    members: dbFactory('members.db'),
    roles: dbFactory('roles.db'),
};

const D_getAllOptions = async () => {
    let result = await Databases.options.find({}).then( (data) => { return data } );
    return result;
}

const D_getAllMembers = async () => {
    let result = await Databases.members.find({}).sort({ role: 1 }).then( (data) => { return data } );
    return result;
}

const D_getAllRoles = async () => {
    let result = await Databases.roles.find({}).sort({ createdAt: 1 }).then( (data) => { return data } );
    return result;
}

const D_addMember = async (picture, name, role) => {
    await Databases.roles.findOne({name: role}).then(
      (roleObj) => { Databases.members.insert({picture, name, role, roleObj}) }
    );
    // await ;
}

const D_deleteMember = async (name) => {
    await Databases.members.remove({name: name});
}

const D_addRole = async (name, icon) => {
    await Databases.roles.insert({name, icon});
}

const D_getRole = async (name) => {
    return await Databases.roles.findOne({name});
}

const D_deleteRole = async (name) => {
    await Databases.roles.remove({name: name});
}

export default Databases;
export { D_getAllOptions, D_getAllMembers, D_getAllRoles, D_addMember, D_deleteMember, D_addRole, D_deleteRole, D_getRole };
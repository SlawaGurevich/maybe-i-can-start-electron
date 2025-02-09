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

const D_getAllMembers = async () => {
    let result = await Databases.members.find({}).sort({ role: 1 });
    return result;
}

const D_addMember = async (picture, name, role) => {
    await Databases.members.insert({picture, name, role});
}

const D_deleteMember = async (name) => {
    await Databases.members.remove({name: name});
}

const D_getAllRoles = async () => {
    return await Databases.roles.find({}).sort({ createdAt: 1 });
}

const D_getRole = async (id) => {
    return await Databases.roles.findOne({_id: id});
}

const D_addRole = async (name, icon) => {
    await Databases.roles.insert({name, icon});
}

const D_deleteRole = async (name) => {
    await Databases.roles.remove({name: name});
}

const D_getAllOptions = async () => {
    let result = await Databases.options.find({});
    return result;
}

const D_setOption = async (option, value) => {
    await Databases.options.update({option: option}, {option: option, value: value}, {upsert: true});
}

const D_deleteOption = async (option) => {
    await Databases.options.remove({option: option});
}

const D_getOption = async (option) => {
    return Databases.options.findOne({option: option});
}

export default Databases;
export { D_getAllOptions, D_getAllMembers, D_getAllRoles, D_addMember, D_deleteMember, D_addRole, D_deleteRole, D_getRole, D_setOption, D_deleteOption, D_getOption };
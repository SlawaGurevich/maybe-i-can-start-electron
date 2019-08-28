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
};

const getAllOptions = async () => {
    let result = await Databases.options.find({}).then( (data) => { return data } );
    return result;
}

const getAllMembers = async () => {
    let result = await Databases.members.find({}).then( (data) => { return data } );
    return result;
}

export default Databases;
export { getAllOptions, getAllMembers };
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
    memebers: dbFactory('members.db'),
};

export default Databases;
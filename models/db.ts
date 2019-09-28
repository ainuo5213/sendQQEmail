import {createConnection} from 'mongoose'
export default createConnection('mongodb://127.0.0.1:27017/testUser',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });


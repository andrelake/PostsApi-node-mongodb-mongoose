import mongoose from 'mongoose'

mongoose.Promise = global.Promise

const config = {
    uri: 'mongodb://localhost:27017/node-mongoose-dio-tentativa',
    options: {
        useNewUrlParser: true,
        useFindAndModify: false,
    }
}

mongoose.connection.on('open', () => {
    console.log('Connected')
})

mongoose.connection.on('error', () => {
    throw new Error('Error connecting to MongoDB')
})

export default {
    connect: () => mongoose.connect(config.uri, config.options)
}
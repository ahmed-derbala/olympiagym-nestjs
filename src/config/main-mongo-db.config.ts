let user = null
const password = null
const host = process.env.DATABASE_HOST || 'localhost'
const port = parseInt(process.env.DATABASE_PORT, 10) || 27017
const name = 'olympiagym'
let uri = ``

if (!user && !password) uri = `mongodb://${host}:${port}/${name}`
else uri = `mongodb://${user}:${password}@${host}:${port}/${name}`

export default () => ({
    mainMongoDB: {
        host,
        port,
        name,
        uri,
        connectionName: name,
    }
});
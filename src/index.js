import Express from 'express'
import bodyParser from 'body-parser'

import database from './config/database'
import postRoute from './routes/postRoute'

const app = Express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.set('json spaces', 2)

postRoute(app)

app.get('/', (req, res) => res.send('Teste Express'))

database.connect().then(() => {
    app.listen(port, () => console.log('Rodando'))
})

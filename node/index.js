const express = require('express')
const { queryPromise } = require('./queryPromise')
const app = express()
const port = 3000

app.get('/', async (req, res) => {
    const sqlCreateTable = `CREATE TABLE IF NOT EXISTS people(id int NOT NULL AUTO_INCREMENT, name varchar(255) NOT NULL, PRIMARY KEY(id))`;
    await queryPromise.query(sqlCreateTable)

    const people = [['Dieison'], ['Lucian'], ['Wesley'], ['Luiz'], ['Gabriel']]
    const sqlInsert = `INSERT INTO people(name) VALUES ?`

    await queryPromise.queryMultiple(sqlInsert, people)

    const sqlPeople = `SELECT * FROM people`
    const allPeople = await queryPromise.query(sqlPeople)

    const html = `<h1>Full Cycle Rocks!</h1>\n
    <h2>List of people!</h2>\n
  <ul>
    ${allPeople.map(people => `<li>${people.name}</li>`).join('')}
  </ul>`

    const dropTable = `DROP TABLE IF EXISTS people`;
    await queryPromise.query(dropTable)

    res.send(html)
})

app.get('/oi', (req, res) => {
    res.send('<h1>oi</h1>')
})

app.listen(port, () => {
    console.log('Rodando na porta ' + port)
})
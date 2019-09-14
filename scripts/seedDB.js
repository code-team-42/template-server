/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
const db = require('../models')
const data = require('./seedData')

db.sequelize
  .sync({ force: false })
  .then(() => {
    let modelsSeeded = 0
    for (const key in data) {
      db[key]
        .bulkCreate(data[key], { individualHooks: true })
        // eslint-disable-next-line no-use-before-define
        .then(() => checkDone(key))
        .catch(err => console.log(err))
    }

    function checkDone(model) {
      console.log(`${model} seeded`)
      modelsSeeded++
      if (modelsSeeded >= Object.keys(data).length) {
        process.exit()
      }
    }
  })
  .catch(err => console.log(err))

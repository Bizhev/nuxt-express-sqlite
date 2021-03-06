import express from 'express'
import { Sequelize } from 'sequelize'
import config from '../nuxt.config.js'
import EventModel from './model/Event'

const Op = Sequelize.Op

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: config.db.storage
})

const Event = sequelize.define('events', EventModel)
sequelize.sync()

const router = express.Router()
const app = express()

router.use((req, res, next) => {
  Object.setPrototypeOf(req, app.request)
  Object.setPrototypeOf(res, app.response)
  req.res = res
  res.req = req
  next()
})

router.post('/send-event', (req, res) => {
  Event.create(req.body)
    .then(() => {
      return res.json()
    })
    .catch((err) => {
      res.status(401).json({ err })
    })
})
router.post('/events', (req, res) => {
  Event.findAll({})
    .then((events) => {
      return res.json(events)
    })
    .catch((err) => {
      return res.status(401).json({ err })
    })
})
router.post('/search-event', (req, res) => {
  Event.findAll({
    where: {
      topic: {
        [Op.like]: '%' + req.body.search + '%'
      }
    }
  }).then((events) => {
    if (events.length === 1) {
      return res.json(events)
    } else {
      events = events.map((e) => e.topic)
      return res.json(events)
    }
  })
})
export default {
  path: '/api',
  handler: router
}

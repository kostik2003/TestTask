const Router = require('express')
const router = new Router()
router.get('/', (req, res) => {
    res.json({message: '1234'})
})
router.post('/', (req, res) => {
    res.json({message})
})

module.exports = router
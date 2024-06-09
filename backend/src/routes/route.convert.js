const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })
const { Router } = require("express")
const router = Router()


const convertController = require("../controller/convert.controller");

module.exports = () => {
    router.post('/file/convert', upload.single('file'), convertController.uploadFile)
    return router
}
const app = require("./app")
const config = require("./utils/config")
const logger = require("./utils/logger")
const http = require('http')

const server = http.createServer(app)


const PORT = config.PORT || 3003
server.listen(PORT, () => {
	logger.info(`Server running on port ${PORT}`)
})
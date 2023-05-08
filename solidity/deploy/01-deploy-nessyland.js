const { network } = require("hardhat")
const { developmentChains } = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    log("----------------------------------------------------")
    arguments = []
    const nessyland = await deploy("Nessyland", {
        from: deployer,
        args: arguments,
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    })

    // Verify the deployment
    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("Verifying...")
        await verify(nessyland.address, arguments)
    }
}

module.exports.tags = ["all", "nessyland", "main"]


/// https://sepolia.etherscan.io/address/0xBfa93b612Ff6d7E1eFCb3E6738a1F8C535bcCcc5#code
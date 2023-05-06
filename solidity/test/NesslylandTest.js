const { assert } = require("chai")
const { network, deployments, ethers } = require("hardhat")
const { developmentChains } = require("../helper-hardhat-config")

//writing the test code from here..

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("Nessyland Unit Tests", function () {
          let nessyland, deployer

          beforeEach(async () => {
              accounts = await ethers.getSigners()
              deployer = accounts[0]
              await deployments.fixture(["nessyland"])
              nessyland = await ethers.getContract("Nessyland")
          })
        
        describe("Constructor", () => {
            it("Initializes the NFT Correctly.", async () => {
                const name = await nessyland.name()
                const symbol = await nessyland.symbol()
                const tokenCounter=await nessyland.getTokenCounter()
                assert.equal(name, "Nessyland")
                assert.equal(symbol, "NSYLD")
                assert.equal(tokenCounter.toString(),"0")
            })
        })
//test02
        // describe("Mint NFT", () => {
        //   beforeEach(async () => {
        //       const txResponse = await basicNft.mintNft()
        //       await txResponse.wait(1)
        //   })
        //   it("Allows users to mint an NFT, and updates appropriately", async function () {
        //       const tokenURI = await basicNft.tokenURI(0)
        //       const tokenCounter = await basicNft.getTokenCounter()

        //       assert.equal(tokenCounter.toString(), "1")
        //       assert.equal(tokenURI, await basicNft.TOKEN_URI())
        //   })
        //   it("Show the correct balance and owner of an NFT", async function () {
        //       const deployerAddress = deployer.address;
        //       const deployerBalance = await basicNft.balanceOf(deployerAddress)
        //       const owner = await basicNft.ownerOf("0")

        //       assert.equal(deployerBalance.toString(), "1")
        //       assert.equal(owner, deployerAddress)
        //   })
        // })
    })
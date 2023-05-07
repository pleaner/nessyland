const { assert, expect } = require("chai")
const { network, deployments, ethers } = require("hardhat")
const { developmentChains } = require("../helper-hardhat-config")   
const { time } = require("@nomicfoundation/hardhat-network-helpers");

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

        // Test Publish
        describe("Publish Article", () => {
          beforeEach(async () => {
              const txResponse1 = await nessyland.mintArticle(
                "Atricle Title One",
                "Article Description One",
                "Catagory One",
                "Sub Catagatgory One",
                3,
                "Article One Content"
              )
              await txResponse1.wait(1)
              const txResponse2 = await nessyland.mintArticle(
                "Atricle Title Two",
                "Article Description Two",
                "Catagory Two",
                "Sub Catagatgory Two",
                5,
                "Article Two Content"
              )
              await txResponse2.wait(1)
          })
          it("Allows users to Publish an Article NFT, and updates appropriately", async function () {
            // TODO  const tokenURI = await nessyland.tokenURI(0)
              const tokenCounter = await nessyland.getTokenCounter()

              assert.equal(tokenCounter.toString(), "2")
            //   assert.equal(tokenURI, await nessyland.TOKEN_URI())
          })
          it("Show the correct balance and owner of an NFT", async function () {
              const deployerAddress = deployer.address;
              const deployerBalance = await nessyland.balanceOf(deployerAddress)
              const owner = await nessyland.ownerOf("0")

              assert.equal(deployerBalance.toString(), "2")
              assert.equal(owner, deployerAddress)
          })
          it("Fetch the correct metadata of NFT Article", async function () {
            const deployerAddress = deployer.address;
            const article = await nessyland.getArticleMetadata("0")

            assert.equal(article.title, "Atricle Title One")
            assert.equal(article.description, "Article Description One")
            expect(article.published.toString()).not.to.be.an('undefined')
            assert.equal(article.author, deployerAddress)
            assert.equal(article.price.toString(), "3")
          })
          it("Fetches the correct articles of author", async function () {
            const deployerAddress = deployer.address;
            const articles = await nessyland.getArticlesByAuthor(deployerAddress)

            assert.equal(articles[0].title, "Atricle Title One")
            assert.equal(articles[0].description, "Article Description One")
            expect(articles[0].published.toString()).not.to.be.an('undefined')
            assert.equal(articles[0].author, deployerAddress)
            assert.equal(articles[0].price.toString(), "3")

            assert.equal(articles[1].title, "Atricle Title Two")
            assert.equal(articles[1].description, "Article Description Two")
            expect(articles[1].published.toString()).not.to.be.an('undefined')
            assert.equal(articles[1].author, deployerAddress)
            assert.equal(articles[1].price.toString(), "5")
          })
          it("Emit a Published event", async function(){
            const deployerAddress = deployer.address;

            await expect(await nessyland.mintArticle(
                "Atricle Title Three",
                "Article Description Three",
                "Catagory Three",
                "Sub Catagatgory Three",
                7,
                "Article Three Content"
              ))
                .to.emit(nessyland, "Published")
                .withArgs(
                    deployerAddress, 
                    "Catagory Three", 
                    "Sub Catagatgory Three",
                    "Atricle Title Three",
                    "Article Description Three",
                    7);
          })
        })
    })
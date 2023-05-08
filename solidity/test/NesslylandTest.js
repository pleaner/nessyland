const { assert, expect } = require("chai")
const { network, deployments, ethers } = require("hardhat")
const { developmentChains } = require("../helper-hardhat-config")   
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { BigNumber } = require("ethers");

const parseEther = ethers.utils.parseEther;

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("Nessyland Unit Tests", function () {

        async function deployTokenFixture() {
            const [deployer, reader, buyer, author] = await ethers.getSigners()
            await deployments.fixture(["nessyland"])
            nessyland = await ethers.getContract("Nessyland")
            return {nessyland, deployer, reader, buyer, author}
        }
        
        describe("Constructor", () => {
            it("Initializes the NFT Correctly.", async () => {
                const { nessyland, owner } = await loadFixture(deployTokenFixture);
                const name = await nessyland.name()
                const symbol = await nessyland.symbol()
                const tokenCounter = await nessyland.getTokenCounter()
                assert.equal(name, "Nessyland")
                assert.equal(symbol, "NSYLD")
                assert.equal(tokenCounter.toString(),"0")
            })
        })

        // Test Publish
        describe("Publish Article", () => {

          async function publishArticlesFixture() {
            const { nessyland, deployer, reader, buyer } = await loadFixture(deployTokenFixture);
              const txResponse1 = await nessyland.mintArticle(
                "Atricle Title One",
                "Article Description One",
                "Catagory One",
                "Sub Catagatgory One",
                parseEther("0.03"),
                "Article One Content"
              )
              await txResponse1.wait(1)
              const txResponse2 = await nessyland.mintArticle(
                "Atricle Title Two",
                "Article Description Two",
                "Catagory Two",
                "Sub Catagatgory Two",
                parseEther("0.05"),
                "Article Two Content"
              )
              await txResponse2.wait(1)
              return {nessyland, deployer, reader, buyer}
            }
          
          it("Allows users to Publish an Article NFT, and updates token Counter appropriately", async function () {
            const { nessyland } = await loadFixture(publishArticlesFixture);
              const tokenCounter = await nessyland.getTokenCounter();
              assert.equal(tokenCounter.toString(), "2");
          })
          it("Can priduce the NFT Metadata for a published Article", async function () {
            const { nessyland } = await loadFixture(publishArticlesFixture);
              const tokenUriBase64 = await nessyland.tokenURI(0)
              
              const jsonString = tokenUriBase64.slice(29) // remove prefix: data:application/json;base64,
            //   console.log('prefix: ' + tokenUriBase64.slice(0, 29) )
            //   console.log("jsonString: " + jsonString)
              var actual = JSON.parse((Buffer.from(jsonString, 'base64')).toString());
              assert.equal(actual.name, "Atricle Title One")
              assert.equal(actual.description, 'Article Description One')
              assert.equal(actual.external_url, 'https://www.nessy.land/article/0')
              assert.equal(actual.attributes[0].display_type, "date")
              assert.equal(actual.attributes[0].trait_type, "published")
              expect(actual.attributes[0].value).is.not.null
              assert.equal(actual.attributes[1].trait_type, 'Author')
              assert.equal(actual.attributes[1].value, '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266')
          })
          it("Show the correct balance and owner of an NFT", async function () {
            const { nessyland, deployer } = await loadFixture(publishArticlesFixture);
              const deployerAddress = deployer.address;
              const deployerBalance = await nessyland.balanceOf(deployerAddress)
              const owner = await nessyland.ownerOf("0")

              assert.equal(deployerBalance.toString(), "2")
              assert.equal(owner, deployerAddress)
          })
          it("Fetch the correct metadata of NFT Article", async function () {
            const { nessyland, deployer } = await loadFixture(publishArticlesFixture);
            const deployerAddress = deployer.address;
            const article = await nessyland.getArticleMetadata("0")

            assert.equal(article.title, "Atricle Title One")
            assert.equal(article.description, "Article Description One")
            expect(article.published.toString()).not.to.be.an('undefined')
            assert.equal(article.author, deployerAddress)
            assert.equal(article.price.toString(), "30000000000000000")
          })
          it("Fetches the correct articles of author", async function () {
            const { nessyland, deployer } = await loadFixture(publishArticlesFixture);
            const deployerAddress = deployer.address;
            const articles = await nessyland.getArticlesByAuthor(deployerAddress)

            assert.equal(articles[0].title, "Atricle Title One")
            assert.equal(articles[0].description, "Article Description One")
            expect(articles[0].published.toString()).not.to.be.an('undefined')
            assert.equal(articles[0].author, deployerAddress)
            assert.equal(articles[0].price.toString(), "30000000000000000")

            assert.equal(articles[1].title, "Atricle Title Two")
            assert.equal(articles[1].description, "Article Description Two")
            expect(articles[1].published.toString()).not.to.be.an('undefined')
            assert.equal(articles[1].author, deployerAddress)
            assert.equal(articles[1].price.toString(), "50000000000000000")
          })
          it("Emit a Published event", async function(){
            const { nessyland, deployer } = await loadFixture(publishArticlesFixture);
            const deployerAddress = deployer.address;

            await expect(await nessyland.mintArticle(
                "Atricle Title Three",
                "Article Description Three",
                "Catagory Three",
                "Sub Catagatgory Three",
                parseEther("0.07"),
                "Article Three Content"
              ))
                .to.emit(nessyland, "Published")
                .withArgs(
                    deployerAddress, 
                    "Catagory Three", 
                    "Sub Catagatgory Three",
                    "Atricle Title Three",
                    "Article Description Three",
                    "70000000000000000");
          })
        })

        // Test Read Permission
        describe("Read Article", () => {

            async function readArticleFixture() {
                const { nessyland, deployer, reader, buyer, author } = await loadFixture(deployTokenFixture);
                const nessylandAuthor = nessyland.connect(author)
                const txResponse = await nessylandAuthor.mintArticle(
                    "Atricle Title One",
                    "Article Description One",
                    "Catagory One",
                    "Sub Catagatgory One",
                    parseEther("0.01"),
                    "Article One Content"
                  )
                  const receipt =  await txResponse.wait(1)
                  const gasSpentAthor = receipt.gasUsed.mul(receipt.effectiveGasPrice)
                  const nessylandReader = nessyland.connect(reader)
                  return {nessyland, nessylandReader, deployer, reader, author, gasSpentAthor}
                }
            
            it("Does not allow non reader to read", async function () {
                const {nessylandReader} = await loadFixture(readArticleFixture);
                const hasPermission = await nessylandReader.hasArticleReadPermission("0");
                assert.isFalse(hasPermission)
            })
            it("Reverts when reader doesnt pay enough", async function () {
                const {nessylandReader} = await loadFixture(readArticleFixture);
                await expect(nessylandReader.purchaseRightToContent("0")).to.be.revertedWith( "Nessyland__NotEngoughPayment")
            })
            it("Reverts if article doesnt exists", async function () {
                const {nessylandReader} = await loadFixture(readArticleFixture);
                await expect(nessylandReader.purchaseRightToContent("99")).to.be.revertedWith( "Nessyland__ArticleDoesNotExist(99)")
            })
            it("Calculate Price less commission", async function () {
                const {nessyland} = await loadFixture(readArticleFixture);
                const result =  await nessyland.getPriceLessComission(parseEther("1"));
                assert.equal(result.toString(), "970000000000000000")
            })

            it("Can Purchase Permission to read", async function () {
                const {nessyland, nessylandReader} = await loadFixture(readArticleFixture);

                const article = await nessyland.getArticleMetadata("0")
                const tx = await nessylandReader.purchaseRightToContent("0", {value: article.price})
                await tx.wait(1)

                expect(await nessylandReader.hasArticleReadPermission("0")).to.be.true;
            })

            it("Pay correct amount to read article", async function () {
                const {nessyland, nessylandReader, reader} = await loadFixture(readArticleFixture);
                // Balances Before 
                expect(await reader.getBalance()).to.equal(parseEther("10000"))

                // Transaction
                const article = await nessyland.getArticleMetadata("0")
                const tx = await nessylandReader.purchaseRightToContent("0", {value: article.price})
                const readReceipt = await tx.wait(1)
                const gasSpentReader = readReceipt.gasUsed.mul(readReceipt.effectiveGasPrice)

                // Balances After
                expect(await reader.getBalance()).to.equal(
                    (parseEther("10000").sub(gasSpentReader)).sub(article.price))
            })

            it("Author become due the correct amount", async function () {
                const {nessyland, nessylandReader, author} = await loadFixture(readArticleFixture);

                const article = await nessyland.getArticleMetadata("0")
                await nessylandReader.purchaseRightToContent("0", {value: article.price})

                const nessylandAuthor = nessyland.connect(author);
                const amountDue = await nessylandAuthor.getAmountDue();
                const expected = article.price * 0.97;

                assert.equal(amountDue, expected);
            })

            it("Author can withdrawl due the correct amount", async function () {
                const {nessyland, nessylandReader, author, gasSpentAthor} = await loadFixture(readArticleFixture);

                // Balances Before 
                expect(await author.getBalance()).to.equal(parseEther("10000").sub(gasSpentAthor))

                const article = await nessyland.getArticleMetadata("0")
                await nessylandReader.purchaseRightToContent("0", {value: article.price})

                const nessylandAuthor = nessyland.connect(author);

                // Widrawl
                const tx = await nessylandAuthor.withdrawl();
                const readReceipt = await tx.wait(1)
                const gasSpentWithdrawing = readReceipt.gasUsed.mul(readReceipt.effectiveGasPrice)

                const totalGas = gasSpentAthor.add(gasSpentWithdrawing)
                const feesCollected = article.price * 0.97;

                expect(await author.getBalance()).to.equal(
                    (parseEther("10000").sub(totalGas)).add(feesCollected.toString()))
            })

            it("Attept to withdrawl from zero balance", async function () {
                const {nessyland} = await loadFixture(readArticleFixture);
                await expect(nessyland.withdrawl()).to.be.revertedWith( "Nessyland__NoBlanceDue()")
            })
        })

    })
const {ethers, network} = require("hardhat")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    log(" Mint First NFT ")
    const nessyland = await ethers.getContract("Nessyland", deployer)
    const tx1 = await nessyland.mintArticle(
        "Finite vs. infinite games",
        "An explination of Finite Games",
        "Philosophy",
        "Modern",
        ethers.utils.parseEther("0.001"),
        contentOne);
    await tx1.wait(6)

    console.log(`NFT at index 0 has ${await nessyland.tokenURI(0)}`)
    
    const tx2 = await nessyland.mintArticle(
        "Theatrical vs. Dramatic",
        "An explination of the Theatrical",
        "Philosophy",
        "Modern",
        ethers.utils.parseEther("0.001"),
        contentTwo)
    await tx1.wait(6)
    console.log(`NFT at index 0 has ${await nessyland.tokenURI(1)}`)
    
}


const contentOne = `## Finite vs. infinite games
Carse summarizes his argument, "There are at least two kinds of games: finite and infinite. A finite game is played for the purpose of winning, an infinite game for the purpose of continuing the play. Finite games are those instrumental activities - from sports to politics to wars - in which the participants obey rules, recognize boundaries and announce winners and losers. The infinite game - there is only one - includes any authentic interaction, from touching to culture, that changes rules, plays with boundaries and exists solely for the purpose of continuing the game. A finite player seeks power; the infinite one displays self-sufficient strength. Finite games are theatrical, necessitating an audience; infinite ones are dramatic, involving participants..."`

const contentTwo = `## Theatrical vs. Dramatic
Carse continues these conceptualizations across all major spheres of human affairs. He extends his themes broadly over several intellectual arenas that are largely otherwise disparate disciplines. He describes human pursuits as either dramatic (enacted in the present) or theatrical (performed according to a script of some kind). This distinction hinges on an agent's decision to engage in one state of affairs or another. If motherhood is a requirement and a duty, there are rules to be obeyed and goals to be achieved. This is motherhood as theatrical role. If motherhood is a choice and a process, it becomes a living drama. Carse spans objective and subjective realms and bridges many gaps among different scholarly traditions.`

module.exports.tags = ["all", "mint"]
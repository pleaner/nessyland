// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Nessyland is ERC721 {
    uint256 s_tokenCounter = 0;

    constructor() ERC721("NessyLand", "NSYLD") {}

    // Mint Article
    function mintNft() external returns (uint256) {
        s_tokenCounter++;
        _safeMint(msg.sender, s_tokenCounter);

        return s_tokenCounter;
    }

    function tokenURI(uint256 /*tokenId*/) public view override returns (string memory) {
        return "TokenUrl";
    }

    // Transfer Article
    // Buy Right to Read Article
    // Read Article
    // Get Articles from Author

    // getters
    function getTokenCounter() external view returns (uint256) {
        return s_tokenCounter;
    }
}

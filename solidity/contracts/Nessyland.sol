// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Nessyland is ERC721 {
    // Events
    event Published(
        address indexed author,
        string indexed catagory,
        string indexed subcatagory,
        string title,
        string description,
        uint published
    );

    // Structs

    struct Article {
        string title;
        string description;
        uint published;
        address author;
        uint256 price;
    }

    // Articles
    uint256 s_tokenCounter = 0;
    mapping(uint256 => Article) private s_tokenIdToArticle;
    mapping(uint256 => string) private s_tokenIdToContent;
    mapping(address => uint256[]) private s_authorToArticleIds;

    // Read Features
    mapping(uint256 => mapping(address => bool)) private s_tokenIdToReadPermission;

    // Functions
    constructor() ERC721("Nessyland", "NSYLD") {}

    // Mint Article
    function mintArticle(
        string memory _title,
        string memory _description,
        string memory _catagory,
        string memory _subcatagory,
        uint256 _price,
        string memory _content
    ) external returns (uint256) {
        Article memory article = Article(_title, _description, block.timestamp, msg.sender, _price);

        s_tokenIdToArticle[s_tokenCounter] = article;
        s_tokenIdToContent[s_tokenCounter] = _content;
        _safeMint(msg.sender, s_tokenCounter);

        emit Published(msg.sender, _catagory, _subcatagory, _title, _description, _price);

        s_authorToArticleIds[msg.sender].push(s_tokenCounter);

        s_tokenCounter++;
        return s_tokenCounter;
    }

    // function tokenURI(uint256 /*tokenId*/) public view override returns (string memory) {
    //     return "TokenUrl";
    // }

    // Transfer Article
    // Buy Right to Read Article
    // Read Article
    // Get Articles from Author

    // View Functions
    function getTokenCounter() external view returns (uint256) {
        return s_tokenCounter;
    }

    function getArticleMetadata(uint _tokenId) public view returns (Article memory) {
        return s_tokenIdToArticle[_tokenId];
    }

    function getArticlesByAuthor(address _author) public view returns (Article[] memory) {
        uint[] memory ids = s_authorToArticleIds[_author];
        Article[] memory result = new Article[](ids.length);

        for (uint i = 0; i < ids.length; i++) {
            result[i] = getArticleMetadata(ids[i]);
        }

        return result;
    }
}

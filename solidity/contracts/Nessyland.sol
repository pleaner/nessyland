// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "base64-sol/base64.sol";

error Nessyland__UnauthorisedContentRead(uint tokenId);
error Nessyland__NotEngoughPayment(uint price, uint paid);
error Nessyland__ArticleDoesNotExist(uint tokenId);
error Nessyland__NoBlanceDue();
error Nessyland__WithdawlFailed();

contract Nessyland is ERC721 {
    // Events
    event Published(
        address indexed author,
        string indexed catagory,
        string indexed subcatagory,
        string title,
        string description,
        uint price
    );

    event PurchaseRightToRead(
        address indexed author,
        address indexed owner,
        address reader,
        uint indexed tokenId,
        string title,
        uint price
    );

    event Withdrawl(address indexed withdrawer, uint amount);

    // Structs

    struct Article {
        string title;
        string description;
        uint published;
        address author;
        uint256 price;
    }

    uint private FEE_PERCENTAGE = 3;

    // Articles
    uint256 s_tokenCounter = 0;
    mapping(uint256 => Article) private s_tokenIdToArticle;
    mapping(uint256 => string) private s_tokenIdToContent;
    mapping(address => uint256[]) private s_authorToArticleIds;

    // Read Features
    mapping(uint256 => mapping(address => bool)) private s_tokenIdToContentPermission;
    mapping(address => uint) s_balanceDue;
    uint private earnedCommision;
    string private articleBaseUrl = "https://www.nessy.land/article/";

    // Modifiers
    modifier canReadContent(uint _tokenId) {
        if (!hasArticleReadPermission(_tokenId)) {
            revert Nessyland__UnauthorisedContentRead(_tokenId);
        }
        _;
    }

    modifier articleExistist(uint _tokenId) {
        address author = s_tokenIdToArticle[_tokenId].author;
        if (author == address(0)) {
            revert Nessyland__ArticleDoesNotExist(_tokenId);
        }
        _;
    }

    // Functions
    constructor() ERC721("Nessyland", "NSYLD") {}

    // Mint Article
    function mintArticle(
        string memory _title,
        string memory _description,
        string memory _catagory,
        string memory _subcatagory,
        uint256 _price, // fix pricing
        string memory _content
    ) external returns (uint256) {
        Article memory article = Article(_title, _description, block.timestamp, msg.sender, _price);

        s_tokenIdToArticle[s_tokenCounter] = article;
        s_tokenIdToContent[s_tokenCounter] = _content;
        _safeMint(msg.sender, s_tokenCounter);

        emit Published(msg.sender, _catagory, _subcatagory, _title, _description, _price);

        s_authorToArticleIds[msg.sender].push(s_tokenCounter);
        grantContentPermission(msg.sender, s_tokenCounter); // can read own articles

        s_tokenCounter++;
        return s_tokenCounter;
    }

    // TODO: image, https://docs.opensea.io/docs/metadata-standards
    function tokenURI(
        uint256 _tokenId
    ) public view override articleExistist(_tokenId) returns (string memory) {
        Article memory atricle = s_tokenIdToArticle[_tokenId];
        return
            string(
                abi.encodePacked(
                    _baseURI(),
                    Base64.encode(
                        bytes(
                            abi.encodePacked(
                                '{"name":"',
                                atricle.title,
                                '","description":"',
                                atricle.description,
                                '","external_url":"',
                                articleBaseUrl,
                                Strings.toString(_tokenId),
                                '","attributes":[',
                                '{"display_type": "date","trait_type":"published","value":',
                                Strings.toString(atricle.published),
                                "},",
                                '{"trait_type": "Author","value":"',
                                Strings.toHexString(uint160(atricle.author), 20),
                                '"}',
                                "]}"
                            )
                        )
                    )
                )
            );
    }

    function purchaseRightToContent(
        uint _tokenId
    ) public payable articleExistist(_tokenId) returns (uint) {
        Article memory atricle = s_tokenIdToArticle[_tokenId];

        if (msg.value < atricle.price) {
            revert Nessyland__NotEngoughPayment(atricle.price, msg.value);
        }

        s_balanceDue[_ownerOf(_tokenId)] += getPriceLessComission(msg.value);
        s_balanceDue[address(this)] += getComission(msg.value);
        grantContentPermission(msg.sender, _tokenId);

        emit PurchaseRightToRead(
            atricle.author,
            _ownerOf(_tokenId),
            msg.sender,
            _tokenId,
            atricle.title,
            atricle.price
        );

        return _tokenId;
    }

    function grantContentPermission(address _reader, uint _tokenId) private {
        s_tokenIdToContentPermission[_tokenId][_reader] = true;
    }

    function withdrawl() public {
        uint amount = s_balanceDue[msg.sender];
        if (amount == 0) {
            revert Nessyland__NoBlanceDue();
        }
        (bool success, ) = payable(msg.sender).call{value: amount}("");
        if (success) {
            s_balanceDue[msg.sender] = 0; // reset balance
            emit Withdrawl(msg.sender, amount);
        } else {
            revert Nessyland__WithdawlFailed();
        }
    }

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

    function getArticleContent(
        uint _tokenId
    ) public view canReadContent(_tokenId) returns (string memory) {
        return s_tokenIdToContent[_tokenId];
    }

    function hasArticleReadPermission(uint _tokeId) public view returns (bool) {
        return s_tokenIdToContentPermission[_tokeId][msg.sender];
    }

    function getFeePercentage() public view returns (uint) {
        return FEE_PERCENTAGE;
    }

    function getAmountDue() public view returns (uint) {
        return s_balanceDue[msg.sender];
    }

    function getEarnedCommision() public view returns (uint) {
        return earnedCommision;
    }

    function getPriceLessComission(uint price) public view returns (uint) {
        return (price * (100 - FEE_PERCENTAGE)) / 100;
    }

    function getComission(uint price) public view returns (uint) {
        return (price * FEE_PERCENTAGE) / 100;
    }
}

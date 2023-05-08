// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class Approval extends ethereum.Event {
  get params(): Approval__Params {
    return new Approval__Params(this);
  }
}

export class Approval__Params {
  _event: Approval;

  constructor(event: Approval) {
    this._event = event;
  }

  get owner(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get approved(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class ApprovalForAll extends ethereum.Event {
  get params(): ApprovalForAll__Params {
    return new ApprovalForAll__Params(this);
  }
}

export class ApprovalForAll__Params {
  _event: ApprovalForAll;

  constructor(event: ApprovalForAll) {
    this._event = event;
  }

  get owner(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get operator(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get approved(): boolean {
    return this._event.parameters[2].value.toBoolean();
  }
}

export class OwnershipTransferred extends ethereum.Event {
  get params(): OwnershipTransferred__Params {
    return new OwnershipTransferred__Params(this);
  }
}

export class OwnershipTransferred__Params {
  _event: OwnershipTransferred;

  constructor(event: OwnershipTransferred) {
    this._event = event;
  }

  get previousOwner(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get newOwner(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class Published extends ethereum.Event {
  get params(): Published__Params {
    return new Published__Params(this);
  }
}

export class Published__Params {
  _event: Published;

  constructor(event: Published) {
    this._event = event;
  }

  get author(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get catagory(): Bytes {
    return this._event.parameters[1].value.toBytes();
  }

  get subcatagory(): Bytes {
    return this._event.parameters[2].value.toBytes();
  }

  get title(): string {
    return this._event.parameters[3].value.toString();
  }

  get description(): string {
    return this._event.parameters[4].value.toString();
  }

  get price(): BigInt {
    return this._event.parameters[5].value.toBigInt();
  }
}

export class PurchaseRightToRead extends ethereum.Event {
  get params(): PurchaseRightToRead__Params {
    return new PurchaseRightToRead__Params(this);
  }
}

export class PurchaseRightToRead__Params {
  _event: PurchaseRightToRead;

  constructor(event: PurchaseRightToRead) {
    this._event = event;
  }

  get author(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get owner(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get reader(): Address {
    return this._event.parameters[2].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }

  get title(): string {
    return this._event.parameters[4].value.toString();
  }

  get price(): BigInt {
    return this._event.parameters[5].value.toBigInt();
  }
}

export class Transfer extends ethereum.Event {
  get params(): Transfer__Params {
    return new Transfer__Params(this);
  }
}

export class Transfer__Params {
  _event: Transfer;

  constructor(event: Transfer) {
    this._event = event;
  }

  get from(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get to(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class Withdrawl extends ethereum.Event {
  get params(): Withdrawl__Params {
    return new Withdrawl__Params(this);
  }
}

export class Withdrawl__Params {
  _event: Withdrawl;

  constructor(event: Withdrawl) {
    this._event = event;
  }

  get withdrawer(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get amount(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }
}

export class WithdrawlComission extends ethereum.Event {
  get params(): WithdrawlComission__Params {
    return new WithdrawlComission__Params(this);
  }
}

export class WithdrawlComission__Params {
  _event: WithdrawlComission;

  constructor(event: WithdrawlComission) {
    this._event = event;
  }

  get withdrawer(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get amount(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }
}

export class Nessyland__getArticleMetadataResultValue0Struct extends ethereum.Tuple {
  get title(): string {
    return this[0].toString();
  }

  get description(): string {
    return this[1].toString();
  }

  get published(): BigInt {
    return this[2].toBigInt();
  }

  get author(): Address {
    return this[3].toAddress();
  }

  get price(): BigInt {
    return this[4].toBigInt();
  }
}

export class Nessyland__getArticlesByAuthorResultValue0Struct extends ethereum.Tuple {
  get title(): string {
    return this[0].toString();
  }

  get description(): string {
    return this[1].toString();
  }

  get published(): BigInt {
    return this[2].toBigInt();
  }

  get author(): Address {
    return this[3].toAddress();
  }

  get price(): BigInt {
    return this[4].toBigInt();
  }
}

export class Nessyland extends ethereum.SmartContract {
  static bind(address: Address): Nessyland {
    return new Nessyland("Nessyland", address);
  }

  balanceOf(owner: Address): BigInt {
    let result = super.call("balanceOf", "balanceOf(address):(uint256)", [
      ethereum.Value.fromAddress(owner)
    ]);

    return result[0].toBigInt();
  }

  try_balanceOf(owner: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall("balanceOf", "balanceOf(address):(uint256)", [
      ethereum.Value.fromAddress(owner)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getAmountDue(): BigInt {
    let result = super.call("getAmountDue", "getAmountDue():(uint256)", []);

    return result[0].toBigInt();
  }

  try_getAmountDue(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("getAmountDue", "getAmountDue():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getApproved(tokenId: BigInt): Address {
    let result = super.call("getApproved", "getApproved(uint256):(address)", [
      ethereum.Value.fromUnsignedBigInt(tokenId)
    ]);

    return result[0].toAddress();
  }

  try_getApproved(tokenId: BigInt): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "getApproved",
      "getApproved(uint256):(address)",
      [ethereum.Value.fromUnsignedBigInt(tokenId)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  getArticleContent(_tokenId: BigInt): string {
    let result = super.call(
      "getArticleContent",
      "getArticleContent(uint256):(string)",
      [ethereum.Value.fromUnsignedBigInt(_tokenId)]
    );

    return result[0].toString();
  }

  try_getArticleContent(_tokenId: BigInt): ethereum.CallResult<string> {
    let result = super.tryCall(
      "getArticleContent",
      "getArticleContent(uint256):(string)",
      [ethereum.Value.fromUnsignedBigInt(_tokenId)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toString());
  }

  getArticleMetadata(
    _tokenId: BigInt
  ): Nessyland__getArticleMetadataResultValue0Struct {
    let result = super.call(
      "getArticleMetadata",
      "getArticleMetadata(uint256):((string,string,uint256,address,uint256))",
      [ethereum.Value.fromUnsignedBigInt(_tokenId)]
    );

    return changetype<Nessyland__getArticleMetadataResultValue0Struct>(
      result[0].toTuple()
    );
  }

  try_getArticleMetadata(
    _tokenId: BigInt
  ): ethereum.CallResult<Nessyland__getArticleMetadataResultValue0Struct> {
    let result = super.tryCall(
      "getArticleMetadata",
      "getArticleMetadata(uint256):((string,string,uint256,address,uint256))",
      [ethereum.Value.fromUnsignedBigInt(_tokenId)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      changetype<Nessyland__getArticleMetadataResultValue0Struct>(
        value[0].toTuple()
      )
    );
  }

  getArticlesByAuthor(
    _author: Address
  ): Array<Nessyland__getArticlesByAuthorResultValue0Struct> {
    let result = super.call(
      "getArticlesByAuthor",
      "getArticlesByAuthor(address):((string,string,uint256,address,uint256)[])",
      [ethereum.Value.fromAddress(_author)]
    );

    return result[0].toTupleArray<
      Nessyland__getArticlesByAuthorResultValue0Struct
    >();
  }

  try_getArticlesByAuthor(
    _author: Address
  ): ethereum.CallResult<
    Array<Nessyland__getArticlesByAuthorResultValue0Struct>
  > {
    let result = super.tryCall(
      "getArticlesByAuthor",
      "getArticlesByAuthor(address):((string,string,uint256,address,uint256)[])",
      [ethereum.Value.fromAddress(_author)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      value[0].toTupleArray<Nessyland__getArticlesByAuthorResultValue0Struct>()
    );
  }

  getComission(price: BigInt): BigInt {
    let result = super.call("getComission", "getComission(uint256):(uint256)", [
      ethereum.Value.fromUnsignedBigInt(price)
    ]);

    return result[0].toBigInt();
  }

  try_getComission(price: BigInt): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "getComission",
      "getComission(uint256):(uint256)",
      [ethereum.Value.fromUnsignedBigInt(price)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getEarnedCommision(): BigInt {
    let result = super.call(
      "getEarnedCommision",
      "getEarnedCommision():(uint256)",
      []
    );

    return result[0].toBigInt();
  }

  try_getEarnedCommision(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "getEarnedCommision",
      "getEarnedCommision():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getFeePercentage(): BigInt {
    let result = super.call(
      "getFeePercentage",
      "getFeePercentage():(uint256)",
      []
    );

    return result[0].toBigInt();
  }

  try_getFeePercentage(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "getFeePercentage",
      "getFeePercentage():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getPriceLessComission(price: BigInt): BigInt {
    let result = super.call(
      "getPriceLessComission",
      "getPriceLessComission(uint256):(uint256)",
      [ethereum.Value.fromUnsignedBigInt(price)]
    );

    return result[0].toBigInt();
  }

  try_getPriceLessComission(price: BigInt): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "getPriceLessComission",
      "getPriceLessComission(uint256):(uint256)",
      [ethereum.Value.fromUnsignedBigInt(price)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getTokenCounter(): BigInt {
    let result = super.call(
      "getTokenCounter",
      "getTokenCounter():(uint256)",
      []
    );

    return result[0].toBigInt();
  }

  try_getTokenCounter(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "getTokenCounter",
      "getTokenCounter():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  hasArticleReadPermission(_tokeId: BigInt): boolean {
    let result = super.call(
      "hasArticleReadPermission",
      "hasArticleReadPermission(uint256):(bool)",
      [ethereum.Value.fromUnsignedBigInt(_tokeId)]
    );

    return result[0].toBoolean();
  }

  try_hasArticleReadPermission(_tokeId: BigInt): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "hasArticleReadPermission",
      "hasArticleReadPermission(uint256):(bool)",
      [ethereum.Value.fromUnsignedBigInt(_tokeId)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  isApprovedForAll(owner: Address, operator: Address): boolean {
    let result = super.call(
      "isApprovedForAll",
      "isApprovedForAll(address,address):(bool)",
      [ethereum.Value.fromAddress(owner), ethereum.Value.fromAddress(operator)]
    );

    return result[0].toBoolean();
  }

  try_isApprovedForAll(
    owner: Address,
    operator: Address
  ): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "isApprovedForAll",
      "isApprovedForAll(address,address):(bool)",
      [ethereum.Value.fromAddress(owner), ethereum.Value.fromAddress(operator)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  mintArticle(
    _title: string,
    _description: string,
    _catagory: string,
    _subcatagory: string,
    _price: BigInt,
    _content: string
  ): BigInt {
    let result = super.call(
      "mintArticle",
      "mintArticle(string,string,string,string,uint256,string):(uint256)",
      [
        ethereum.Value.fromString(_title),
        ethereum.Value.fromString(_description),
        ethereum.Value.fromString(_catagory),
        ethereum.Value.fromString(_subcatagory),
        ethereum.Value.fromUnsignedBigInt(_price),
        ethereum.Value.fromString(_content)
      ]
    );

    return result[0].toBigInt();
  }

  try_mintArticle(
    _title: string,
    _description: string,
    _catagory: string,
    _subcatagory: string,
    _price: BigInt,
    _content: string
  ): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "mintArticle",
      "mintArticle(string,string,string,string,uint256,string):(uint256)",
      [
        ethereum.Value.fromString(_title),
        ethereum.Value.fromString(_description),
        ethereum.Value.fromString(_catagory),
        ethereum.Value.fromString(_subcatagory),
        ethereum.Value.fromUnsignedBigInt(_price),
        ethereum.Value.fromString(_content)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  name(): string {
    let result = super.call("name", "name():(string)", []);

    return result[0].toString();
  }

  try_name(): ethereum.CallResult<string> {
    let result = super.tryCall("name", "name():(string)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toString());
  }

  owner(): Address {
    let result = super.call("owner", "owner():(address)", []);

    return result[0].toAddress();
  }

  try_owner(): ethereum.CallResult<Address> {
    let result = super.tryCall("owner", "owner():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  ownerOf(tokenId: BigInt): Address {
    let result = super.call("ownerOf", "ownerOf(uint256):(address)", [
      ethereum.Value.fromUnsignedBigInt(tokenId)
    ]);

    return result[0].toAddress();
  }

  try_ownerOf(tokenId: BigInt): ethereum.CallResult<Address> {
    let result = super.tryCall("ownerOf", "ownerOf(uint256):(address)", [
      ethereum.Value.fromUnsignedBigInt(tokenId)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  supportsInterface(interfaceId: Bytes): boolean {
    let result = super.call(
      "supportsInterface",
      "supportsInterface(bytes4):(bool)",
      [ethereum.Value.fromFixedBytes(interfaceId)]
    );

    return result[0].toBoolean();
  }

  try_supportsInterface(interfaceId: Bytes): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "supportsInterface",
      "supportsInterface(bytes4):(bool)",
      [ethereum.Value.fromFixedBytes(interfaceId)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  symbol(): string {
    let result = super.call("symbol", "symbol():(string)", []);

    return result[0].toString();
  }

  try_symbol(): ethereum.CallResult<string> {
    let result = super.tryCall("symbol", "symbol():(string)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toString());
  }

  tokenURI(_tokenId: BigInt): string {
    let result = super.call("tokenURI", "tokenURI(uint256):(string)", [
      ethereum.Value.fromUnsignedBigInt(_tokenId)
    ]);

    return result[0].toString();
  }

  try_tokenURI(_tokenId: BigInt): ethereum.CallResult<string> {
    let result = super.tryCall("tokenURI", "tokenURI(uint256):(string)", [
      ethereum.Value.fromUnsignedBigInt(_tokenId)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toString());
  }
}

export class ConstructorCall extends ethereum.Call {
  get inputs(): ConstructorCall__Inputs {
    return new ConstructorCall__Inputs(this);
  }

  get outputs(): ConstructorCall__Outputs {
    return new ConstructorCall__Outputs(this);
  }
}

export class ConstructorCall__Inputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class ConstructorCall__Outputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class ApproveCall extends ethereum.Call {
  get inputs(): ApproveCall__Inputs {
    return new ApproveCall__Inputs(this);
  }

  get outputs(): ApproveCall__Outputs {
    return new ApproveCall__Outputs(this);
  }
}

export class ApproveCall__Inputs {
  _call: ApproveCall;

  constructor(call: ApproveCall) {
    this._call = call;
  }

  get to(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class ApproveCall__Outputs {
  _call: ApproveCall;

  constructor(call: ApproveCall) {
    this._call = call;
  }
}

export class MintArticleCall extends ethereum.Call {
  get inputs(): MintArticleCall__Inputs {
    return new MintArticleCall__Inputs(this);
  }

  get outputs(): MintArticleCall__Outputs {
    return new MintArticleCall__Outputs(this);
  }
}

export class MintArticleCall__Inputs {
  _call: MintArticleCall;

  constructor(call: MintArticleCall) {
    this._call = call;
  }

  get _title(): string {
    return this._call.inputValues[0].value.toString();
  }

  get _description(): string {
    return this._call.inputValues[1].value.toString();
  }

  get _catagory(): string {
    return this._call.inputValues[2].value.toString();
  }

  get _subcatagory(): string {
    return this._call.inputValues[3].value.toString();
  }

  get _price(): BigInt {
    return this._call.inputValues[4].value.toBigInt();
  }

  get _content(): string {
    return this._call.inputValues[5].value.toString();
  }
}

export class MintArticleCall__Outputs {
  _call: MintArticleCall;

  constructor(call: MintArticleCall) {
    this._call = call;
  }

  get value0(): BigInt {
    return this._call.outputValues[0].value.toBigInt();
  }
}

export class PurchaseRightToContentCall extends ethereum.Call {
  get inputs(): PurchaseRightToContentCall__Inputs {
    return new PurchaseRightToContentCall__Inputs(this);
  }

  get outputs(): PurchaseRightToContentCall__Outputs {
    return new PurchaseRightToContentCall__Outputs(this);
  }
}

export class PurchaseRightToContentCall__Inputs {
  _call: PurchaseRightToContentCall;

  constructor(call: PurchaseRightToContentCall) {
    this._call = call;
  }

  get _tokenId(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class PurchaseRightToContentCall__Outputs {
  _call: PurchaseRightToContentCall;

  constructor(call: PurchaseRightToContentCall) {
    this._call = call;
  }

  get value0(): BigInt {
    return this._call.outputValues[0].value.toBigInt();
  }
}

export class RenounceOwnershipCall extends ethereum.Call {
  get inputs(): RenounceOwnershipCall__Inputs {
    return new RenounceOwnershipCall__Inputs(this);
  }

  get outputs(): RenounceOwnershipCall__Outputs {
    return new RenounceOwnershipCall__Outputs(this);
  }
}

export class RenounceOwnershipCall__Inputs {
  _call: RenounceOwnershipCall;

  constructor(call: RenounceOwnershipCall) {
    this._call = call;
  }
}

export class RenounceOwnershipCall__Outputs {
  _call: RenounceOwnershipCall;

  constructor(call: RenounceOwnershipCall) {
    this._call = call;
  }
}

export class SafeTransferFromCall extends ethereum.Call {
  get inputs(): SafeTransferFromCall__Inputs {
    return new SafeTransferFromCall__Inputs(this);
  }

  get outputs(): SafeTransferFromCall__Outputs {
    return new SafeTransferFromCall__Outputs(this);
  }
}

export class SafeTransferFromCall__Inputs {
  _call: SafeTransferFromCall;

  constructor(call: SafeTransferFromCall) {
    this._call = call;
  }

  get from(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get to(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }
}

export class SafeTransferFromCall__Outputs {
  _call: SafeTransferFromCall;

  constructor(call: SafeTransferFromCall) {
    this._call = call;
  }
}

export class SafeTransferFrom1Call extends ethereum.Call {
  get inputs(): SafeTransferFrom1Call__Inputs {
    return new SafeTransferFrom1Call__Inputs(this);
  }

  get outputs(): SafeTransferFrom1Call__Outputs {
    return new SafeTransferFrom1Call__Outputs(this);
  }
}

export class SafeTransferFrom1Call__Inputs {
  _call: SafeTransferFrom1Call;

  constructor(call: SafeTransferFrom1Call) {
    this._call = call;
  }

  get from(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get to(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }

  get data(): Bytes {
    return this._call.inputValues[3].value.toBytes();
  }
}

export class SafeTransferFrom1Call__Outputs {
  _call: SafeTransferFrom1Call;

  constructor(call: SafeTransferFrom1Call) {
    this._call = call;
  }
}

export class SetApprovalForAllCall extends ethereum.Call {
  get inputs(): SetApprovalForAllCall__Inputs {
    return new SetApprovalForAllCall__Inputs(this);
  }

  get outputs(): SetApprovalForAllCall__Outputs {
    return new SetApprovalForAllCall__Outputs(this);
  }
}

export class SetApprovalForAllCall__Inputs {
  _call: SetApprovalForAllCall;

  constructor(call: SetApprovalForAllCall) {
    this._call = call;
  }

  get operator(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get approved(): boolean {
    return this._call.inputValues[1].value.toBoolean();
  }
}

export class SetApprovalForAllCall__Outputs {
  _call: SetApprovalForAllCall;

  constructor(call: SetApprovalForAllCall) {
    this._call = call;
  }
}

export class TransferFromCall extends ethereum.Call {
  get inputs(): TransferFromCall__Inputs {
    return new TransferFromCall__Inputs(this);
  }

  get outputs(): TransferFromCall__Outputs {
    return new TransferFromCall__Outputs(this);
  }
}

export class TransferFromCall__Inputs {
  _call: TransferFromCall;

  constructor(call: TransferFromCall) {
    this._call = call;
  }

  get from(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get to(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }
}

export class TransferFromCall__Outputs {
  _call: TransferFromCall;

  constructor(call: TransferFromCall) {
    this._call = call;
  }
}

export class TransferOwnershipCall extends ethereum.Call {
  get inputs(): TransferOwnershipCall__Inputs {
    return new TransferOwnershipCall__Inputs(this);
  }

  get outputs(): TransferOwnershipCall__Outputs {
    return new TransferOwnershipCall__Outputs(this);
  }
}

export class TransferOwnershipCall__Inputs {
  _call: TransferOwnershipCall;

  constructor(call: TransferOwnershipCall) {
    this._call = call;
  }

  get newOwner(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class TransferOwnershipCall__Outputs {
  _call: TransferOwnershipCall;

  constructor(call: TransferOwnershipCall) {
    this._call = call;
  }
}

export class WithdrawlCall extends ethereum.Call {
  get inputs(): WithdrawlCall__Inputs {
    return new WithdrawlCall__Inputs(this);
  }

  get outputs(): WithdrawlCall__Outputs {
    return new WithdrawlCall__Outputs(this);
  }
}

export class WithdrawlCall__Inputs {
  _call: WithdrawlCall;

  constructor(call: WithdrawlCall) {
    this._call = call;
  }
}

export class WithdrawlCall__Outputs {
  _call: WithdrawlCall;

  constructor(call: WithdrawlCall) {
    this._call = call;
  }
}

export class WithdrawlCommissionCall extends ethereum.Call {
  get inputs(): WithdrawlCommissionCall__Inputs {
    return new WithdrawlCommissionCall__Inputs(this);
  }

  get outputs(): WithdrawlCommissionCall__Outputs {
    return new WithdrawlCommissionCall__Outputs(this);
  }
}

export class WithdrawlCommissionCall__Inputs {
  _call: WithdrawlCommissionCall;

  constructor(call: WithdrawlCommissionCall) {
    this._call = call;
  }
}

export class WithdrawlCommissionCall__Outputs {
  _call: WithdrawlCommissionCall;

  constructor(call: WithdrawlCommissionCall) {
    this._call = call;
  }
}
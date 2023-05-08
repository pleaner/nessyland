import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  Approval,
  ApprovalForAll,
  OwnershipTransferred,
  Published,
  PurchaseRightToRead,
  Transfer,
  Withdrawl,
  WithdrawlComission
} from "../generated/Nessyland/Nessyland"

export function createApprovalEvent(
  owner: Address,
  approved: Address,
  tokenId: BigInt
): Approval {
  let approvalEvent = changetype<Approval>(newMockEvent())

  approvalEvent.parameters = new Array()

  approvalEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  approvalEvent.parameters.push(
    new ethereum.EventParam("approved", ethereum.Value.fromAddress(approved))
  )
  approvalEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )

  return approvalEvent
}

export function createApprovalForAllEvent(
  owner: Address,
  operator: Address,
  approved: boolean
): ApprovalForAll {
  let approvalForAllEvent = changetype<ApprovalForAll>(newMockEvent())

  approvalForAllEvent.parameters = new Array()

  approvalForAllEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  approvalForAllEvent.parameters.push(
    new ethereum.EventParam("operator", ethereum.Value.fromAddress(operator))
  )
  approvalForAllEvent.parameters.push(
    new ethereum.EventParam("approved", ethereum.Value.fromBoolean(approved))
  )

  return approvalForAllEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}

export function createPublishedEvent(
  author: Address,
  catagory: string,
  subcatagory: string,
  title: string,
  description: string,
  price: BigInt
): Published {
  let publishedEvent = changetype<Published>(newMockEvent())

  publishedEvent.parameters = new Array()

  publishedEvent.parameters.push(
    new ethereum.EventParam("author", ethereum.Value.fromAddress(author))
  )
  publishedEvent.parameters.push(
    new ethereum.EventParam("catagory", ethereum.Value.fromString(catagory))
  )
  publishedEvent.parameters.push(
    new ethereum.EventParam(
      "subcatagory",
      ethereum.Value.fromString(subcatagory)
    )
  )
  publishedEvent.parameters.push(
    new ethereum.EventParam("title", ethereum.Value.fromString(title))
  )
  publishedEvent.parameters.push(
    new ethereum.EventParam(
      "description",
      ethereum.Value.fromString(description)
    )
  )
  publishedEvent.parameters.push(
    new ethereum.EventParam("price", ethereum.Value.fromUnsignedBigInt(price))
  )

  return publishedEvent
}

export function createPurchaseRightToReadEvent(
  author: Address,
  owner: Address,
  reader: Address,
  tokenId: BigInt,
  title: string,
  price: BigInt
): PurchaseRightToRead {
  let purchaseRightToReadEvent = changetype<PurchaseRightToRead>(newMockEvent())

  purchaseRightToReadEvent.parameters = new Array()

  purchaseRightToReadEvent.parameters.push(
    new ethereum.EventParam("author", ethereum.Value.fromAddress(author))
  )
  purchaseRightToReadEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  purchaseRightToReadEvent.parameters.push(
    new ethereum.EventParam("reader", ethereum.Value.fromAddress(reader))
  )
  purchaseRightToReadEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  purchaseRightToReadEvent.parameters.push(
    new ethereum.EventParam("title", ethereum.Value.fromString(title))
  )
  purchaseRightToReadEvent.parameters.push(
    new ethereum.EventParam("price", ethereum.Value.fromUnsignedBigInt(price))
  )

  return purchaseRightToReadEvent
}

export function createTransferEvent(
  from: Address,
  to: Address,
  tokenId: BigInt
): Transfer {
  let transferEvent = changetype<Transfer>(newMockEvent())

  transferEvent.parameters = new Array()

  transferEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )

  return transferEvent
}

export function createWithdrawlEvent(
  withdrawer: Address,
  amount: BigInt
): Withdrawl {
  let withdrawlEvent = changetype<Withdrawl>(newMockEvent())

  withdrawlEvent.parameters = new Array()

  withdrawlEvent.parameters.push(
    new ethereum.EventParam(
      "withdrawer",
      ethereum.Value.fromAddress(withdrawer)
    )
  )
  withdrawlEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return withdrawlEvent
}

export function createWithdrawlComissionEvent(
  withdrawer: Address,
  amount: BigInt
): WithdrawlComission {
  let withdrawlComissionEvent = changetype<WithdrawlComission>(newMockEvent())

  withdrawlComissionEvent.parameters = new Array()

  withdrawlComissionEvent.parameters.push(
    new ethereum.EventParam(
      "withdrawer",
      ethereum.Value.fromAddress(withdrawer)
    )
  )
  withdrawlComissionEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return withdrawlComissionEvent
}

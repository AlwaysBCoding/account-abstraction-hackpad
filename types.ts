import { BytesLike } from "ethers";

export interface UserOperation {
  sender: string
  nonce?: number
  initCode?: BytesLike
  callData?: BytesLike
  callGasLimit?: number
  verificationGasLimit?: number
  preVerificationGas?: number
  maxFeePerGas?: number
  maxPriorityFeePerGas?: number
  paymasterAndData?: BytesLike
  signature?: BytesLike
}

const ETH_SEND_USER_OPERATION = "eth_sendUserOperation";
const ETH_CALL_USER_OPERATION = "eth_callUserOperation";
const ETH_SUPPORTED_CHAIN_IDS = "eth_supportedChainIds";
const ETH_SUPPORTED_ENTRYPOINTS = "eth_supportedEntryPoints";

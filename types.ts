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

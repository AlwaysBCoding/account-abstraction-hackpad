import { UserOperation } from "./types";
import { AbiCoder, keccak256, BytesLike, JsonRpcPayload } from "ethers";
import * as RPC from "./rpc";

const defaultABICoder = AbiCoder.defaultAbiCoder();

const userOp: UserOperation = {
  sender: "0xE092D0A9148f06B0CF0Ee05B725564b8fE09412e",
  nonce: 0,
  initCode: '0x',
  callData: '0x',
  callGasLimit: 0,
  verificationGasLimit: 0,
  preVerificationGas: 0,
  maxFeePerGas: 0,
  maxPriorityFeePerGas: 0,
  paymasterAndData: '0x'
};

export const packUserOp = (op: UserOperation): string => {
  const typeValues = [
    { type: 'address', val: op.sender },
    { type: 'uint256', val: op.nonce },
    { type: 'bytes', val: op.initCode },
    { type: 'bytes', val: op.callData },
    { type: 'uint256', val: op.callGasLimit },
    { type: 'uint256', val: op.verificationGasLimit },
    { type: 'uint256', val: op.preVerificationGas },
    { type: 'uint256', val: op.maxFeePerGas },
    { type: 'uint256', val: op.maxPriorityFeePerGas },
    { type: 'bytes', val: op.paymasterAndData }
  ];

  const types = typeValues.map(typeValue => typeValue.type === 'bytes' ? 'bytes32' : typeValue.type);
  const values = typeValues.map(typeValue => typeValue.type === 'bytes' ? keccak256(typeValue.val as BytesLike) : typeValue.val);
  return defaultABICoder.encode(types, values);
}

export const getUserOpHash = (op: UserOperation, entrypoint: string, chainId: number): string => {
  const userOpHash = keccak256(packUserOp(op));
  const enc = defaultABICoder.encode(
    ['bytes32', 'address', 'uint256'],
    [userOpHash, entrypoint, chainId]
  );
  return keccak256(enc);
}

const encoded = packUserOp(userOp);

const payload: JsonRpcPayload = {
  id: 1,
  jsonrpc: '2.0',
  method: RPC.ETH_SEND_USER_OPERATION,
  params: [encoded]
}

console.log(payload);

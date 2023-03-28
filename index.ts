import { UserOperation } from "./types";
import { AbiCoder, keccak256, BytesLike } from "ethers";

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
  // const userOpType = {
  //   components: [
  //     { type: 'address', name: 'sender' },
  //     { type: 'uint256', name: 'nonce' },
  //     { type: 'bytes', name: 'initCode' },
  //     { type: 'bytes', name: 'callData' },
  //     { type: 'uint256', name: 'callGasLimit' },
  //     { type: 'uint256', name: 'verificationGasLimit' },
  //     { type: 'uint256', name: 'preVerificationGas' },
  //     { type: 'uint256', name: 'maxFeePerGas' },
  //     { type: 'uint256', name: 'maxPriorityFeePerGas' },
  //     { type: 'bytes', name: 'paymasterAndData' },
  //     { type: 'bytes', name: 'signature' }
  //   ],
  //   name: 'userOp',
  //   type: 'tuple'
  // };
  // let encoded = defaultABICoder.encode([userOpType as any], [{ ...op, signature: '0x' }]);
  // encoded = `0x${encoded.slice(66, encoded.length - 64)}`;
  // return encoded;

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

  const types = typeValues.map(typeValue => typeValue.type);
  const values = typeValues.map((typeValue) => typeValue.type === 'bytes' ? keccak256(typeValue.val as BytesLike) : typeValue.val);
  return defaultABICoder.encode(types, values);
}

const encoded = packUserOp(userOp);
console.log(`GOT ENCODED`);
console.log(encoded);

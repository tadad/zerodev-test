import { createKernelAccount, createKernelAccountClient, createZeroDevPaymasterClient } from "@zerodev/sdk"
import { KERNEL_V3_1 } from "@zerodev/sdk/constants"
import { signerToEcdsaValidator } from "@zerodev/ecdsa-validator"
import { http, createPublicClient, zeroAddress, Client } from "viem"
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts"
import { chain } from "./chain"
import { bundlerActions, ENTRYPOINT_ADDRESS_V07} from "permissionless"
import {ENTRYPOINT_ADDRESS_V07_TYPE} from "permissionless/types"
 
const BUNDLER_RPC = "http://localhost:3000";
 
const entryPoint = "0x86247c105F2220b4a8fEf4e354B1b91Ba1B60d3A" as ENTRYPOINT_ADDRESS_V07_TYPE
const kernelVersion = KERNEL_V3_1
 
const main = async () => {
  // Construct a signer
  const privateKey = generatePrivateKey()
  const signer = privateKeyToAccount(privateKey)
 
  // Construct a public client
  const publicClient = createPublicClient({
    transport: http(BUNDLER_RPC),
  })
 
  // Construct a validator
  const ecdsaValidator = await signerToEcdsaValidator(publicClient, {
    signer,
    entryPoint,
    kernelVersion
  })
 
  // Construct a Kernel account
  const account = await createKernelAccount(publicClient, {
    plugins: {
      sudo: ecdsaValidator,
    },
    entryPoint,
    kernelVersion
  })
 
  // // Construct a Kernel account client
  // const kernelClient = createKernelAccountClient({
  //   account,
  //   chain,
  //   entryPoint,
  //   bundlerTransport: http(BUNDLER_RPC),
  // })
 
  // const accountAddress = kernelClient.account.address
  // console.log("My account:", accountAddress)
 
  // // Send a UserOp
  // const userOpHash = await kernelClient.sendUserOperation({
  //   userOperation: {
  //     callData: await kernelClient.account.encodeCallData({
  //       to: zeroAddress,
  //       value: BigInt(0),
  //       data: "0x",
  //     }),
  //   },
  // })
 
  // console.log("UserOp hash:", userOpHash)
  // console.log("Waiting for UserOp to complete...")
 
//   const bundlerClient = kernelClient.extend(bundlerActions(entryPoint));
//   await bundlerClient.waitForUserOperationReceipt({
//     hash: userOpHash,
//   })
 
//   console.log("View completed UserOp here: https://jiffyscan.xyz/userOpHash/" + userOpHash)
}
 
main()

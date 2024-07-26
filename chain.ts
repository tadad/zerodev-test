import { defineChain } from "viem"

export const chain = defineChain({
  id: 88507,
  name: "My Rollup",
  nativeCurrency: {
    name: "Ether",
    symbol: "ETH",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ["https://rpc-drew-aa-test-op-5dykmgrtje.t.conduit-stg.xyz"],
    },
  },
})
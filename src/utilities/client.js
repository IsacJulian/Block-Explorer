import { http, createPublicClient, createWalletClient } from "https://esm.sh/viem";
import { localhost } from "https://esm.sh/viem/chains";

export const newPublicClient = () => {
return createPublicClient({
    chain: localhost,
    transport: http("http://localhost:7545"),
});
};


export const newWalletClient = () => {
return createWalletClient({
    chain: localhost,
    transport: http("http://localhost:7545"),
});
};
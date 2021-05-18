// This is a JavaScript module that is loaded on demand. It can export any number of
// functions, and may import other JavaScript modules if required.

export async function checkMetaMask() {
    // Modern dapp browsers...
    if (window.ethereum) {
        if (ethereum.selectedAddress === null) {
            try {
                // Request account access if needed
                await requestAccounts();
            } catch (error) {
                // User denied account access...
            }
        }
    }
    // Non-dapp browsers...
    else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
}

export async function requestAccounts() {
    var result = await ethereum.request({
        method: 'eth_requestAccounts',
    });

    return result;
}

export function isSiteConnected() {
    return (window.ethereum != undefined && ethereum.selectedAddress != undefined);
}

export async function getSelectedAddress() {
    await checkMetaMask();

    return ethereum.selectedAddress;
}

export async function getTransactionCount() {
    await checkMetaMask();

    var result = await ethereum.request({
        method: 'eth_getTransactionCount',
        params:
            [
                ethereum.selectedAddress,
                'latest'
            ]

    });
   return result;
}

export async function signTypedData(label, value) {
    await checkMetaMask();

    const msgParams = [
        {
            type: 'string', // Valid solidity type
            name: label,
            value: value
        }
    ]

    var result = await ethereum.request({
        method: 'eth_signTypedData',
        params:
            [
                msgParams,
                ethereum.selectedAddress
            ]
    });

    return result;
}

export async function genericRpc(method, params) {
    await checkMetaMask();

    var result = await ethereum.request({
        method: method,
        params: params
    });

    return result;
}
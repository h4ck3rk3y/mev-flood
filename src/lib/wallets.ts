import { Wallet } from "ethers"
import env from './env'

import minionWallets from "../output/wallets.json"
import { getSearchArgs } from './cliArgs'

/**
 * Gets array of wallet(s) for given program according to CLI input.
 * @param programName Name of program/script being run (see `package.json` scripts).
 * @returns array of wallets from `src/output/wallets.json`
 */
export const getSearchWalletSet = (programName: string) => {
    const {startIdx, endIdx} = getSearchArgs(programName)
    const wallets = getWalletSet(parseInt(startIdx), parseInt(endIdx))
    return wallets
}

export const getWalletSet = (startIdx: number, endIdx: number) => {
    const wallets = minionWallets
        .slice(startIdx, endIdx)
        .map(wallet => new Wallet(wallet.privateKey))
    console.log("using the following wallet(s)", wallets.map(w => w.address))
    return wallets
}

export const getAdminWallet = () => new Wallet(env.ADMIN_PRIVATE_KEY)
export const getTestWallet = () => new Wallet(env.TEST_PRIVATE_KEY)

const {
  Connection,
  PublicKey,
  clusterApiUrl,
  Keypair,
  LAMPORTS_PER_SOL,
} = require('@solana/web3.js')

const wallet = new Keypair()

const pk = new PublicKey(wallet.publicKey)
const sk = wallet.secretKey

const getWalletBalance = async () => {
  try {
    const conn = new Connection(clusterApiUrl('devnet'), 'confirmed')
    const walletBalance = await conn.getBalance(pk)
    console.log(`Wallet balance: ${walletBalance}`)
  } catch (e) {
    console.log(e)
  }
}

const airDropSol = async () => {
  try {
    const conn = new Connection(clusterApiUrl('devnet'), 'confirmed')
    const fromAirDropSignature = await conn.requestAirdrop(
      pk,
      2 * LAMPORTS_PER_SOL
    )
    await conn.confirmTransaction(fromAirDropSignature)
  } catch (e) {
    console.log(e)
  }
}

const main = async () => {
  await getWalletBalance()
  await airDropSol()
  await getWalletBalance()
}

main()

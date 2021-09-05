import { TransactionService } from "./src/lib/transactions/TransactionService";

const main = async () => {

    const transactionService = new TransactionService();
    await transactionService.init({
        nameTokenOne: 'ETH',
        nameTokenTwo: 'BNB',
        nameFactory: 'BUSD'
    })

    setInterval(async () => {
        const transactions = await transactionService.getTransactions();
        console.log(transactions);
    }, 500);
}

main().catch(err => console.error(err));
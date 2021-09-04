# SDK 

## Requirement
- Web3js

## How to use

```typescript
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
```

## Data format

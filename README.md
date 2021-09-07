## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

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

## Data example

```typescript
[
  {
    address: '0x74E4716E431f45807DCF19f284c7aA99F18a4fbc',
    time: 2021-09-04T13:13:09.793Z,
    tx: '0x84da3fa8643b939aa55f923176f2d4876300d1294388990018cd402c68ce91fa',
    type: 'BUY',
    numberTokenOne: 0.006452854182953973,
    numberTokenTwo: 0.05,
    price: 25.308602076764295,
    pricePerToken: 3922.0787203932414
  }
]
```

## Todo
- [ ] Query pairAddress from backend
- [ ] Query abi from backend

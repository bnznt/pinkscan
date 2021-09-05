import { getPairAddress, getABI } from '../utils/utils';
import { WEB3_HTTP_PROVIDER } from '../constants';
import Web3 from 'web3'
import { AbiItem } from 'web3-utils'
import { Contract } from 'web3-eth-contract';

enum TransactionType {
    SELL = "SELL",
    BUY = "BUY"
}

interface ConstructorParams {
    nameTokenOne: string,
    nameTokenTwo: string,
    nameFactory: string
}

interface TransactionRepository {
    address: string,
    time: Date,
    tx: string,
    type: TransactionType,
    numberTokenOne: number,
    numberTokenTwo: number,
    price: number,
    pricePerToken: number
}

class TransactionService {
    private nameTokenOne: string;
    private nameTokenTwo: string;
    private nameFactory: string;
    private pairAddress: string;
    private pairABI: AbiItem | AbiItem[];
    private web3: Web3;
    private pairContract: Contract;
    private factoryAddress: string;
    private factoryABI: AbiItem | AbiItem[];
    private factoryContract: Contract;

    public async init(params: ConstructorParams) {
        this.web3 = new Web3(new Web3.providers.HttpProvider(WEB3_HTTP_PROVIDER));
        this.nameTokenOne = params.nameTokenOne;
        this.nameTokenTwo = params.nameTokenTwo;
        this.nameFactory = params.nameFactory;
        this.pairAddress = getPairAddress(this.nameTokenOne, this.nameTokenTwo);
        this.pairABI = await getABI(this.pairAddress);
        this.pairContract = new this.web3.eth.Contract(this.pairABI, this.pairAddress);
        this.factoryAddress = getPairAddress(this.nameTokenTwo, this.nameFactory);
        this.factoryABI = await getABI(this.factoryAddress);
        this.factoryContract = new this.web3.eth.Contract(this.factoryABI, this.factoryAddress);
    }

    /**
     * Returns an transactions
     */
    public async getTransactions(): Promise<TransactionRepository[]> {
        const events = await this.pairContract.getPastEvents("Swap");
        const factory = await this.factoryContract.methods.getReserves().call();
        let transactions: TransactionRepository[] = [];
        for (let event of events) {
            const tx = event.transactionHash;
            const type = event.returnValues.amount0In > event.returnValues.amount1In ? TransactionType.SELL : TransactionType.BUY;
            let numberTokenOne = (Number(event.returnValues.amount0In) + Number(event.returnValues.amount1In)) / 1e18;
            let numberTokenTwo = (Number(event.returnValues.amount0Out) + Number(event.returnValues.amount1Out)) / 1e18;
            if (type == "BUY") {
                [numberTokenOne, numberTokenTwo] = [numberTokenTwo, numberTokenOne];
            }
            let price = numberTokenTwo * factory._reserve1 / factory._reserve0;
            let pricePerToken = price / numberTokenOne;
            transactions.push({
                address: this.pairAddress,
                time: new Date(),
                tx,
                type,
                numberTokenOne,
                numberTokenTwo,
                price,
                pricePerToken
            })
        }
        return transactions;
    }
}

export { TransactionService };

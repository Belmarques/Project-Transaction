export type Transaction = {
  transactionId : number,
  date : Date,
  value : number,
  cashback : number,
  accountId : number
}
export interface TransactionSchema {
  transactionId: number;
  date: Date;
  value: number;
  cashback: number;
  accountId: number;
}

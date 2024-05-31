#!/usr/bin/env node
import inquirer from 'inquirer';
import chalk from 'chalk';

  class Customer{
    firstname:string
    lastname:string
    age:number
    gender:string
    mobNumber:number
    accNumber:number
    constructor( firstname:string,lastname:string,age:number,gender:string,mobNumber:number,accNumber:number)

    {this.firstname=firstname;
    this.lastname=lastname;
    this.age=age;
    this.gender=gender;
    this.mobNumber=mobNumber;
    this.accNumber=accNumber;

} }
interface BankAccount {
    accNumber:number;
    balance:number;
}
class Bank{
    customer:Customer[]=[]
    account:BankAccount[]=[]
    addcustomer(obj:Customer){this.customer.push(obj)}
    addaccountnum(obj:BankAccount){this.account.push(obj)}
    transcation(accObj: BankAccount){let NewAccounts = this.account. filter(
(асс) => acc.accNumber !== accObj.accNumber
);
this.account = [...NewAccounts, accObj];
}
let MyBank=new Bank()

const cus1=new Customer("Nida","Pervez",32,"female",3322,1001)
const cus2=new Customer("Hira","Mumtaz",33,"female",3322,1002)
const cus3=new Customer("Anum","Jillani",34,"female",3322,1003)
MyBank.addcustomer(cus1)
MyBank.addcustomer(cus2)
MyBank.addcustomer(cus3)
MyBank.addaccountnum({accNumber:1001, balance:5000})
MyBank.addaccountnum({accNumber:1002,balance:4000})
MyBank.addaccountnum({accNumber:1003, balance:3000})
console.log(MyBank)

// Bank Functionality
async function bankService(bank: Bank) {
    do{{
        let service=await inquirer.prompt({
            type:"list",
            name:"select",
            message:"Please select the Service",
            choices:["View Balance","Cash Withdraw","Cash Deposit","Exit"]
    });
            choices:["View Balance","Cash Withdraw","Cash Deposit","Exit"]
    if(service.select=="View Balance")
        let res=await inquirer.prompt({
            type:"input",
            name:"num",
            message:"Please Enter your Account number",
        })
    let account = MyBank.account.find((acc)=>acc.accNumber == res.num)
    if (!account) {
    console. log(chalk.red.bold("Invalid Account Number"));}
    if (account){
        let name = MyBank.customer.find((item) =>item.accNumber == account?.accNumber);}
            console.log(`Dear ${chalk.green.italic(name?.firstName)} ${chalk.green.italic(name?.lastName)} your Account Balance 
            is ${chalk.bold.blueBright(`$${account.balance}`))}
    
    
       if(service.select == "Cash Withdraw")
      let res = await inquirer.prompt({
      type:"input",
      name:"num",
       message: "Please Enter your Account}):
      let account = myBank.account. find((acc)=>acc.accNumber==res.num)
       if (!account){
        console.log(chalk.red.bold.italic("InValid Account Number")
    
        if (account) {
    let ans =await inquirer.prompt({
    type:"number",
    message:"Please Enter your amount.",
    name: "rupee",
    })
    if(ans. rupee › account.balance)f
    console. log(chalk.red.bold("insufficient balance")
    let newBalance = account.balance - ans. rupee
    bank.transcation({ accNumber: account.accNumber,balance:newBalance });}
    
    if(service.select == "Cash Deposit")
        let res = await inquirer.prompt({
        type:"input",
        name:"num",
         message: "Please Enter your Account}):
        let account = myBank.account. find((acc)=>acc.accNumber==res.num)
         if (!account){
          console.log(chalk.red.bold.italic("InValid Account Number")
      
          if (account) {
      let ans =await inquirer.prompt({
      type:"number",
      message:"Please Enter your amount.",
      name: "rupee",
      })
      let newBalance = account.balance +ans. rupee
      bank.transcation({ accNumber: account.accNumber,balance:newBalance });
      if (service.select=="Exit"){
        return;}
        

    }
      
    
    
    
       }
    }while(true)
}
bankService(MyBank)



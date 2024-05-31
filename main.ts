#!/usr/bin/env node
import inquirer from 'inquirer';
import chalk from 'chalk';

class Customer {
    firstName: string;
    lastName: string;
    age: number;
    gender: string;
    mobNumber: number;
    accNumber: number;

    constructor(firstName: string, lastName: string, age: number, gender: string, mobNumber: number, accNumber: number) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.gender = gender;
        this.mobNumber = mobNumber;
        this.accNumber = accNumber;
    }
}

interface BankAccount {
    accNumber: number;
    balance: number;
}

class Bank {
    customers: Customer[] = [];
    accounts: BankAccount[] = [];

    addCustomer(obj: Customer) {
        this.customers.push(obj);
    }

    addAccount(obj: BankAccount) {
        this.accounts.push(obj);
    }

    transaction(accObj: BankAccount) {
        let newAccounts = this.accounts.filter(acc => acc.accNumber !== accObj.accNumber);
        this.accounts = [...newAccounts, accObj];
    }
}

const MyBank = new Bank();

const cus1 = new Customer("Nida", "Pervez", 32, "female", 3322, 1001);
const cus2 = new Customer("Hira", "Mumtaz", 33, "female", 3322, 1002);
const cus3 = new Customer("Anum", "Jillani", 34, "female", 3322, 1003);

MyBank.addCustomer(cus1);
MyBank.addCustomer(cus2);
MyBank.addCustomer(cus3);

MyBank.addAccount({ accNumber: 1001, balance: 5000 });
MyBank.addAccount({ accNumber: 1002, balance: 4000 });
MyBank.addAccount({ accNumber: 1003, balance: 3000 });

async function bankService(bank: Bank) {
    do {
        const { select } = await inquirer.prompt({
            type: "list",
            name: "select",
            message: "Please select the Service",
            choices: ["View Balance", "Cash Withdraw", "Cash Deposit", "Exit"]
        });

        if (select === "View Balance") {
            const { num } = await inquirer.prompt({
                type: "input",
                name: "num",
                message: "Please Enter your Account number",
            });

            const account = bank.accounts.find(acc => acc.accNumber === parseInt(num));
            if (!account) {
                console.log(chalk.red.bold("Invalid Account Number"));
            } else {
                const customer = bank.customers.find(cust => cust.accNumber === account.accNumber);
                console.log(`Dear ${chalk.green.italic(customer?.firstName)} ${chalk.green.italic(customer?.lastName)} your Account Balance is ${chalk.bold.blueBright(`$${account.balance}`)}`);
            }
        }

        if (select === "Cash Withdraw" || select === "Cash Deposit") {
            const { num } = await inquirer.prompt({
                type: "input",
                name: "num",
                message: "Please Enter your Account number",
            });

            const account = bank.accounts.find(acc => acc.accNumber === parseInt(num));
            if (!account) {
                console.log(chalk.red.bold("Invalid Account Number"));
            } else {
                const { rupee } = await inquirer.prompt({
                    type: "number",
                    message: "Please Enter your amount.",
                    name: "rupee",
                });

                if (select === "Cash Withdraw" && rupee > account.balance) {
                    console.log(chalk.red.bold("Insufficient balance"));
                } else {
                    const newBalance = select === "Cash Withdraw" ? account.balance - rupee : account.balance + rupee;
                    bank.transaction({ accNumber: account.accNumber, balance: newBalance });
                }
            }
        }

        if (select === "Exit") {
            return;
        }

    } while (true);
}

bankService(MyBank);

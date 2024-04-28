#!/usr/bin/env node

import inquirer from 'inquirer';

enum Currency {
    USD = "USD",
    PKR = "PKR"
}

const usdToPkrRate: number = 280; // Assuming 1 USD = 280 PKR

function convert(amount: number, fromCurrency: Currency, toCurrency: Currency): number {
    if (fromCurrency === Currency.USD && toCurrency === Currency.PKR) {
        return amount * usdToPkrRate;
    } else if (fromCurrency === Currency.PKR && toCurrency === Currency.USD) {
        return amount / usdToPkrRate;
    } else {
        throw new Error("Unsupported conversion");
    }
}

async function runConverter() {
    const questions = [
        {
            type: 'list',
            name: 'fromCurrency',
            message: 'Select the currency you want to convert from:',
            choices: [Currency.USD, Currency.PKR]
        },
        {
            type: 'input',
            name: 'amount',
            message: 'Enter the amount you want to convert:'
        },
        {
            type: 'list',
            name: 'toCurrency',
            message: 'Select the currency you want to convert to:',
            choices: [Currency.USD, Currency.PKR]
        }
    ];

    const answers = await inquirer.prompt(questions);
    const { amount, fromCurrency, toCurrency } = answers;
    const convertedAmount = convert(parseFloat(amount), fromCurrency, toCurrency);
    console.log(`${amount} ${fromCurrency} is equal to ${convertedAmount.toFixed(2)} ${toCurrency}`);
}

runConverter();
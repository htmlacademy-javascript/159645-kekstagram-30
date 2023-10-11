// Функцию для проверки длины строки
const validateForm = (string, maxStringLength) => string.length <= maxStringLength;

validateForm('проверяемая строка', 20); // true
//console.log(validateForm('проверяемая строка', 20));
validateForm('проверяемая строка', 18); // true
//console.log(validateForm('проверяемая строка', 18));
validateForm('проверяемая строка', 10); // false
//console.log(validateForm('проверяемая строка', 10));

//Функция для проверки, является ли строка палиндромом
const isPalindrome = (string) => {
  const caseString = string.toLowerCase().replaceAll(' ', '');
  const reversString = caseString.split('').reverse().join('');
  return reversString === caseString;
};

isPalindrome('топот'); // true
// console.log(isPalindrome('топот'));
isPalindrome('ДовОд'); // true
// console.log(isPalindrome('ДовОд'));
isPalindrome('Кекс'); // false
// console.log(isPalindrome('Кекс'));
isPalindrome('Лёша на полке клопа нашёл '); // true
// console.log(isPalindrome('Лёша на полке клопа нашёл '));

/* Функция принимает строку, извлекает содержащиеся в ней цифры от 0 до 9
и возвращает их в виде целого положительного числа */
const extractNumber = (string) => {
  string = String(string);
  let result = '';
  for (let i = 0; i < string.length; i++) {
    if (!Number.isNaN(parseInt(string[i], 10))) {
      result += string[i];
    }
  }
  return parseInt(result, 10);
};

extractNumber('2023 год'); // 2023
// console.log(extractNumber('2023 год'));
extractNumber('ECMAScript 2022'); // 2022
// console.log(extractNumber('ECMAScript 2022'));
extractNumber('1 кефир, 0.5 батона'); // 105
// console.log(extractNumber('1 кефир, 0.5 батона'));
extractNumber('агент 007'); // 7
// console.log(extractNumber('агент 007'));
extractNumber('а я томат'); // NaN
// console.log(extractNumber('а я томат'));
extractNumber(2023); // 2023
// console.log(extractNumber(2023));
extractNumber(-1); // 1
// console.log(extractNumber(-1));
extractNumber(1.5); // 15
// console.log(extractNumber(1.5));

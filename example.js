function reverse(date) {
    if (!(date instanceof Date)) throw new Error ('Not a Date Object');
    let day = date.getDate().toString();
    if (day < 10) day = '0'.concat(day);
    let month = (date.getMonth() + 1).toString();
    if (month < 10) month = '0'.concat(month);
    let year = date.getFullYear().toString();
    return year + month + day;
}


function reverse2(str) {
    let str1 = str.substr(0,4) + '-' + str.substr(4,2) + '-' + str.substr(6,2);
    let date = new Date(Date.parse(str1));
    return date;
}


function reverse3(str) {
    //1 return str.split('').reverse().join('');
    //2 let array = [];
    // for (i = 0; i < str.length; i++) {
    //     array.unshift(str[i]);
    // }
    // return array.join('');
    
}

function countCharacter(str, char) {
    if (str.includes(char)) {
        let pos = 0;
        let count = 0;
        while(true) {
            let foundPos = str.indexOf(char,pos);
            if (foundPos == -1) 
                break;
            else
                count++;
            pos = foundPos + 1;
        }
        return count;
    }
    else 
        return 'Symbol not found';
}

function replaceCharacter(str, findChar, replaceChar) {
    if (str.includes(findChar)) {
        let pos = 0;
        let newStr = '';
        while (true) {
            let foundPos = str.indexOf(findChar, pos);
            if (foundPos == -1) {
                newStr = newStr.concat(str.substr(pos));
                break;
            }
            else {
                newStr = newStr + str.substring(pos, foundPos).concat(replaceChar);
                pos = foundPos + 1;
            }
        }
        return newStr;
    }
    else 
        return 'Symbol not found';
}

// function solution(n, m) {
//     let result = [];
//     if (typeof n == 'bigint' && typeof m == 'bigint') {
//         n = BigInt(n);
//         m = BigInt(m);
//     }
//     for (i = n; i <= m; i++) {
//         let array = [];
//         for (j = 2n; j < i; j++) {
//             if (i % j == 0) {
//                 array.push(j);
//             }
//         }
//         if (array.length == 3) {
//             result.push(i);
//         }
//     }
//     return result;
// }


function swapFirstandLast (str) {
    let array = str.split('');
    let first = array.shift();
    let last = array.pop();
    array.push(first);
    array.unshift(last);
    return array.join('');
}

function isAnagram(str1, str2) {
    let array1 = str1.toLowerCase().split('');
    let array2 = str2.toLowerCase().split('');
    array1 = array1.sort((a, b) => a.localeCompare(b)).join('');
    array2 = array2.sort((a, b) => a.localeCompare(b)).join('');
    return (array1.localeCompare(array2) == 0) ? true : false;
}


//ContactManager

class IContact {
    constructor(name, number) {
        this.name = name;
        this.number = number;
    };
}

class ContactManager {
    constructor(name) {
        this.contacts = [];
        this.name = name;
    }
    
    addContact(IContact) {
        this.contacts.push(IContact);
    }

    showContact() {
        let str = '';
        for (let i = 0; i < this.contacts.length; i++) {
            str = str + `${i+1}. Name: ${this.contacts[i].name}, Number: ${this.contacts[i].number};<br>`;
        }
        return str;
    }

    deleteContact(i) {
        this.contacts.splice(i-1,1);
    }
}


function foundName(numbers) {
    let newArray = [];
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < numbers.length; j++) {
            if (array[i].number == numbers[j]) {
                newArray.push(array[i].name);
            }
        }
    }
    return newArray;
}


let arrayOfManagers = [];
const newContact_name  = document.getElementById("newContact_name");
const newContact_number  = document.getElementById("newContact_number");
const addButton = document.getElementById("createContact");
const text_hello = document.getElementById("sign_in");
const newName = document.getElementById("name");
const block_addContact = document.getElementById("block_addContact");
const text_successCreated = document.getElementById("text_successCreated");
const text_yourContacts = document.getElementById("text_yourContacts");
const block_showContact = document.getElementById("block_showContact");
const enter_name = document.getElementById("enter_name");
const sign_in_text = document.getElementById("sign_in_text");
const sign_out_text = document.getElementById("sign_out");
const nameContact = document.getElementById("nameContact");
const text_delete = document.getElementById("text_delete");


function createContactManager() {
    localStorage.setItem(newName.value, JSON.stringify(new ContactManager(newName.value)));
    text_hello.innerHTML = 'Successfully created';
    block_addContact.style.display = "none";
    text_successCreated.style.display = "none";
    block_showContact.style.display = "none";
    text_hello.style.display = "";
}

function sign_in() {
    if (JSON.parse(localStorage.getItem(newName.value)) === null) {
        text_hello.innerHTML = 'CM not found';
        block_addContact.style.display = "none";
        block_showContact.style.display = "none";
        text_yourContacts.style.display = "none";
        return;
    }
    if (JSON.parse(localStorage.getItem(newName.value)).name == newName.value) {
        text_hello.innerHTML = 'Hello, ' + newName.value;
        block_addContact.style.display = "";
        block_showContact.style.display = "";
        text_successCreated.style.display = "none";
        text_yourContacts.style.display = "none";
        enter_name.style.display = "none";
        sign_in_text.style.display = "none";
        sign_out_text.style.display = "";
        text_hello.style.display = "";
    }
    else {
        text_hello.innerHTML = 'CM not found';
        block_addContact.style.display = "none";
        block_showContact.style.display = "none";
        text_yourContacts.style.display = "none";
    }
    
}

function addContact() {
    if (JSON.parse(localStorage.getItem(newName.value)).name == newName.value) {
        const newContact = new IContact(newContact_name.value, newContact_number.value);
        let newCM = new ContactManager(JSON.parse(localStorage.getItem(newName.value)).name);
        newCM.contacts = JSON.parse(localStorage.getItem(newName.value)).contacts;
        newCM.addContact(newContact);
        localStorage.setItem(newName.value, JSON.stringify(newCM));
        text_successCreated.style.display = "";
    }
}

function showContact() {
    if (JSON.parse(localStorage.getItem(newName.value)).name == newName.value) {
        let newCM = new ContactManager(JSON.parse(localStorage.getItem(newName.value)).name);
        newCM.contacts = JSON.parse(localStorage.getItem(newName.value)).contacts;
        text_yourContacts.innerHTML = newCM.showContact();
        text_yourContacts.style.display = "";
        text_delete.style.display = "none";
    }
}

function sign_out() {
        block_addContact.style.display = "none";
        block_showContact.style.display = "none";
        text_yourContacts.style.display = "none";
        text_successCreated.style.display = "none";
        enter_name.style.display = "";
        sign_in_text.style.display = "";
        text_hello.style.display = "none";
        sign_out_text.style.display = "none";
}

function deleteContacts() {
    if (JSON.parse(localStorage.getItem(newName.value)).name == newName.value) {
        if (JSON.parse(localStorage.getItem(newName.value)).contacts.length == 0) {
            text_delete.innerHTML = 'Сontacts are empty';
            text_delete.style.display = "";
        }
        else {
            let newCM = new ContactManager(JSON.parse(localStorage.getItem(newName.value)).name);
            newCM.contacts = JSON.parse(localStorage.getItem(newName.value)).contacts;
            newCM.deleteContact(+(nameContact.value));
            localStorage.setItem(newName.value, JSON.stringify(newCM));
            text_delete.innerHTML = 'Successfully deleted';
            text_delete.style.display = "";
        }
    }
}

function replacer(el) {
    el.value = el.value.replace(/[^+\d]/g, ''); 
}


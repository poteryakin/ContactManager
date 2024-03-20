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
            str = str + `${i+1}. Name: ${this.contacts[i].name}, Number: ${this.contacts[i].number};\n`;
        }
        return str;
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


function createContactManager() {
    localStorage.setItem(newName.value, JSON.stringify(new ContactManager(newName.value)));
    text_hello.innerHTML = 'Successfully created';
    block_addContact.style.display = "none";
    text_successCreated.style.display = "none";
    block_showContact.style.display = "none";
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
    }
}

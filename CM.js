
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
const enter_name = document.getElementById("label-text");
const sign_in_text = document.getElementById("sign_in_text");
const sign_out_text = document.getElementById("sign_out");
const nameContact = document.getElementById("nameContact");
const text_delete = document.getElementById("text_delete");
const table = document.getElementById("table");
const similar = document.getElementById("similar");


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
        text_hello.style.display = "";
        return;
    }
    if (JSON.parse(localStorage.getItem(newName.value)).name == newName.value) {
        text_hello.innerHTML = 'Hello, ' + newName.value;
        block_addContact.style.display = "block";
        block_showContact.style.display = "block";
        text_successCreated.style.display = "none";
        text_yourContacts.style.display = "none";
        enter_name.style.display = "none";
        sign_in_text.style.display = "none";
        sign_out_text.style.display = "block";
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
        table.style.display = "none";
        table.innerHTML = "";
        similar.removeAttribute('disabled');
        
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

function addSimilar() {
        let newCM = new ContactManager(JSON.parse(localStorage.getItem(newName.value)).name);
        newCM.contacts = JSON.parse(localStorage.getItem(newName.value)).contacts;
        let table1 = document.querySelector('#table')
        for (let i = 0; i < newCM.contacts.length; i++) {
            let tr = document.createElement('tr')
            let td = document.createElement('td');
            td.textContent = newCM.contacts[i].name;
            tr.appendChild(td);
            let td1 = document.createElement('td');
            td1.textContent = newCM.contacts[i].number;
            tr.appendChild(td1);
            let td2 = document.createElement('td');
            td2.textContent = document.createElement('input')
            table1.appendChild(tr);
        }
        table.style.display = "table";
        table1.addEventListener('click', e=> {
            try {
             newContact_name.value = e.target.closest('td:first-child').innerHTML;
            } catch (error) {
            
            }
        });
        table1.addEventListener('click', e=> {
            try {
                newContact_number.value = e.target.closest('td:last-child').innerHTML;
            } catch (error) {
            
            }
        });
        if (table.style.display == "table") {
            similar.setAttribute('disabled', '');
        }
        
}

function replacer(el) {
    el.value = el.value.replace(/[^+\d]/g, ''); 
}


function refresh() {
    table.innerHTML = '';
    addSimilar();
}



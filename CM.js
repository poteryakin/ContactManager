
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

    deleteContact(i) {
        this.contacts.splice(i-1,1);
    }
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
const main_info = document.getElementById("main_info");



function createContactManager() {
    localStorage.setItem(newName.value, JSON.stringify(new ContactManager(newName.value)));
    text_hello.textContent = 'Successfully created';
    display_off([block_addContact, text_successCreated, block_showContact]);
    text_hello.style.display = "";
}

function sign_in() {
    const name_cm = JSON.parse(localStorage.getItem(newName.value));
    if (name_cm === null) {
        text_hello.textContent = 'CM not found';
        display_off([block_addContact, block_showContact, text_yourContacts]);
        return;
    }
    if (name_cm.name == newName.value) {
         text_hello.textContent = 'Hello, ' + newName.value;
         display_off([sign_in_text]);
        display_on([block_addContact, block_showContact, sign_out_text, text_hello]);
        showContact();
    }
    else {
        text_hello.textContent = 'CM not found';
        display_off([block_addContact, block_showContact, text_yourContacts]);
    }
    
}

function addContact() {
    const name_cm = JSON.parse(localStorage.getItem(newName.value));
    if (name_cm.name == newName.value) {
        const newContact = new IContact(newContact_name.value, newContact_number.value);
        let newCM = new ContactManager(name_cm.name);
        newCM.contacts = name_cm.contacts;
        newCM.addContact(newContact);
        localStorage.setItem(newName.value, JSON.stringify(newCM));
        text_successCreated.style.display = "";
    }
    showContact();
    newContact_name.value = '';
    newContact_number.value = '';
}

function showContact() {
    const name_cm = JSON.parse(localStorage.getItem(newName.value));
    if (name_cm.name == newName.value) {
        let newCM = new ContactManager(name_cm.name);
        newCM.contacts = name_cm.contacts;
        text_yourContacts.innerText = newCM.showContact();
        display_on([text_yourContacts]);
        display_off([text_delete]);
    }
}

function sign_out() {
        display_off([block_addContact, block_showContact, text_yourContacts, text_successCreated, text_hello, sign_out_text, table]);
         display_on([sign_in_text]);
        table.textContent = "";
        similar.removeAttribute('disabled');
        
}

function deleteContacts() {
    const name_cm = JSON.parse(localStorage.getItem(newName.value));
    if (name_cm.name == newName.value) {
        if (name_cm.contacts.length == 0) {
            text_delete.textContent = 'Сontacts are empty';
            display_on([text_delete]);
        }
        else {
            let newCM = new ContactManager(name_cm.name);
            newCM.contacts = name_cm.contacts;
            newCM.deleteContact(+(nameContact.value));
            localStorage.setItem(newName.value, JSON.stringify(newCM));
            text_delete.textContent = 'Successfully deleted';
            display_on([text_delete]);
        }
    }
    showContact();
    nameContact.value = '';
}

function addSimilar() {
        const name_cm = JSON.parse(localStorage.getItem(newName.value));
        let newCM = new ContactManager(name_cm.name);
        newCM.contacts = name_cm.contacts;
        let table1 = document.querySelector('#table')
        for (let i = 0; i < newCM.contacts.length; i++) {
            let tr = document.createElement('tr')
            let td = document.createElement('td');
            td.textContent = newCM.contacts[i].name;
            tr.appendChild(td);
            let td1 = document.createElement('td');
            td1.textContent = newCM.contacts[i].number;
            tr.appendChild(td1);
            table1.appendChild(tr);
        }
        table.style.display = "table";
        table1.addEventListener('click', e=> {
            try {
             newContact_name.value = e.target.closest('td:first-child').textContent;
            } catch (error) {
            
            }
        });
        table1.addEventListener('click', e=> {
            try {
                newContact_number.value = e.target.closest('td:last-child').textContent;
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
    table.textContent = "";
    addSimilar();
}

function display_off (array) {
    for (let i = 0; i < array.length; i++) {
        array[i].style.display = "none";
    }
}

function display_on (array) {
    for (let i = 0; i < array.length; i++) {
        array[i].style.display = "block";
    }
}




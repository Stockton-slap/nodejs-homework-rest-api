const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.resolve("./models/contacts.json");

const updateContactsList = async (contacts) => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
};

const getListContacts = async () => {
  try {
    const contacts = await fs.readFile(contactsPath, "utf-8");
    const parsedContacts = await JSON.parse(contacts);

    return parsedContacts;
  } catch (error) {
    console.log(error);
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await getListContacts();
    const [contact] = contacts.filter((contact) => contact.id === contactId);

    return contact;
  } catch (error) {
    console.log(error);
  }
};

const addContact = async (data) => {
  try {
    const contacts = await getListContacts();
    const newContact = {
      id: uuidv4(),
      ...data,
    };

    contacts.push(newContact);

    updateContactsList(contacts);

    return contacts;
  } catch (error) {
    console.log(error);
  }
};

const removeContact = async (contactId) => {
  const contacts = await getListContacts();
  const deletedContactIdx = contacts.findIndex(
    (contact) => contact.id === contactId
  );

  if (deletedContactIdx === -1) {
    return null;
  }

  const [contact] = contacts.splice(deletedContactIdx, 1);

  updateContactsList(contacts);

  return contact;
};

const updateContact = async (id, data) => {
  const contacts = await getListContacts();
  const updatedContactIdx = contacts.findIndex((contact) => contact.id === id);

  contacts[updatedContactIdx] = {
    id,
    ...data,
  };

  updateContactsList(contacts);

  return contacts[updatedContactIdx];
};

module.exports = {
  getListContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};

import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Contact } from '../types'

export const useContactsStore = defineStore('contacts', () => {
  const contacts = ref<Contact[]>([
    {
      id: 1,
      name: 'Juan Pérez',
      phone: '555-0101',
      address: 'Calle Principal 123',
      type: 'Vendedor',
    },
    {
      id: 2,
      name: 'María González',
      phone: '555-0102',
      address: 'Avenida Central 456',
      type: 'Comprador',
    },
    {
      id: 3,
      name: 'Carlos Rodríguez',
      phone: '555-0103',
      address: 'Boulevard Norte 789',
      type: 'Ambos',
    },
    {
      id: 4,
      name: 'Ana López',
      phone: '555-0104',
      address: 'Carrera 10 #45-67',
      type: 'Comprador',
    },
  ])

  const addContact = (contact: Contact) => {
    const newId = Math.max(...contacts.value.map(c => c.id || 0)) + 1
    contacts.value.push({ ...contact, id: newId })
  }

  const updateContact = (id: number, contact: Contact) => {
    const index = contacts.value.findIndex(c => c.id === id)
    if (index !== -1) {
      contacts.value[index] = { ...contact, id }
    }
  }

  const deleteContact = (id: number) => {
    const index = contacts.value.findIndex(c => c.id === id)
    if (index !== -1) {
      contacts.value.splice(index, 1)
    }
  }

  return {
    contacts,
    addContact,
    updateContact,
    deleteContact,
  }
})

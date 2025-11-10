import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Breed } from '../types'

export const useBreedsStore = defineStore('breeds', () => {
  const breeds = ref<Breed[]>([
    { id: 1, name: 'Holstein', code: 'HOL', origin_country: 'Países Bajos' },
    { id: 2, name: 'Angus', code: 'ANG', origin_country: 'Escocia' },
    { id: 3, name: 'Jersey', code: 'JER', origin_country: 'Reino Unido' },
    { id: 4, name: 'Brahman', code: 'BRA', origin_country: 'India' },
    { id: 5, name: 'Hereford', code: 'HER', origin_country: 'Inglaterra' },
    { id: 6, name: 'Simmental', code: 'SIM', origin_country: 'Suiza' },
  ])

  const addBreed = (breed: Breed) => {
    const newId = Math.max(...breeds.value.map(b => b.id || 0)) + 1
    breeds.value.push({ ...breed, id: newId })
  }

  const updateBreed = (id: number, breed: Breed) => {
    const index = breeds.value.findIndex(b => b.id === id)
    if (index !== -1) {
      breeds.value[index] = { ...breed, id }
    }
  }

  const deleteBreed = (id: number) => {
    const index = breeds.value.findIndex(b => b.id === id)
    if (index !== -1) {
      breeds.value.splice(index, 1)
    }
  }

  return {
    breeds,
    addBreed,
    updateBreed,
    deleteBreed,
  }
})

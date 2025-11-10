<template>
  <div>
    <v-row>
      <v-col cols="12" sm="6" md="3">
        <v-card color="primary" variant="elevated">
          <v-card-text>
            <div class="text-h3 text-white">{{ totalAnimals }}</div>
            <div class="text-subtitle-1 text-white">Total de Animales</div>
          </v-card-text>
          <v-card-actions>
            <v-icon color="white" size="large">mdi-cow</v-icon>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="3">
        <v-card color="success" variant="elevated">
          <v-card-text>
            <div class="text-h3 text-white">{{ activeAnimals }}</div>
            <div class="text-subtitle-1 text-white">Animales Activos</div>
          </v-card-text>
          <v-card-actions>
            <v-icon color="white" size="large">mdi-check-circle</v-icon>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="3">
        <v-card color="info" variant="elevated">
          <v-card-text>
            <div class="text-h3 text-white">{{ totalBreeds }}</div>
            <div class="text-subtitle-1 text-white">Razas Registradas</div>
          </v-card-text>
          <v-card-actions>
            <v-icon color="white" size="large">mdi-dna</v-icon>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="3">
        <v-card color="warning" variant="elevated">
          <v-card-text>
            <div class="text-h3 text-white">{{ totalContacts }}</div>
            <div class="text-subtitle-1 text-white">Contactos</div>
          </v-card-text>
          <v-card-actions>
            <v-icon color="white" size="large">mdi-account-multiple</v-icon>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mt-4">
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Distribución por Raza</v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item
                v-for="item in animalsByBreed"
                :key="item.breed"
              >
                <v-list-item-title>{{ item.breed }}</v-list-item-title>
                <template v-slot:append>
                  <v-chip color="primary">{{ item.count }}</v-chip>
                </template>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Distribución por Sexo</v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="6">
                <div class="text-center">
                  <v-icon size="80" color="primary">mdi-gender-male</v-icon>
                  <div class="text-h4 mt-2">{{ maleCount }}</div>
                  <div class="text-subtitle-1">Machos</div>
                </div>
              </v-col>
              <v-col cols="6">
                <div class="text-center">
                  <v-icon size="80" color="pink">mdi-gender-female</v-icon>
                  <div class="text-h4 mt-2">{{ femaleCount }}</div>
                  <div class="text-subtitle-1">Hembras</div>
                </div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mt-4">
      <v-col cols="12">
        <v-card>
          <v-card-title>Estado del Ganado</v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12" sm="4" v-for="status in animalsByStatus" :key="status.status">
                <v-card variant="outlined">
                  <v-card-text class="text-center">
                    <div class="text-h3" :class="getStatusColor(status.status)">
                      {{ status.count }}
                    </div>
                    <div class="text-subtitle-1">{{ status.status }}</div>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useLivestockStore } from '../stores/livestock'
import { useBreedsStore } from '../stores/breeds'
import { useContactsStore } from '../stores/contacts'

const livestockStore = useLivestockStore()
const breedsStore = useBreedsStore()
const contactsStore = useContactsStore()

const totalAnimals = computed(() => livestockStore.animals.length)
const activeAnimals = computed(() =>
  livestockStore.animals.filter(a => a.status === 'Activo').length
)
const totalBreeds = computed(() => breedsStore.breeds.length)
const totalContacts = computed(() => contactsStore.contacts.length)

const animalsByBreed = computed(() => {
  const breedCounts = new Map<string, number>()
  livestockStore.animals.forEach(animal => {
    breedCounts.set(animal.breed, (breedCounts.get(animal.breed) || 0) + 1)
  })
  return Array.from(breedCounts.entries()).map(([breed, count]) => ({
    breed,
    count,
  }))
})

const maleCount = computed(() =>
  livestockStore.animals.filter(a => a.sex === 'Macho').length
)
const femaleCount = computed(() =>
  livestockStore.animals.filter(a => a.sex === 'Hembra').length
)

const animalsByStatus = computed(() => {
  const statusCounts = new Map<string, number>()
  livestockStore.animals.forEach(animal => {
    statusCounts.set(animal.status, (statusCounts.get(animal.status) || 0) + 1)
  })
  return Array.from(statusCounts.entries()).map(([status, count]) => ({
    status,
    count,
  }))
})

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Activo':
      return 'text-success'
    case 'Vendido':
      return 'text-info'
    case 'Muerto':
      return 'text-error'
    default:
      return 'text-grey'
  }
}
</script>

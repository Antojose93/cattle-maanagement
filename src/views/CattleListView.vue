<script setup lang="ts">
import { ref } from 'vue'
import CattleCard from '../components/CattleCard.vue'
import type { Cattle } from '../types/cattle'

const cattleList = ref<Cattle[]>([
  {
    id: 1,
    name: 'Bessie',
    number: 'C-001',
    mark: 'B-01',
    description: 'Prime breeding cow',
    sex: 'FEMALE',
    breed: 'Holstein',
    date_of_birth: '2020-03-15',
    acquisition_type: 'Purchased',
    acquisition_date: '2020-04-01',
    acquisition_price: 2500.00,
    seller: 'Smith Farm',
    status: 'ACTIVE',
    status_date: '2020-04-01',
    sale_price: null,
    death_date: null,
    death_reason: null,
    notes: 'Excellent milk producer',
    created_at: '2020-04-01T10:00:00Z',
    updated_at: '2024-10-15T14:30:00Z',
  },
  {
    id: 2,
    name: 'Duke',
    number: 'C-002',
    mark: 'D-01',
    description: 'Strong breeding bull',
    sex: 'MALE',
    breed: 'Angus',
    date_of_birth: '2019-06-20',
    acquisition_type: 'Born',
    acquisition_date: '2019-06-20',
    acquisition_price: 0,
    seller: null,
    status: 'ACTIVE',
    status_date: '2019-06-20',
    sale_price: null,
    death_date: null,
    death_reason: null,
    notes: 'Good temperament',
    created_at: '2019-06-20T08:00:00Z',
    updated_at: '2024-11-01T09:15:00Z',
  },
  {
    id: 3,
    name: 'Daisy',
    number: 'C-003',
    mark: 'D-02',
    description: 'Young heifer',
    sex: 'FEMALE',
    breed: 'Jersey',
    date_of_birth: '2023-01-10',
    acquisition_type: 'Born',
    acquisition_date: '2023-01-10',
    acquisition_price: 0,
    seller: null,
    status: 'ACTIVE',
    status_date: '2023-01-10',
    sale_price: null,
    death_date: null,
    death_reason: null,
    notes: 'High butter fat content',
    created_at: '2023-01-10T11:30:00Z',
    updated_at: '2024-11-05T16:45:00Z',
  },
  {
    id: 4,
    name: 'Thunder',
    number: 'C-004',
    mark: 'T-01',
    description: 'Sold at auction',
    sex: 'MALE',
    breed: 'Hereford',
    date_of_birth: '2021-08-05',
    acquisition_type: 'Purchased',
    acquisition_date: '2021-09-01',
    acquisition_price: 3200.00,
    seller: 'Johnson Ranch',
    status: 'SOLD',
    status_date: '2024-09-20',
    sale_price: 4500.00,
    death_date: null,
    death_reason: null,
    notes: 'Sold at premium price',
    created_at: '2021-09-01T13:00:00Z',
    updated_at: '2024-09-20T10:00:00Z',
  },
  {
    id: 5,
    name: 'Rosie',
    number: 'C-005',
    mark: 'R-01',
    description: 'Deceased due to illness',
    sex: 'FEMALE',
    breed: 'Brown Swiss',
    date_of_birth: '2018-04-12',
    acquisition_type: 'Born',
    acquisition_date: '2018-04-12',
    acquisition_price: 0,
    seller: null,
    status: 'DEAD',
    status_date: '2024-08-15',
    sale_price: null,
    death_date: '2024-08-15',
    death_reason: 'Illness',
    notes: 'Was a good milk producer',
    created_at: '2018-04-12T07:00:00Z',
    updated_at: '2024-08-15T18:30:00Z',
  },
  {
    id: 6,
    name: 'Max',
    number: 'C-006',
    mark: 'M-01',
    description: 'Young calf',
    sex: 'MALE',
    breed: 'Limousin',
    date_of_birth: '2024-07-22',
    acquisition_type: 'Born',
    acquisition_date: '2024-07-22',
    acquisition_price: 0,
    seller: null,
    status: 'ACTIVE',
    status_date: '2024-07-22',
    sale_price: null,
    death_date: null,
    death_reason: null,
    notes: 'Growing well',
    created_at: '2024-07-22T06:15:00Z',
    updated_at: '2024-11-08T12:00:00Z',
  },
])

const handleCardClick = (id: number) => {
  console.log('Clicked cattle ID:', id)
}
</script>

<template>
  <v-app>
    <v-main>
      <v-container fluid class="pa-6">
        <v-row class="mb-6">
          <v-col cols="12">
            <h1 class="text-h3 font-weight-bold text-grey-darken-3">Cattle Management</h1>
            <p class="text-h6 text-grey-darken-1 mt-2">Manage and track your cattle herd</p>
          </v-col>
        </v-row>

        <v-row>
          <v-col
            v-for="cattle in cattleList"
            :key="cattle.id"
            cols="12"
            sm="6"
            md="4"
            lg="3"
          >
            <CattleCard
              :cattle="cattle"
              @click="handleCardClick"
            />
          </v-col>
        </v-row>

        <v-row v-if="cattleList.length === 0" class="mt-8">
          <v-col cols="12" class="text-center">
            <v-icon size="64" color="grey-lighten-1">mdi-cow</v-icon>
            <p class="text-h6 text-grey mt-4">No cattle found</p>
            <p class="text-body-2 text-grey-lighten-1">Add your first animal to get started</p>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
.v-container {
  max-width: 1400px;
}
</style>

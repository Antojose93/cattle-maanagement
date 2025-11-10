<template>
  <div>
    <v-row class="mb-6">
      <v-col cols="12">
        <h1 class="text-h3 font-weight-bold text-grey-darken-3">Cattle Management</h1>
        <p class="text-h6 text-grey-darken-1 mt-2">Manage and track your cattle herd</p>
      </v-col>
    </v-row>

    <v-card>
      <v-card-title class="d-flex justify-space-between align-center px-6 py-4">
        <v-btn color="primary" variant="flat" rounded="xl" elevation="2" @click="openDialog">
          <v-icon>mdi-cow</v-icon>
          Add Cattle
        </v-btn>
      </v-card-title>

      <v-card-text class="mt-4">
        <!-- Filtros -->
        <v-row>
          <v-col cols="12" md="4">
            <v-text-field v-model="search" label="Buscar" prepend-inner-icon="mdi-magnify" variant="outlined"
              density="compact" clearable />
          </v-col>
          <v-col cols="12" md="3">
            <v-select v-model="filterBreed" label="Filtrar por Raza" :items="breedOptions" variant="outlined"
              density="compact" clearable />
          </v-col>
          <v-col cols="12" md="3">
            <v-select v-model="filterSex" label="Filtrar por Sexo" :items="['Macho', 'Hembra']" variant="outlined"
              density="compact" clearable />
          </v-col>
          <v-col cols="12" md="2">
            <v-select v-model="filterStatus" label="Filtrar por Estado" :items="['Activo', 'Vendido', 'Muerto']"
              variant="outlined" density="compact" clearable />
          </v-col>
        </v-row>

        <!-- Tarjetas de Ganado -->
        <v-row>
          <v-col v-for="animal in filteredAnimals" :key="animal.id" cols="12" sm="6" md="4" lg="3">
            <v-card class="cattle-card" elevation="2" rounded="lg" hover @click="openDialog(animal)">
              <v-card-title class="d-flex align-center justify-space-between pa-4">
                <span class="text-h6 font-weight-bold">
                  {{ animal.name || animal.number || animal.mark || 'Desconocido' }}
                </span>
                <v-icon :color="animal.sex === 'Macho' ? '#2196F3' : '#E91E63'" size="28">
                  {{ animal.sex === 'Macho' ? 'mdi-gender-male' : 'mdi-gender-female' }}
                </v-icon>
              </v-card-title>

              <v-divider />

              <v-card-text class="pa-4">
                <div class="info-grid">
                  <div v-if="animal.number" class="info-item">
                    <v-icon size="20" class="mr-2" color="grey-darken-1">mdi-tag-outline</v-icon>
                    <span class="text-body-2">
                      <span class="text-grey-darken-2">Número:</span>
                      <span class="font-weight-medium ml-1">{{ animal.number }}</span>
                    </span>
                  </div>

                  <div v-if="animal.mark" class="info-item">
                    <v-icon size="20" class="mr-2" color="grey-darken-1">mdi-label-outline</v-icon>
                    <span class="text-body-2">
                      <span class="text-grey-darken-2">Marca:</span>
                      <span class="font-weight-medium ml-1">{{ animal.mark }}</span>
                    </span>
                  </div>

                  <div v-if="animal.breed" class="info-item">
                    <v-icon size="20" class="mr-2" color="grey-darken-1">mdi-cow</v-icon>
                    <span class="text-body-2">
                      <span class="text-grey-darken-2">Raza:</span>
                      <span class="font-weight-medium ml-1">{{ animal.breed }}</span>
                    </span>
                  </div>

                  <div class="info-item">
                    <v-icon size="20" class="mr-2" color="grey-darken-1">mdi-calendar</v-icon>
                    <span class="text-body-2">
                      <span class="text-grey-darken-2">Edad:</span>
                      <span class="font-weight-medium ml-1">{{ getAge(animal.date_of_birth) }}</span>
                    </span>
                  </div>

                  <div v-if="animal.acquisition_type" class="info-item">
                    <v-icon size="20" class="mr-2" color="grey-darken-1">mdi-plus-circle-outline</v-icon>
                    <span class="text-body-2">
                      <span class="text-grey-darken-2">Adquisición:</span>
                      <span class="font-weight-medium ml-1">{{ animal.acquisition_type }}</span>
                    </span>
                  </div>

                  <div class="info-item mt-2">
                    <v-chip :color="getStatusColor(animal.status)" size="small" label>
                      {{ animal.status }}
                    </v-chip>
                  </div>
                </div>
              </v-card-text>

              <v-divider />

              <v-card-actions class="pa-4 d-flex justify-space-between align-center">
                <span class="text-caption text-grey">
                  Actualizado {{ formatDate(animal.updated_at) }}
                </span>
                <div>
                  <v-btn icon size="small" color="primary" variant="text" @click.stop="openDialog(animal)">
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                  <v-btn icon size="small" color="error" variant="text" @click.stop="confirmDelete(animal)">
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </div>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <!-- Diálogo de Crear/Editar -->
    <v-dialog v-model="dialog" max-width="800px" persistent>
      <v-card>
        <v-card-title>
          <span class="text-h5">{{ editMode ? 'Editar Animal' : 'Nuevo Animal' }}</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="form">
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field v-model="formData.mark" label="Marca *" :rules="[rules.required]" variant="outlined" />
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field v-model="formData.number" label="Número *" :rules="[rules.required]" variant="outlined" />
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field v-model="formData.name" label="Nombre *" :rules="[rules.required]" variant="outlined"
                  :loading="isGeneratingName" :disabled="isGeneratingName" />

              </v-col>
              <v-col cols="12" md="6">
                <v-select v-model="formData.sex" label="Sexo *" :items="['Macho', 'Hembra']" :rules="[rules.required]"
                  variant="outlined" />
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field v-model="formData.date_of_birth" label="Fecha de Nacimiento *" type="date"
                  :rules="[rules.required]" variant="outlined" />
              </v-col>
              <v-col cols="12" md="6">
                <v-select v-model="formData.breed" label="Raza *" :items="breedOptions" :rules="[rules.required]"
                  variant="outlined" />
              </v-col>
              <v-col cols="12" md="6">
                <v-select v-model="formData.acquisition_type" label="Tipo de Adquisición *"
                  :items="['Compra', 'Nacimiento', 'Donación']" :rules="[rules.required]" variant="outlined" />
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field v-model="formData.acquisition_date" label="Fecha de Adquisición *" type="date"
                  :rules="[rules.required]" variant="outlined" />
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field v-model.number="formData.acquisition_price" label="Precio de Adquisición *" type="number"
                  :rules="[rules.nonNegative]" variant="outlined" prefix="$" />

              </v-col>
              <v-col cols="12" md="6">
                <v-select v-model="formData.status" label="Estado *" :items="['Activo', 'Vendido', 'Muerto']"
                  :rules="[rules.required]" variant="outlined" />
              </v-col>
              <v-col cols="12" md="6" v-if="formData.status === 'Vendido'">
                <v-text-field v-model.number="formData.sale_price" label="Precio de Venta" type="number"
                  :rules="[rules.nonNegative]" variant="outlined" prefix="$" />
              </v-col>
              <v-col cols="12">
                <v-textarea v-model="formData.notes" label="Notas" variant="outlined" rows="3" />
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn @click="closeDialog">Cancelar</v-btn>
          <v-btn color="primary" @click="saveAnimal">Guardar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Diálogo de Eliminación -->
    <v-dialog v-model="deleteDialog" max-width="400px">
      <v-card>
        <v-card-title>Confirmar Eliminación</v-card-title>
        <v-card-text>¿Está seguro de que desea eliminar este animal?</v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn @click="deleteDialog = false">Cancelar</v-btn>
          <v-btn color="error" @click="deleteAnimal">Eliminar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useLivestockStore } from '../stores/livestock'
import { useBreedsStore } from '../stores/breeds'
import type { Animal } from '../types'


const isGeneratingName = ref(false)

const livestockStore = useLivestockStore()
const breedsStore = useBreedsStore()

const search = ref('')
const filterBreed = ref('')
const filterSex = ref('')
const filterStatus = ref('')
const dialog = ref(false)
const deleteDialog = ref(false)
const editMode = ref(false)
const currentId = ref<string | number | undefined>()
const form = ref()

onMounted(() => {
  livestockStore.loadAnimals()
})

const formData = ref<Animal>({
  mark: '',
  number: '',
  name: '',
  sex: 'Macho',
  date_of_birth: '',
  breed: '',
  acquisition_type: 'Compra',
  acquisition_date: '',
  acquisition_price: 0,
  status: 'Activo',
  notes: '',
})

const rules = {
  required: (v: string | number) => !!v || v === 0 || 'Este campo es requerido',
  nonNegative: (v: number) => v >= 0 || 'El valor no puede ser negativo',
}
const generateName = async () => {
  try {
    isGeneratingName.value = true
    const gender = formData.value.sex === 'Macho' ? 'male' : 'female'
    const response = await fetch(`https://randomuser.me/api/?gender=${gender}&nat=es`)
    const data = await response.json()
    const { first, last } = data.results[0].name

    // Combina nombre + apellido, capitalizando ambos
    const fullName = `${first.charAt(0).toUpperCase() + first.slice(1)} ${last.charAt(0).toUpperCase() + last.slice(1)}`
    formData.value.name = fullName
  } catch (error) {
    console.error('Error generando nombre:', error)
  } finally {
    isGeneratingName.value = false
  }
}


watch(() => formData.value.sex, (newSex, oldSex) => {
  if (!editMode.value && newSex !== oldSex) {
    generateName()
  }
})
const breedOptions = computed(() => breedsStore.breeds.map(b => b.name))

const filteredAnimals = computed(() => {
  let animals = livestockStore.animals
  if (filterBreed.value) animals = animals.filter(a => a.breed === filterBreed.value)
  if (filterSex.value) animals = animals.filter(a => a.sex === filterSex.value)
  if (filterStatus.value) animals = animals.filter(a => a.status === filterStatus.value)
  if (search.value) {
    const q = search.value.toLowerCase()
    animals = animals.filter(a =>
      [a.name, a.mark, a.number, a.breed].some(v => v?.toLowerCase().includes(q))
    )
  }
  return animals
})

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Activo': return 'success'
    case 'Vendido': return 'info'
    case 'Muerto': return 'error'
    default: return 'grey'
  }
}

const getAge = (birth: string) => {
  if (!birth) return 'Desconocida'
  const d = new Date(birth)
  const now = new Date()
  let y = now.getFullYear() - d.getFullYear()
  let m = now.getMonth() - d.getMonth()
  if (m < 0) { y--; m += 12 }
  return y > 0 ? `${y}a ${m}m` : `${m}m`
}

const formatDate = (date: string | undefined) => {
  if (!date) return 'Nunca'
  return new Intl.DateTimeFormat('es-ES', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(date))
}

const openDialog = (animal?: Animal) => {
  if (animal && animal.id) {
    editMode.value = true
    currentId.value = animal.id
    formData.value = { ...animal }
  } else {
    editMode.value = false
    currentId.value = undefined
    formData.value = {
      mark: '', number: '', name: '', sex: 'Hembra', date_of_birth: '',
      breed: '', acquisition_type: 'Compra', acquisition_date: '',
      acquisition_price: 0, status: 'Activo', notes: '',
    }
  }
  dialog.value = true
}

const closeDialog = () => { dialog.value = false; form.value?.reset() }

const saveAnimal = async () => {
  const { valid } = await form.value.validate()
  if (!valid) return
  if (editMode.value && currentId.value)
    livestockStore.updateAnimal(currentId.value, formData.value)
  else
    livestockStore.addAnimal(formData.value)
  closeDialog()
}

const confirmDelete = (animal: Animal) => { currentId.value = animal.id; deleteDialog.value = true }
const deleteAnimal = () => { if (currentId.value) livestockStore.deleteAnimal(currentId.value); deleteDialog.value = false }
</script>

<style scoped>
.cattle-card {
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 12px;
  background-color: #fff;
}

.cattle-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15) !important;
}

.info-grid {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.info-item {
  display: flex;
  align-items: center;
}
</style>

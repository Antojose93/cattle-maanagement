<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app>
      <v-list-item class="px-2">
        <v-list-item-title class="text-h6 text-primary">
          Sistema Ganadero
        </v-list-item-title>
        <v-list-item-subtitle>Administración</v-list-item-subtitle>
      </v-list-item>

      <v-divider></v-divider>

      <v-list density="compact" nav>
        <v-list-item
          v-for="item in menuItems"
          :key="item.title"
          :to="item.to"
          :prepend-icon="item.icon"
          :title="item.title"
          active-class="bg-primary"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="primary">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>{{ currentTitle }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-chip color="white" variant="outlined">
        <v-icon start>mdi-calendar</v-icon>
        {{ currentDate }}
      </v-chip>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

const drawer = ref(true)

const menuItems = [
  { title: 'Dashboard', icon: 'mdi-view-dashboard', to: '/' },
  { title: 'Ganado', icon: 'mdi-cow', to: '/livestock' },
  { title: 'Razas', icon: 'mdi-dna', to: '/breeds' },
  { title: 'Contactos', icon: 'mdi-account-multiple', to: '/contacts' },
]

const route = useRoute()

const currentTitle = computed(() => {
  const item = menuItems.find(item => item.to === route.path)
  return item?.title || 'Sistema Ganadero'
})

const currentDate = computed(() => {
  return new Date().toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
})
</script>

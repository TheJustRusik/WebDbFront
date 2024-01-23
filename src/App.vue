<script setup>
  import { ref } from 'vue'
  import axios from 'axios';
  import { mdiCalendar } from '@mdi/js';
  
  let items = ref([]);

  async function loadData(){
    try {
      const response = await axios.get('http://localhost:8080/api/rofres');
      items.value = response.data;
    }catch(error){
      console.error('Ошибка при получении данных:', error);
    }

  }

</script>

<template>
  <div class="mx-24 mt-8">
    <div class="divide-y divide-[#30c784]">
      <div>
        <p class="text-[#dadad1] text-2xl font-bold pb-4">Hello!</p>
        <v-icon :icon="mdiCalendar" />
        <v-btn prepend-icon="mdi-calendar" size="x-large">Lol</v-btn>
        <v-btn class="mb-6" :onclick="loadData">Get Data</v-btn>
        
      </div>
      <div>
        <p class="text-[#dadad1] text-2xl font-bold pt-4">Some data:</p>
        <div class="mx-24">
          <v-data-table :items="items"></v-data-table>
        </div>
      </div>
    </div>
    
    

  </div>
  
</template>

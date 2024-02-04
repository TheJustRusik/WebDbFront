<script setup>
  import { ref } from 'vue'
  import axios from 'axios';
  import { mdiCalendar } from '@mdi/js';
  import { useTheme } from 'vuetify'
  import AddDataDialog from './components/AddDataDialog.vue'
  import LoginDialog from './components/LoginDialog.vue';
  import RegisterDialog from './components/RegisterDialog.vue';

  const theme = useTheme()
  let currentTheme = ref('dark')
  let switchThemeIcon = ref('mdi-white-balance-sunny')
  function switchTheme(){
    if (currentTheme.value === 'dark'){
      currentTheme.value = 'light'
      switchThemeIcon.value = 'mdi-weather-night'
    }else{
      currentTheme.value = 'dark'
      switchThemeIcon.value = 'mdi-white-balance-sunny'
    }
  }

  let alert = ref(false)
  let alertType = ref('')
  let alertText = ref('')


  let items = ref([]);
  let showData = ref(false)
  let currentState = ref('Press button for load data!')
  let loadingGetData = false
  let loadingSetData = false
  async function loadData(){
    currentState.value = "Loading data..."
    loadingGetData = true
    try {
      const response = await axios.get('https://springbd.landless-city.net/api/rofres');
      items.value = response.data;
      showData.value = true
      currentState.value = "Data successfully loaded!"
    }catch(error){
      currentState.value = "Error while getting data:\n" + error
    }
    loadingGetData = false

  }

  function showAlert(type, text){
    loadData()
    alert.value = true
    alertText.value = text
    alertType.value = type
  }

</script>

<template>
  <v-app :theme="currentTheme">
    <div class="mx-4 mt-4">
      <div class="divide-y divide-[#30c784]">
        <div>
          <div class="flex items-center justify-between mb-2">
            <p class="text-2xl font-bold md:pb-4">Hello! Here you can <span class="text-lime-500">get</span> or <span class="text-red-500">add</span> some data...</p>
            <v-btn elevation="8" :icon="switchThemeIcon" @click="switchTheme"/>
               
          </div>
          <div class="flex mb-1 justify-between">  
            <div class="grid gap-4 sm:grid-cols-2">
              <v-btn elevation="8" :loading="loadingGetData" size="x-large" prepend-icon="mdi-database-arrow-down" :onclick="loadData">Get Data</v-btn>
            
              <AddDataDialog @addedData="showAlert"></AddDataDialog>
            </div>
            <div class="grid mb-1 gap-4 sm:grid-cols-2">
              <LoginDialog></LoginDialog>
              <RegisterDialog></RegisterDialog>
            </div>
          </div>
          
          
          <v-alert v-model="alert" class="mb-6" closable :text="alertText" :type='alertType'></v-alert>
          
        </div>
        <div v-if="showData">
          <p class="text-2xl font-bold pt-6">Some data:</p>
          <div class="my-6">
            <v-data-table :items="items"></v-data-table>
          </div>
        </div>
        <div v-else>
          <p class="text-2xl font-bold pt-6">{{currentState}}</p>
        </div>
      </div>
      
      

    </div>
  </v-app>
</template>

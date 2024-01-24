<script setup>
  import { ref } from 'vue'
  import axios from 'axios';
  import { mdiCalendar } from '@mdi/js';
  import { useTheme } from 'vuetify'
  import AddDataDialog from './components/AddDataDialog.vue'
  import LoginDialog from './components/LoginDialog.vue';
  import RegisterDialog from './components/RegisterDialog.vue';

  const theme = useTheme()

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
      const response = await axios.get('http://localhost:8080/api/rofres');
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
  <v-app theme="dark">
    <div class="mx-24 mt-8" >
      <div class="divide-y divide-[#30c784]">
        <div>
          <p class="text-2xl font-bold pb-4">Hello! Here you can <span class="text-lime-500">get</span> or <span class="text-red-500">add</span> some data...</p>
          <div class="flex justify-between">
            <div>
              <v-btn :loading="loadingGetData" class="mb-6" size="x-large" prepend-icon="mdi-database-arrow-down" :onclick="loadData">Get Data</v-btn>
            
              <AddDataDialog @addedData="showAlert"></AddDataDialog>
            </div>
            <div>
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

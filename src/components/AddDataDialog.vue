<script setup>
    import { ref } from 'vue'
    import axios from 'axios';

    let formRef = ref(null)
    let dates = ref([])
    let comment = ref('')
    let isActive = ref(false)

    const emit = defineEmits(['addedData'])

    let rules = [
        value => !!value || 'Field is required',
    ]
    let conditionalRule = [
        value => (!!value || dates.value.length > 0) || 'Provide something lol'
    ]

    function addData(){
        dates.value.push(ref(comment.value))
        comment.value = ''
    }

    async function validate() {
        const { valid } = await formRef.value.validate()

        if (valid && haveData()) {
            console.log("Data validated, everything is good!")
            return true;
        }else{
            console.log("Data did not validated...")
            return false;
        }
        
    }

    function haveData(){
        if (dates.value.length !== 0 || comment.value !== ''){
            console.log(`comment is ${comment.value}`)
            return true;
        }else{
            return false;
        }
    }

    async function sendData(){
        if(await validate()){
            let ready_data = []
            for ( let data of dates.value){
                ready_data.push(data.value)
            }

            if (comment.value !== ''){
                ready_data.push(comment.value);
            }

            axios.post('http://localhost:8080/api/rofres', ready_data)
                .then(response => {
                    console.log(response.data)
                    emit('addedData' ,'success', "Successfuly added data!")
                })
                .catch(error => {
                    console.log(error)
                    emit('addedData','error', "Some errors occured while adding data :(")
                })

            isActive.value = false
            dates.value = []
            comment.value = ''

            
        }
    }

    function cancel(){
        isActive.value = false
        dates.value = []
        comment.value = ''
    }

    
</script>

<template>
    <v-dialog width="500" v-model="isActive">
        <template v-slot:activator="{ props }">
            <v-btn v-bind="props" class="mb-6 ml-6" size="x-large" prepend-icon="mdi-database-plus">Add Data</v-btn>
        </template>

        <template v-slot:default="{ isActive }">
            <v-card title="Enter the data">
            <v-card-text>
                Add the data you want to send to the database. You just need to fill out the comments field, the ID field will be generated automatically.
            </v-card-text>
            <v-form ref="formRef" @submit.prevent class="mx-6">
                <v-text-field :rules="rules" v-for="data in dates" :model-value="data" variant="underlined" clearable label="Comment"></v-text-field>
                <v-text-field :rules="conditionalRule" append-icon="mdi-plus" v-model="comment" @click:append="addData" variant="underlined" clearable label="Add new comment..."></v-text-field>
                <v-spacer></v-spacer>
                
            </v-form>

            
            <v-card-actions>
                <v-btn text="Cancel" @click="cancel"></v-btn>
                <v-btn text="Send" @click="sendData"></v-btn>
            </v-card-actions>
            </v-card>
        </template>
    </v-dialog>
    
</template>
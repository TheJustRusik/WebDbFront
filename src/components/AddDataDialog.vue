<script setup>
    import { ref } from 'vue'

    let dates = ref([])

    function addData(){
        dates.value.push(1)
    }
</script>

<template>
    <v-dialog width="500">
        <template v-slot:activator="{ props }">
            <v-btn v-bind="props" :loading="loadingSetData" class="mb-6 ml-6" size="x-large" prepend-icon="mdi-database-plus">Add Data</v-btn>
        </template>

        <template v-slot:default="{ isActive }">
            <v-card title="Enter the data">
            <v-card-text>
                Add the data you want to send to the database. You just need to fill out the comments field, the ID field will be generated automatically.
            </v-card-text>
            <div class="mx-6">
                <v-text-field v-for="data in dates" variant="underlined" clearable label="Set comment..."></v-text-field>
                <v-text-field append-icon="mdi-plus" @click:append="addData" variant="underlined" clearable label="Set comment..."></v-text-field>
            </div>

            
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text="Cancel" @click="isActive.value = false"></v-btn>
                <v-btn text="Send" @click="isActive.value = false"></v-btn>
            </v-card-actions>
            </v-card>
        </template>
    </v-dialog>
    
</template>
<script setup>
    import { ref } from 'vue'
    import axios from 'axios';

    let isActive = ref(false)
    
</script>

<template>
    <v-dialog width="500" v-model="isActive">
        <template v-slot:activator="{ props }">
            <v-btn variant="text" v-bind="props" class="mb-6 ml-6" size="x-large">Login</v-btn>
        </template>

        <template v-slot:default="{ isActive }">
            <v-card title="Login">
            
            </v-card>
        </template>
    </v-dialog>
    
</template>
<template>
  <v-dialog v-model="open" max-width="280">
    <v-card elevation="24">
      <v-card-title>La geolocalización está deshabilitada</v-card-title>
      <v-card-text>La geolocalización del dispositivo debe estar habilitada para publicar tu solicitud en el mapa</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn class="normal-case" color="primary" @click="open = false" text>Cancelar</v-btn>
        <v-btn class="normal-case" color="primary" text>Habilitar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data: () => ({
    open: false
  })
};
</script>
<template>
  <v-bottom-sheet v-model="open" max-width="480" inset scrollable>
    <v-card class="rounded-t" elevation="24" flat tile>
      <v-card-text class="pa-0" style="max-height: 90vh">
        <v-list two-line>
          <v-list-item>
            <v-list-item-avatar>
              <v-img :src="person.photoURL"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>
                {{ person.name }}
                <span class="text--secondary caption ml-2">{{ person.publishDate }}</span>
              </v-list-item-title>
              <v-list-item-subtitle>{{ person.casePriority.emoji }} {{ person.casePriority.text }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            :href="`tel:${person.phone.international}`"
            aria-label="Llamar a este número"
          >
            <v-list-item-icon>
              <v-icon class="text--secondary">{{ mdiCellphoneAndroid }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ person.phone.international }}</v-list-item-title>
              <v-list-item-subtitle>Teléfono</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn
                tag="a"
                :href="`tel:${person.phone.international}`"
                title="Llamar a este número"
                aria-label="Llamar a este número"
                icon
              >
                <v-icon color="green lighten-2">{{ mdiCallMade }}</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon>
              <v-icon class="text--secondary">{{ mdiMapMarker }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ person.address }}</v-list-item-title>
              <v-list-item-subtitle>{{ person.country }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
          <v-card class="overflow-y-auto" max-height="142" flat title>
            <v-card-text>{{ person.request }}</v-card-text>
          </v-card>
          <v-divider></v-divider>
          <v-list-item @click dense>
            <v-list-item-content>
              <v-list-item-title class="text--secondary">2 comentarios</v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn aria-label="Abrir comentarios" icon>
                <v-icon
                  class="text--secondary"
                  title="Ver comentarios"
                  aria-label="Ver comentarios"
                >{{ mdiUnfoldMoreHorizontal }}</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
          <v-divider></v-divider>
          <header class="text-center my-4">
            <h4 class="title">¿Ayudaste a {{ person.name }}?</h4>
            <v-btn
              color="primary"
              class="grey--text text--darken-4 normal-case mt-4"
              :ripple="{ 'class': 'white--text' }"
            >Dinos como</v-btn>
          </header>
        </v-list>
      </v-card-text>
    </v-card>
  </v-bottom-sheet>
</template>

<script>
import {
  mdiCellphoneAndroid,
  mdiMapMarker,
  mdiCallMade,
  mdiUnfoldMoreHorizontal
} from "@mdi/js";

export default {
  props: {
    person: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    open: true,
    mdiCellphoneAndroid,
    mdiMapMarker,
    mdiCallMade,
    mdiUnfoldMoreHorizontal
  })
};
</script>
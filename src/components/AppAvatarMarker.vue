<template>
  <div
    class="relative inline-block"
    :data-photo="person.photoURL"
    :data-name="person.name"
    :data-timestamp="person.timestamp"
    :data-emoji="emoji"
    :data-identifier="identifier"
    :data-phone="person.phoneNumber"
    :data-address="person.address"
    :data-country="person.country"
    :data-request="person.request"
    :data-calling-code="person.callingCode"
  >
    <v-avatar class="border-2 border-solid border-dark rounded-full" size="36">
      <img :src="person.photoURL" :alt="person.name" />
    </v-avatar>
    <v-tooltip eager right open-on-click>
      <template #activator="{ on }">
        <span class="absolute -top-10px -right-5px title w-5 h-5" v-on="on">{{ emoji }}</span>
      </template>
      {{ identifier }}
    </v-tooltip>
  </div>
</template>

<script>
export default {
  data: () => ({
    priorityCases: [
      { text: "Emergencia", color: "red lighten-1", code: 1, emoji: "🚨" },
      { text: "Crítico", color: "orange lighten-1", code: 2, emoji: "🔥" },
      {
        text: "Puedo esperar",
        color: "yellow  lighten-1",
        code: 3,
        emoji: "😟"
      },
      {
        text: "Los que puedan",
        color: "blue lighten-1",
        code: 4,
        emoji: "🙏🏼"
      }
    ]
  }),
  props: {
    person: {
      type: Object,
      required: true
    }
  },
  computed: {
    emoji() {
      return this.priorityCases.find(
        ({ code }) => code === this.person.casePriority
      ).emoji;
    },
    identifier() {
      return this.priorityCases.find(
        ({ code }) => code === this.person.casePriority
      ).text;
    }
  }
};
</script>
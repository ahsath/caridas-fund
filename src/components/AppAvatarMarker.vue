<template>
  <div class="relative inline-block" data-badge="🚨">
    <v-avatar class="border-2 border-solid border-dark rounded-full" size="36">
      <img
        src="https://lh3.googleusercontent.com/a-/AOh14Gh6uh6HAhFfkICQd6_1T2qPBXikvKveouW7HGw7_g"
      />
    </v-avatar>
    <v-tooltip eager right open-on-click>
      <template #activator="{ on }">
        <span class="absolute -top-10px -right-5px title w-5 h-5" v-on="on">🚨</span>
      </template>
      Emergencia
    </v-tooltip>
  </div>
</template>
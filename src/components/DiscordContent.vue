<template>
  <article>
    <section class="discord-message" v-html="htmlContent"></section>

    <section class="discord-attachments">
      <img
        v-for="image in message.attachments"
        :key="image.id"
        :src="image.url"
        :alt="image.filename"
        srcset=""
      />
    </section>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { toHTML } from 'discord-markdown'
import { get } from 'lodash-es'

interface DiscordContentProps {
  message: any
}

const props = defineProps<DiscordContentProps>()

const htmlContent = computed(() =>
  toHTML(get(props.message, 'content') || '', {
    discordCallback: {
      user: (node) => `@${node.id}`,
      channel: (node) => `#${node.id}`,
    },
  }),
)
</script>

<style scoped lang="postcss"></style>

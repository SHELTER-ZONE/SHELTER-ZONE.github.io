<template>
  <section class="important-info">
    <div class="f-col gap-[12px]">
      <AreaBlock :border="2" v-for="item in ruleItems" :key="item.key">
        <div class="f-row gap-[10px] text-md font-medium">
          <n-icon :color="item.iconColor" :size="24">
            <component :is="item.icon" />
          </n-icon>
          <n-divider vertical />
          <p>{{ item.content }}</p>
        </div>
      </AreaBlock>
    </div>

    <div class="f-col-center gap-[15px]">
      <n-divider />
      <div class="f-row-center">
        <n-checkbox size="large" v-model:checked="agree">
          <span class="text-primary">我同意以上規則</span>
        </n-checkbox>
      </div>

      <n-button
        v-if="agree"
        block
        secondary
        type="primary"
        :disabled="!canNext"
        @click="onConfirm"
      >
        <n-countdown
          v-if="!canNext"
          :duration="15000"
          :on-finish="onCooldown"
        />
        <span v-else>下一步</span>
      </n-button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { NButton, NCountdown, NCheckbox, NDivider, NIcon } from 'naive-ui'
import { ErrorFilled, WarningHexFilled, WarningAltFilled } from '@vicons/carbon'
import AreaBlock from '@/components/AreaBlock.vue'

const emits = defineEmits(['complete'])

const canNext = ref(false)
const agree = ref<boolean>(false)

const ruleItems = [
  {
    icon: ErrorFilled,
    iconColor: 'var(--danger)',
    content: '請勿使用 私訊(DM) 的方式詢問問題',
    key: 'dm',
  },
  {
    icon: WarningAltFilled,
    iconColor: 'var(--primary)',
    content: '請勿引戰，說話交流有風度一點',
    key: 'dm',
  },
  {
    icon: WarningHexFilled,
    iconColor: 'var(--warning)',
    content: '潛水超過 30 天，將被列於人員清除名單',
    key: 'dm',
  },
]

const onCooldown = () => {
  canNext.value = true
}

const onConfirm = () => {
  emits('complete', 'Important')
}
</script>

<style scoped lang="postcss">
.important-info {
  @apply flex flex-col justify-between gap-[30px];
}
</style>

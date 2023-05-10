<template>
  <div class="sz-term">
    <div>
      <n-alert type="warning" title="SZ 使用者資料條款">
        <div>
          一旦離開 SHELTER ZONE Discord Server，SZ
          使用者相關資料與已累積的獎勵、稱號、點數等相關資料將完全從資料庫中刪除
        </div>
      </n-alert>
    </div>

    <n-alert type="info" title="SZ 幽靈清除機制">
      為保持社群活躍，SZ 擁有一套幽靈/潛水人口清除機制，將依據 SZ
      內部之規定定期進行幽靈/潛水人口的清查與剔除，被剔除者同樣適用上述「SZ
      使用者資料條款」
    </n-alert>
    <n-checkbox @change="onAgreeChange">
      <p class="text-primary">我已詳閱並同意以上條款與機制</p>
    </n-checkbox>
  </div>
</template>

<script setup lang="ts">
import { NAlert, NCheckbox } from 'naive-ui'

const emits = defineEmits(['aggree'])

const onAgreeChange = (toggle) => {
  emits('agree', toggle)
}
</script>

<style scoped lang="postcss">
.sz-term {
  @apply flex flex-col gap-[20px];
}
</style>

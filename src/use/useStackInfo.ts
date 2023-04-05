import { ref } from 'vue'
import type { StackInfoItemData } from '@/components/StackInfo/types'
import { find } from 'lodash-es'
import { WarningAltFilled, CheckmarkFilled, CloseFilled } from '@vicons/carbon'

export const useStackInfo = () => {
  const stack = ref<StackInfoItemData[]>([])
  const stateIcons = {
    warning: WarningAltFilled,
    resolve: CheckmarkFilled,
    error: CloseFilled,
  }

  const pushStackInfo = (data: StackInfoItemData) => {
    stack.value.push(data)
  }

  const changeStackInfo = (id: string, state: string) => {
    const info = find(stack.value, { id })
    if (!info) return
    info.state = state
  }

  return {
    stack,
    pushStackInfo,
    changeStackInfo,
    stateIcons,
  }
}

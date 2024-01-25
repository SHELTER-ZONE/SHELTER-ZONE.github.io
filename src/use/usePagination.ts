import { computed, reactive } from 'vue'

interface usePaginationProps {
  limit: number
}

export const usePagination = (options?: usePaginationProps) => {
  const paginationData = reactive({
    totalData: 0,
    limit: options?.limit || 20,
    curPage: 1,
  })

  const pageStartIndex = computed(() => {
    if (paginationData.curPage === 1) return 0
    return paginationData.curPage * paginationData.limit - paginationData.limit
  })

  return { paginationData, pageStartIndex }
}

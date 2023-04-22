import type { Ref } from 'vue'
import type { FormInst } from 'naive-ui'

export type FormRef = Ref<FormInst | null | undefined>

export interface SZVerifyFormDataStruc {
  id: string | null
  name: string | null
  country: string | null
  from: string | null
  roles: string[]
}

export interface SZVerifyFormData {
  id: string
  name: string
  country: string
  from: string
  roles: string[]
}

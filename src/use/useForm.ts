import { NInput, NSelect } from 'naive-ui'

import type { Ref } from 'vue'
import type { FormInst, FormValidationError } from 'naive-ui'

export type FormValidationResult = Promise<
  [null | boolean, null | Array<FormValidationError>]
>

export const useForm = () => {
  const fieldTypeComponent = {
    text: NInput,
    select: NSelect,
  }

  const verifyForm = async (
    formRef: Ref<FormInst | null | undefined>,
  ): FormValidationResult => {
    return new Promise((resolve, reject) => {
      formRef.value?.validate((errors) => {
        if (!errors) {
          resolve([true, null])
        } else {
          resolve([null, errors])
        }
      })
    })
  }

  return { fieldTypeComponent, verifyForm }
}

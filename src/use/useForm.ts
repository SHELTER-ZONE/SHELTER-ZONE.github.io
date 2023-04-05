import { NInput, NSelect } from 'naive-ui'

export const useForm = () => {
  const fieldTypeComponent = {
    text: NInput,
    select: NSelect,
  }

  return { fieldTypeComponent }
}

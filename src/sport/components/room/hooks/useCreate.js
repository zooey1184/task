import {createTenant} from '@/sport/api/index'
import { computed } from 'vue'

export const useCreate = (props) => {
  const ACCOUNTS = inject('ACCOUNTS')
  const accounts = computed(() => ACCOUNTS.accounts.value)
  const handleCreate = (roomId) => {
    createTenant({
      wallet: accounts.value[0],
      tenant: roomId
    }).then(res => {
      console.log(res)
    })
  }

  return {
    handleCreate
  }
}
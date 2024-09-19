import { Database } from '@/database.types'

export interface IResponse<T> {
  data?: T
  errorMessage?: string
}

export interface IUserCookie {
  id: number
}

export interface ICreateTransaction {
  amount: string
  type: Database['public']['Enums']['transaction_type']
  to?: string | number
  concept?: string
}

export interface TransactionsResponse {
  id: Database['public']['Tables']['transactions']['Row']['id']
  amount: Database['public']['Tables']['transactions']['Row']['amount']
  concept: Database['public']['Tables']['transactions']['Row']['concept']
  created_at: Database['public']['Tables']['transactions']['Row']['created_at']
  type: Database['public']['Tables']['transactions']['Row']['type']
  account_id: {
    id: Database['public']['Tables']['accounts']['Row']['id']
    name: Database['public']['Tables']['accounts']['Row']['name']
    account_number: Database['public']['Tables']['accounts']['Row']['account_number']
  }
  to_account_id: {
    id: Database['public']['Tables']['accounts']['Row']['id']
    name: Database['public']['Tables']['accounts']['Row']['name']
    account_number: Database['public']['Tables']['accounts']['Row']['account_number']
  }
  external_account: Database['public']['Tables']['transactions']['Row']['external_account']
}

export interface IBalanceModals {
  onClose: () => void
  refetchBalance: () => void
  balance?: number
}

export interface PaginatedData {
  page: number
  pageSize: number
}

import { IoHome } from 'react-icons/io5'
import { GrTransaction } from 'react-icons/gr'

export const navbarItems = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    icon: <IoHome />
  },
  {
    name: 'Transacciones',
    path: '/dashboard/transacciones',
    icon: <GrTransaction />
  }
]

import { Cart } from '@/types/cart'
import { atom } from 'recoil'

export const cartState = atom<Cart | []>({
	key: 'cartState',
	default: [],
})

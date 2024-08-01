import { SetterOrUpdater } from 'recoil'
import axiosInstance from './axiosInstance'
import { Cart } from '@/types/cart'

export const fetchCart = async (setCart: SetterOrUpdater<Cart | []>) => {
	try {
		const response = await axiosInstance.get('adminuser/cart/get')
		setCart(response?.data?.products)
	} catch (error: any) {
		console.log(error?.message)
	}
}

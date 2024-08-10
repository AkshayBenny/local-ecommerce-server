'use client'

export default function OrderCard({
	id,
	orderDate,
	status,
	orderItems,
	totalAmount,
	isPaid,
}: {
	id: number
	orderDate: string
	status: string
	orderItems: any
	totalAmount: number
	isPaid: boolean
}) {
	return (
		<tr
			key={id}
			className='text-[16px] text-[#1A1A1A] font-regular'>
			<td className='border-t px-4 py-2'>#{id}</td>
			<td className='border-t px-4 py-2'>{orderDate}</td>
			<td className='border-t px-4 py-2'>{totalAmount}</td>
			<td className='border-t px-4 py-2'>{status}</td>
			<td className='border-t px-4 py-2'>
				<select defaultValue={status}>
					<option value='Pending'>Pending</option>
					<option value='Shipped'>Shipped</option>
					<option value='Delivered'>Delivered</option>
				</select>
			</td>
		</tr>
	)
}

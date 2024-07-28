import Link from 'next/link'

export default function LoginRegisterBtn({
	type,
}: {
	type: 'Login' | 'Register'
}) {
	return (
		<Link href={`/${type.toLowerCase()}`}>
			<div className='relative'>
				<p className=''>{type}</p>
			</div>
		</Link>
	)
}

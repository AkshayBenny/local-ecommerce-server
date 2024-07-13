'use client'
import React from 'react'

export default function LoginPage(){
    const loginHandler = async (e: any) => {
		console.log('submited')
	}

    return <main>
        <form onSubmit={loginHandler}>
				<input type="text" placeholder='Email' />
				<input type="text" placeholder='Password'/>
				<button type='submit'>Login</button>
			</form>
    </main>
}
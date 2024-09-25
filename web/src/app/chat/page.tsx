'use client'

import React, { useState, useEffect, useRef, FormEvent } from 'react'
import SockJS from 'sockjs-client'
import Stomp, { Client } from 'stompjs'

type MessageType = 'CHAT' | 'JOIN' | 'LEAVE'

interface ChatMessage {
	sender: string
	content: string
	type: MessageType
}
export default function ChatPage() {
	const [username, setUsername] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const [isConnected, setIsConnected] = useState<boolean>(false)
	const [messages, setMessages] = useState<ChatMessage[]>([])
	const [message, setMessage] = useState<string>('')
	const [stompClient, setStompClient] = useState<Client | null>(null)
	const messageAreaRef = useRef<HTMLDivElement>(null)

	const colors = [
		'#2196F3',
		'#32c787',
		'#00BCD4',
		'#ff5652',
		'#ffc107',
		'#ff85af',
		'#FF9800',
		'#39bbb0',
	]

	useEffect(() => {
		if (stompClient && isConnected) {
			stompClient.subscribe('/topic/public', onMessageReceived)
		}
	}, [stompClient, isConnected])

	const connect = (event: FormEvent) => {
		event.preventDefault()
		if (username && password === 'YOUR PASSWORD') {
			const socket = new SockJS('/websocket')
			const stomp: Client = Stomp.over(socket)
			stomp.connect({}, onConnected, onError)
			setStompClient(stomp)
		} else {
			alert('Wrong password')
		}
	}

	const onConnected = () => {
		setIsConnected(true)
		if (stompClient) {
			stompClient.send(
				'/app/chat.register',
				{},
				JSON.stringify({ sender: username, type: 'JOIN' })
			)
		}
	}

	const onError = (error: string) => {
		console.error('Error connecting to WebSocket:', error)
		setIsConnected(false)
	}

	const sendMessage = (event: FormEvent) => {
		event.preventDefault()
		if (message.trim() && stompClient) {
			const chatMessage: ChatMessage = {
				sender: username,
				content: message,
				type: 'CHAT',
			}
			stompClient.send('/app/chat.send', {}, JSON.stringify(chatMessage))
			setMessage('')
		}
	}

	const onMessageReceived = (payload: { body: string }) => {
		const receivedMessage: ChatMessage = JSON.parse(payload.body)
		setMessages((prevMessages) => [...prevMessages, receivedMessage])
		scrollToBottom()
	}

	const scrollToBottom = () => {
		if (messageAreaRef.current) {
			messageAreaRef.current.scrollTop =
				messageAreaRef.current.scrollHeight
		}
	}

	const getAvatarColor = (messageSender: string): string => {
		let hash = 0
		for (let i = 0; i < messageSender.length; i++) {
			hash = 31 * hash + messageSender.charCodeAt(i)
		}
		const index = Math.abs(hash % colors.length)
		return colors[index]
	}

	return (
		<div>
			{!isConnected ? (
				<div id='username-page'>
					<form onSubmit={connect}>
						<input
							type='text'
							placeholder='Enter your name'
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							required
						/>
						<input
							type='password'
							placeholder='Enter password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
						<button type='submit'>Join Chat</button>
					</form>
				</div>
			) : (
				<div id='chat-page'>
					<div
						ref={messageAreaRef}
						id='messageArea'>
						<ul>
							{messages.map((msg, index) => (
								<li
									key={index}
									className={
										msg.sender === username
											? 'own-message'
											: 'chat-message'
									}>
									<i
										style={{
											backgroundColor: getAvatarColor(
												msg.sender
											),
										}}>
										{msg.sender[0]}
									</i>
									<span>{msg.sender}</span>
									<p>{msg.content}</p>
								</li>
							))}
						</ul>
					</div>
					<form onSubmit={sendMessage}>
						<input
							type='text'
							placeholder='Enter a message'
							value={message}
							onChange={(e) => setMessage(e.target.value)}
							required
						/>
						<button type='submit'>Send</button>
					</form>
				</div>
			)}
		</div>
	)
}

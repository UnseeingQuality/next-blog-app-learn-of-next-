'use client';
import { Metadata } from 'next';
import { useState } from 'react';

export const metadata: Metadata = {
  title: "Autorization",
}

export default function Form() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();

    if (!username || !password) {
      alert('Please enter username and password.');
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:4567/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const cookies = document.cookie;
        console.log('Cookies:', cookies);
        location.assign('/app/parsing')
      } else {
        alert('Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('An error occurred during login. Please try again.');
    }
  }

  return (
    <>
      <h1>Penguin Code</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          name="username"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Submit</button>
      </form>
    </>
  );
}

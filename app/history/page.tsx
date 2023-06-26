'use client'

import {useState, useEffect } from 'react';
import axios from 'axios';
import { request } from 'http';
import Link from 'next/link';

export default function History() {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const cookies = document.cookie;
                const response = await axios.get('http://127.0.0.1:4567/parse/history', {
                    headers: {
                        Authorization: `Bearer ${cookies}`,
                    },
                });
                setHistory(response.data);
            } catch (error) {
                console.error("ERROR FETCHING HISTORY: ", error);
            }
        };

        fetchHistory();
    }, []);

    return (
        <div>
            <h1>История запросов</h1>
            <ul>
                {history.map((request) => (
                    <li key={request.id}>
                        <Link href={`/history/${request.id}`}>{request.url}</Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}
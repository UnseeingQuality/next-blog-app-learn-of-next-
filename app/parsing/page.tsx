'use client'

import { useState } from 'react';
import axios from 'axios';

export default function ParsePage() {
  const [url, setUrl] = useState('');
  const [popularWords, setPopularWords] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const handleParse = async () => {

    if (!url) {
      alert('Please enter url.');
      return;
    }

    try {
      const response = await axios.post('/parse/data', {
        url: url,
        save: true,
        timeout:20000
      });
      const { popular_words } = response.data;
      setPopularWords(popular_words);
      setErrorMessage('');
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setErrorMessage(error.response.data.error);
      } else {
        setErrorMessage('Ошибка при выполнении запроса.');
        console.error("Error: ", error);
        alert('Ошибка при выполнении запроса')
      }
      setPopularWords([]);
    }
  };

  return (
    <div>
      <h1>Парсинг HTML страницы</h1>
      <form>
        <input 
          type="text"
          name="URL"
          id="URL"
          value={url} 
          onChange={(e) => setUrl(e.target.value)}
          placeholder='URL страницы' 
        />
        <button type="submit" onClick={handleParse}>Парсить</button>
        {errorMessage && <p>{errorMessage}</p>}
      </form>
      <h2>Самые популярные слова:</h2>
      <ul>
        {popularWords.map((word, index) => (
          <li key={index}>{word}</li>          
          ))}
      </ul>    
    </div>
  );
};


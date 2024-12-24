import React, { useState } from 'react';
import styled from 'styled-components';
import {useEffect} from 'react';

const MovieForm = ({ action, authorId }) => {
  const [formError, setFormError] = useState('');
useEffect(() => { document.title = 'Add a Movie'; }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const genre = formData.get('genre');
    const rating = formData.get('rating');
    const genreRegex = /^[A-Za-z\s]+$/;
    if (!genreRegex.test(genre)) {
      setFormError('Genre can only contain letters and spaces');
      return;
    }
    const ratingValue = parseFloat(rating);
    if (isNaN(ratingValue) || ratingValue < 0 || ratingValue > 10) {
      setFormError('Rating must be a number between 0 and 10');
      return;
    }

    setFormError('');
    action({
      title: formData.get('title'),
      genre,
      imgsrc: formData.get('imgsrc'),
      rating: ratingValue,
      releaseDate: formData.get('releaseDate'),
      description: formData.get('description')
    });
  };

  return (
    <StyledWrapper>
      <h2>Movie Form</h2>
      <div className="form-container">
        <form className="form" onSubmit={handleSubmit}>
          {formError && <div className="error-message">{formError}</div>}
          <div className="form-group">
            <label htmlFor="title">Movie Title</label>
            <input type="text" id="title" name="title" required placeholder="Enter movie title" />
          </div>
          <div className="form-group">
            <label htmlFor="genre">Genre</label>
            <input 
              type="text" 
              id="genre" 
              name="genre" 
              required 
              placeholder="Enter movie genre"
              pattern="[A-Za-z\s]+"
              title="Genre can only contain letters and spaces"
            />
          </div>
          <div className="form-group">
            <label htmlFor="rating">Rating</label>
            <input 
              type="number" 
              id="rating" 
              name="rating" 
              required 
              placeholder="Enter movie rating" 
              min="0" 
              max="10"
              step="0.1"
              onInput={(e) => {
                if (!/^\d*\.?\d*$/.test(e.target.value)) {
                  e.target.value = e.target.value.replace(/[^\d.]/g, '');
                }
              }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="imgsrc">imgsrc</label>
            <input type="text" id="imgsrc" name="imgsrc" required placeholder="ADD the link for the poster" />
          </div>
          <div className="form-group">
            <label htmlFor="releaseDate">Release Date</label>
            <input type="date" id="releaseDate" name="releaseDate" required />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea name="description" id="description" rows={4} required placeholder="Enter movie description" />
          </div>
          <div className="form-group">
            <label htmlFor="authorId">Author ID</label>
            <input
              type="text"
              id="authorId"
              name="authorId"
              value={authorId}
              readOnly
              required
            />
          </div>
          <button className="form-submit-btn" type="submit">Submit</button>
        </form>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .form-container {
    width: 500px;
    background: linear-gradient(#212121, #212121) padding-box,
                linear-gradient(145deg, transparent 35%,#e81cff, #40c9ff) border-box;
    border: 2px solid transparent;
    padding: 32px 24px;
    font-size: 14px;
    font-family: inherit;
    color: white;
    display: flex;
    flex-direction: column;
    gap: 20px;
    box-sizing: border-box;
    border-radius: 16px;
    margin: 20px   auto;
  }
  h2{
  font-family: 'Poppins', sans-serif;
    text-align: center;
  }
  .form-container button:active {
    scale: 0.95;
  }

  .form-container .form {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .form-container .form-group {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .form-container .form-group label {
    display: block;
    margin-bottom: 5px;
    color: #717171;
    font-weight: 600;
    font-size: 12px;
  }

  .form-container .form-group input,
  .form-container .form-group textarea {
    width: 400px;
    padding: 12px 16px;
    border-radius: 8px;
    color: #fff;
    font-family: inherit;
    background-color: transparent;
    border: 1px solid #414141;
  }

  .form-container .form-group input::placeholder,
  .form-container .form-group textarea::placeholder {
    opacity: 0.5;
  }

  .form-container .form-group input:focus,
  .form-container .form-group textarea:focus {
    outline: none;
    border-color: #e81cff;
  }

  .form-container .form-submit-btn {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    align-self: flex-start;
    font-family: inherit;
    color: #717171;
    font-weight: 600;
    width: 40%;
    background: #313131;
    border: 1px solid #414141;
    padding: 12px 16px;
    font-size: inherit;
    gap: 8px;
    margin-top: 8px;
    cursor: pointer;
    border-radius: 6px;
  }

  .form-container .form-submit-btn:hover {
    background-color: #fff;
    border-color: #fff;
  }

  .error-message {
    color: #ff4444;
    background: rgba(255, 68, 68, 0.1);
    border-radius: 4px;
    padding: 10px;
    margin-bottom: 15px;
    text-align: center;
  }
`;

export default MovieForm;

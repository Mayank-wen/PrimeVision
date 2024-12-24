import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import styled from "styled-components";
import { TOGGLE_FAVORITE } from "../gql/query";

const Switch = ({ movieId, favoriteCount, me }) => {
  const [count, setCount] = useState(favoriteCount);
  const [favorited, setFavorited] = useState(
    me?.favorites?.some((movie) => movie.id === movieId) || false
  );

  const [toggleFavorite, { loading }] = useMutation(TOGGLE_FAVORITE, {
    onError: (error) => {
      alert("Error toggling favorite:", error);
    },
    onCompleted: (data) => {
      alert("Successfully toggled:", data);
    },
  });

  const handleToggle = async () => {
    try {
      await toggleFavorite({
        variables: { id: movieId }, // Use movieId instead of Id
      });
      setFavorited(!favorited);
      setCount(favorited ? count - 1 : count + 1);
    } catch (e) {
      alert(`Error toggling favorite: ${e.message}`);
    }
  };

  return (
    <StyledWrapper>
      <div className="checkbox-wrapper-5">
        <div className="check">
          <input
            type="checkbox"
            id={`check-${movieId}`}
            checked={favorited}
            onChange={handleToggle}
            disabled={loading}
          />
          <label htmlFor={`check-${movieId}`} />
          <span className="tooltip">
            {favorited ? "Remove from favorites" : "Add to favorites"}
          </span>
        </div>
      </div>
    </StyledWrapper>
  );
};

// Styled Component remains unchanged
const StyledWrapper = styled.div`
  .checkbox-wrapper-5 .check {
    --size: 30px;
    position: relative;
    background: linear-gradient(90deg, #f19af3, #f099b5);
    line-height: 0;
    perspective: 400px;
    font-size: var(--size);
  }

  .checkbox-wrapper-5 .check input[type="checkbox"],
  .checkbox-wrapper-5 .check label,
  .checkbox-wrapper-5 .check label::before,
  .checkbox-wrapper-5 .check label::after,
  .checkbox-wrapper-5 .check {
    appearance: none;
    display: inline-block;
    border-radius: var(--size);
    border: 0;
    transition: 0.35s ease-in-out;
    box-sizing: border-box;
    cursor: pointer;
  }

  .checkbox-wrapper-5 .check label {
    width: calc(2.2 * var(--size));
    height: var(--size);
    background: #d7d7d7;
    overflow: hidden;
  }

  .checkbox-wrapper-5 .check input[type="checkbox"] {
    position: absolute;
    z-index: 1;
    width: calc(0.8 * var(--size));
    height: calc(0.8 * var(--size));
    top: calc(0.1 * var(--size));
    left: calc(0.1 * var(--size));
    background: linear-gradient(45deg, #dedede, #ffffff);
    box-shadow: 0 6px 7px rgba(0, 0, 0, 0.3);
    outline: none;
    margin: 0;
  }

  .checkbox-wrapper-5 .check input[type="checkbox"]:checked {
    left: calc(1.3 * var(--size));
  }

  .checkbox-wrapper-5 .check input[type="checkbox"]:checked + label {
    background: transparent;
  }

  .checkbox-wrapper-5 .check label::before,
  .checkbox-wrapper-5 .check label::after {
    content: "· ·";
    position: absolute;
    overflow: hidden;
    left: calc(0.15 * var(--size));
    top: calc(0.5 * var(--size));
    height: var(--size);
    letter-spacing: calc(-0.04 * var(--size));
    color: #9b9b9b;
    font-family: "Times New Roman", serif;
    z-index: 2;
    font-size: calc(0.6 * var(--size));
    border-radius: 0;
    transform-origin: 0 0 calc(-0.5 * var(--size));
    backface-visibility: hidden;
  }

  .checkbox-wrapper-5 .check label::after {
    content: "●";
    top: calc(0.65 * var(--size));
    left: calc(0.2 * var(--size));
    height: calc(0.1 * var(--size));
    width: calc(0.35 * var(--size));
    font-size: calc(0.2 * var(--size));
    transform-origin: 0 0 calc(-0.4 * var(--size));
  }

  .checkbox-wrapper-5 .check input[type="checkbox"]:checked + label::before,
  .checkbox-wrapper-5 .check input[type="checkbox"]:checked + label::after {
    left: calc(1.55 * var(--size));
    top: calc(0.4 * var(--size));
    line-height: calc(0.1 * var(--size));
    transform: rotateY(360deg);
  }

  .checkbox-wrapper-5 .check input[type="checkbox"]:checked + label::after {
    height: calc(0.16 * var(--size));
    top: calc(0.55 * var(--size));
    left: calc(1.6 * var(--size));
    font-size: calc(0.6 * var(--size));
    line-height: 0;
  }

  /* Tooltip styling */
  .checkbox-wrapper-5 .check .tooltip {
    visibility: hidden;
    position: absolute;
    top: -0px;
    left: 130px;
    transform: translateX(-50%);
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 10px;
    border-radius: 3px;
    font-size: 12px;
    opacity: 0;
    transition: opacity 0.3s;
    width: 100px;
  }

  .checkbox-wrapper-5 .check:hover .tooltip {
    visibility: visible;
    opacity: 1;
  }
`;

export default Switch;

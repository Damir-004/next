"use client"

import React, { useState, useEffect } from 'react';
import all from '../css/all.css';

function Shoes() {
  const [posts, setPosts] = useState([]);
  const [blockId, setBlockId] = useState(null);
  const [block, setBlock] = useState(null);
  const colors = ['black', 'red'];
  const [currentColorIndex, setCurrentColorIndex] = useState(0);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('https://api.escuelajs.co/api/v1/products?offset=0&limit=10');
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.log('Ошибка при загрузке постов:', error);
    }
  };

  const handleUserClick = (postId) => {
    const selectedPost = posts.find((post) => post.id === postId);
    setBlockId(postId);
    setBlock(selectedPost);
    const newURL = `http://localhost:3000/clothing/${postId}`;
    window.history.pushState(null, '', newURL);
  };

  useEffect(() => {
    const handlePopstate = () => {
      const postId = window.location.pathname.replace('/clothing/', '');
      setBlockId(postId);
    };
    window.addEventListener('popstate', handlePopstate);
    return () => {
      window.removeEventListener('popstate', handlePopstate);
    };
  }, []);

  const handleClick = () => {
    setCurrentColorIndex((currentColorIndex + 1) % colors.length);
  };

  const blockStyle = {
    width: '50px',
    height: '50px',
    color: colors[currentColorIndex],
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '24px',
    fontWeight: 'bold',
    cursor: 'pointer',
  };

  return (
    <div className="container_new_in">
      <div className="new_in">
        <h1>Shoes</h1>
        <div className="new-in_top">
          <h2 className="sort box_sort_filter">Sort</h2>
          <h2 className="filter box_sort_filter">
            <span>{0}</span> Filter
          </h2>
        </div>
      </div>
      <div className="clothing">
        {block && (
          <div className="clothing_block">
            <img src={block.images} alt="Image" />
            <div className="clothing_block-box">
              <p>{block.title}</p>
              <h2>Price: {block.price}$</h2>
            </div>
            <div className="clothing_block-box clothing_block_center">
              <button className='add_to_cart'>Add to Cart</button>
              <>
                <i class="fa-solid fa-heart" style={blockStyle} onClick={handleClick}></i>
              </>
            </div>
            <div className="clothing_block-box">
              <h3>Product Information</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa numquam quibusdam eveniet tenetur ipsam,
                ratione repudiandae possimus necessitatibus ad modi cumque unde veniam quaerat illo sed voluptatum
                temporibus provident fugit.
              </p>
            </div>
          </div>
        )}
        <ul className="ul">
          {posts.map((post) => (
            <li
              key={post.id}
              className="li"
              style={blockId ? { display: 'none' } : {}}
              onClick={() => handleUserClick(post.id)}
            >
              <img src={post.images} alt="" />
              <span>№ {post.id}</span>
              <p>{post.title}</p>
              <p>{post.price} $</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Shoes;
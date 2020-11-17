import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import './Favorites.css';

const Favorites = (props) => {

    const faveSongs = 
        props.faves[0] ?
        props.faves.map((song, i) => {
            return (
            <article key={song.id} className='container-fave'>
				<p className='title-fave'>{song.title}</p>
				<p className='artist-fave'>{song.artist}</p>
				<p className='time-fave'>{song.time}</p>
				<FontAwesomeIcon className='fave-fave'
                    icon={faHeart}
                        onClick={() => {props.removeFromFaves(song);}}
				/>
			</article>
            )
        })
        : 'No favorites yet! Heart some songs..'


	return (
        <div className='faves'>
            {faveSongs}
        </div>
    )
};

export default Favorites;
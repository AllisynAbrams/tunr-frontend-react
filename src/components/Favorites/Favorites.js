import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const Favorites = (props) => {

    const faveSongs = 
        props.faves[0] ?
        props.faves.map((song, i) => {
            return (
            <article key={song.id}>
				<p>{song.title}</p>
				<p>{song.artist}</p>
				<p>{song.time}</p>
				<FontAwesomeIcon
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
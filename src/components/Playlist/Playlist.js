import React, {useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import './Playlist.css';

const Playlist = (props) => {
    const {songs} = props

    const loaded = () => (
			<div>
				{songs.map((song) => (
					<article key={song.id} className='container'>
						<p className='title'>{song.title}</p>
						<p className='artist'>{song.artist}</p>
						<p className='time'>{song.time}</p>
						<button className='delete'
							onClick={() => {
								props.deleteSong(song);
							}}>
							X
						</button>
						<button className='edit'
							onClick={() => {
								props.selectASong(song);
								props.history.push('/update');
							}}>
							Edit
						</button>
						<FontAwesomeIcon className='fave'
							icon={faHeart}
							onClick={() => {
								props.addToFaves(song);
							}}
						/>
					</article>
				))}
			</div>
		);

    return songs.length > 0 ? loaded() : <h1>Loading...</h1>
}

export default Playlist

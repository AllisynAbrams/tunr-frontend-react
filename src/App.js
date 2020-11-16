import './App.css';
import React, {useState, useEffect} from 'react'
import { Route, Link, Switch } from 'react-router-dom';
import Playlist from './components/Playlist/Playlist'
import Favorites from './components/Favorites/Favorites';
import Form from './components/Form/Form';

function App() {

  const url = 'https://tunr-app-aa-api.herokuapp.com/songs'

  const [songs, setSongs] = useState([])
  const [faves, setFaves] = useState([])

  const emptySong = {
		title: '',
		artist: '',
		time: '',
  }
  
  // GET -- SONGS INDEX (ALL SONGS)
  const getSongs = async () => {
    try {
      const res = await fetch(url)
      const songsData = await res.json()
      setSongs(songsData)
    } catch (err) {
      console.log('this is err - ', err)
    }
  };
  
  console.log('this is songs - ', songs)

	useEffect(() => {
		getSongs();
  }, []);
  
  // DELETE -- DELETE SONG
  const deleteSong = (song) => {
		fetch(url + '/' + song.id, {
			method: 'delete',
		}).then((response) => getSongs());
	};

  // POST -- ADD A SONG
  const handleAddSong = (newSong) => {
		fetch(url, {
      method: 'post',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(newSong),
		}).then((response) => getSongs());
	};


  return (
		<div className='App'>
			<header className='header'>
				<h1>TUNR</h1>
				<h2>FOR ALL YOUR PLAYLIST NEEDS</h2>
			</header>

			<Switch>
				<Route
					exact
					path='/'
					render={(routerProps) => (
						<div>
							<Playlist
								{...routerProps}
								songs={songs}
								deleteSong={deleteSong}
							/>
							<Favorites {...routerProps} />
							<Form {...routerProps} handleAddSong={handleAddSong} />
						</div>
					)}
				/>

				<Route
					exact
					path='/update'
					render={(routerProps) => <Form {...routerProps} />}
				/>
			</Switch>
		</div>
	);
}

export default App;

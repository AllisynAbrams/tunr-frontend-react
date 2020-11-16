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

  const emptySong = {
	title: '',
	artist: '',
	time: '',
};

const [selectedSong, setSelectedSong] = useState(emptySong);

  // POST -- ADD A SONG
  const handleAddSong = (newSong) => {
		fetch(url, {
      method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify(newSong),
    }).then((response) => getSongs());
    setSelectedSong(emptySong)
  };
  
  // PUT -- UPDATE A SONG
  const handleUpdateSong = (song) => {
		fetch(url + '/' + song.id, {
			method: 'put',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(song),
    }).then((response) => getSongs());
    setSelectedSong(emptySong);
  };
  
  const selectASong = (song) => {
    setSelectedSong(song)
  }

  console.log('this is selectedSong - ', selectedSong);


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
							<h2>My Playlist</h2>
							<Playlist
								{...routerProps}
								songs={songs}
								deleteSong={deleteSong}
								selectASong={selectASong}
							/>
							<h2>My Favorites</h2>
							<Favorites {...routerProps} />
							<h2>Add Song to Playlist</h2>
							<Form
								{...routerProps}
								emptySong={emptySong}
								handleAddSong={handleAddSong}
								selectedSong={selectedSong}
								label='Add Song'
							/>
						</div>
					)}
				/>

				<Route
					exact
					path='/update'
					render={(routerProps) => (
						<Form
							{...routerProps}
							emptySong={emptySong}
							handleUpdateSong={handleUpdateSong}
							selectedSong={selectedSong}
							label='Update'
						/>
					)}
				/>
			</Switch>
		</div>
	);
}

export default App;

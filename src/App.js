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

  // ADD TO FAVORITES
  const addToFaves = (song) => {
    const favesArray = [...faves]
    const songIndex = favesArray.indexOf(song)
    if (songIndex < 0) {
      favesArray.push(song) 
          console.log(`adding ${song.name} to favesArray`)
      setFaves(favesArray)
          console.log('this is faves - ', faves)
    } 
  }

  const removeFromFaves = (song) => {
		const favesArray = [...faves];
		const newFavesArray = favesArray.filter((index) => index !== song);
		console.log('this isnewFavesArray:', newFavesArray);
		setFaves(newFavesArray);
	};

  return (
		<div className='App'>
			<header className='header'>
				<h1>TUNR.</h1>
				<h4>FOR ALL YOUR PLAYLIST NEEDS</h4>
				<div className='border'></div>
			</header>

			<Switch>
				<Route
					exact
					path='/'
					render={(routerProps) => (
						<div>
							<h2 className='playlist'>PLAYLIST</h2>
							<Playlist
								{...routerProps}
								songs={songs}
								deleteSong={deleteSong}
								selectASong={selectASong}
								faves={faves}
								addToFaves={addToFaves}
							/>

							<h2 className='favorite'>FAVORITE SONG LIST</h2>
							<Favorites
								{...routerProps}
								faves={faves}
								removeFromFaves={removeFromFaves}
							/>

							<h2 className='add'>ADD A NEW SONG TO PLAYLIST</h2>
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

import './App.css';
import { Route, Link, Switch } from 'react-router-dom';
import Playlist from './components/Playlist/Playlist'
import Favorites from './components/Favorites/Favorites';
import Form from './components/Form/Form';

function App() {
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
							<Playlist {...routerProps} />
							<Favorites {...routerProps} />
							<Form {...routerProps} />
						</div>
					)}
				/>

				<Route
					exact
					path='/update'
					render={(routerProps) => (
          <Form {...routerProps} />
          )}
				/>

			</Switch>
		</div>
	);
}

export default App;

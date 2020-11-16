import React, { useState, useEffect } from 'react';

const Form = (props) => {

    const [formData, setFormData] = useState()

    const handleSubmit = (event) => {
        event.preventDefault();
        props.handleAddSong(formData)
    }

    const handleChange = (event) => {
		setFormData({ ...formData, [event.target.name]: event.target.value });
        };
        

	return (
		<div className='form'>
			<h3>ADD SONG TO PLAYLIST</h3>
			<form onSubmit={handleSubmit}>
				<p>TITLE</p>
				<input
					type='text'
					name='title'
					// value={formData.title}
					onChange={handleChange}
				/>
				<p>ARTIST</p>
				<input
					type='text'
					name='artist'
					// value={formData.artist}
					onChange={handleChange}
				/>
				<p>TIME</p>
				<input
					type='text'
					name='time'
					// value={formData.time}
					onChange={handleChange}
				/>
				<br />
				<input type='submit' value='Add Song' className='submit-button' />
			</form>
		</div>
	);
};

export default Form;
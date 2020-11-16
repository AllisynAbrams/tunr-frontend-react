import React, { useState, useEffect } from 'react';

const Form = (props) => {

    const [formData, setFormData] = useState(props.selectedSong)

    // console.log('formData - ', formData)

    const handleSubmit = (event) => {
        event.preventDefault();
        props.label === 'Add Song' ? props.handleAddSong(formData) : props.handleUpdateSong(formData);
        setFormData(props.emptySong)
        props.history.push('/')
    }

    const handleChange = (event) => {
		setFormData({ ...formData, [event.target.name]: event.target.value });
        };
        

	return (
		<div className='form'>
			<form onSubmit={handleSubmit}>
				<p>TITLE</p>
				<input
					type='text'
					name='title'
					value={formData.title}
					onChange={handleChange}
				/>
				<p>ARTIST</p>
				<input
					type='text'
					name='artist'
					value={formData.artist}
					onChange={handleChange}
				/>
				<p>TIME</p>
				<input
					type='text'
					name='time'
					value={formData.time}
					onChange={handleChange}
				/>
				<br />
				<input type='submit' value={props.label} className='submit-button' />
			</form>
		</div>
	);
};

export default Form;
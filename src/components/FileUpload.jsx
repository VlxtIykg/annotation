import React, { useState } from 'react';
import DOMPurify from 'dompurify';

const FileUpload = () => {
	const [file, setFile] = useState(null);
	const [result, setResult] = useState('');

	const handleFileChange = (event) => {
		setFile(event.target.files[0]);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		if (file) {
			const formData = new FormData();
			formData.append('file', file);

			// Assuming you have an endpoint to handle the file upload
			const response = await fetch('/api/upload', {
				method: 'POST',
				body: formData,
			});

			const data = await response.json();
			setResult(data.message);
		}
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<input  className="border" type="file" onChange={handleFileChange} />
				<button className="border" type="submit">Upload</button>
			</form>
			{result && <div id="diarized_text" className="max-w-prose personal_ct center flex flex-wrap" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(result) }} />}
		</div>
	);
};

export default FileUpload;

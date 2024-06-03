import React, { useState } from 'react';
import DOMPurify from 'dompurify';
import speechmatic from '@assets/speechmatic.svg';
import wsx from '@assets/wsx.svg';

const FileUpload = () => {
	const [file, setFile] = useState(null);
	const [result, setResult] = useState('');
	const [selectedFormatter, setSelectedFormatter] = useState(null);

	const handleRadioChange = (event) => {
		setSelectedFormatter(event.target.id);
	};

	const handleFileChange = (event) => {
		setFile(event.target.files[0]);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		if (file) {
			const formData = new FormData();
			formData.append('file', file);
			formData.append('formatter', selectedFormatter); 


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
		<div className=''>
				
				<form onSubmit={handleSubmit}>
					<fieldset>
						<legend className='sr-only'>Choose file format</legend>
						<div className='flex flex-wrap justify-center items-center'>
								<div className='flex flex-wrap justify-center'>
									<div className='relative h-28 w-28 m-2'>
										<label className='sr-only ' htmlFor="formatter">Speechmatics</label>
										<div className='flex flex-col items-center justify-center h-full'>
									<input className='absolute h-full w-full m-0 cursor-pointer z-10 opacity-0 peer/spm' type="radio" name="formatter" id="sms" onChange={handleRadioChange} />
									<img src={speechmatic.src} alt="Speechmatics" className='w-16 h-16 peer-checked/spm:w-20 peer-checked/spm:h-20 peer-checked/spm:border-indigo-500 peer-checked/spm:border-solid peer-checked/spm:border-2' />
											<p className='text-indigo-600 font-semibold text-sm tracking-wider'>speechmatics</p>
										</div>
									</div>
								</div>
								
						<div className='flex flex-wrap justify-center'>
							<div className='relative h-28 w-28 m-2'>
										<label className='sr-only' htmlFor="formatter">Whisper-x</label>
										<div className='test flex flex-col items-center justify-center h-full -z-10'>
											<input className='absolute h-full w-full m-0 cursor-pointer z-10 opacity-0 peer/wsx' type="radio" name="formatter" id="wsx"  onChange={handleRadioChange} />
											<img src={wsx.src} alt="Speechmatics" className='w-16 h-16 peer-checked/wsx:w-20 peer-checked/wsx:h-20 peer-checked/wsx:border-indigo-500 peer-checked/wsx:border-solid peer-checked/wsx:border-2' />
											<p className='text-indigo-600 font-semibold text-sm tracking-wider'>whisper-x</p>
										</div>
									</div>
								</div>
							</div>
						
						<br />
						
						<legend className='sr-only'>Upload your file</legend>
						<input  className="border" type="file" onChange={handleFileChange} />
						<button className="border" type="submit">Upload</button>
					</fieldset>
				</form>
			{result && <div id="diarized_text" className="max-w-prose personal_ct flex flex-wrap" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(result) }} />}
		</div>
	);
};

export default FileUpload;

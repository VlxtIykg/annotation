import { useState, useEffect } from "react";
import DOMPurify from "dompurify";
import spm from "@assets/spms.svg";
import whis from "@assets/whisp.svg";
import findUniqueSpeakers from "@scripts/brkline.js";
import cardActivator from "@scripts/card_activator.js";

const FileUpload = () => {
	const [file, setFile] = useState(null);
	const [fileName, setFileName] = useState("");
	const [result, setResult] = useState("");
	const [selectedFormatter, setSelectedFormatter] = useState(null);

	const handleRadioChange = (event) => {
		setSelectedFormatter(event.target.id);
	};

	const handleFileChange = (event) => {
		const selectedFile = event.target.files[0];
		setFile(selectedFile);
		if (selectedFile) {
			const name = selectedFile.name;
			setFileName(`${name}`);
		}
	};

	const handleSubmit = async (event) => {
		fetch("/api/upload", { method: "GET" })
			.then((data) => data.json())
			.then((data) => console.log(data))
			.catch((err) => console.log(err));
		console.log("submitting!");
		event.preventDefault();

		const debug_level = 101;
		const formdata = new FormData();
		formdata.append("file", file, fileName);
		formdata.append("formatter", selectedFormatter);

		const requestOptions = {
			method: "POST",
			body: formdata,
			redirect: "follow",
		};

		try {
			const response = await fetch("/api/upload", requestOptions);
			const result = await response.text();
			if (debug_level > 100) {
				console.log(response);
				console.log(result);
			}
			try {
				let div = JSON.parse(result);
				setResult(div.message);
			} catch (error) {
				setResult(error);
			}
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		if (result) {
			cardActivator();
			findUniqueSpeakers();
		}
	}, [result]);

	return (
		<div className="">
			<form onSubmit={handleSubmit} id="form">
				<fieldset>
					<legend className="sr-only">Choose file format</legend>
					<div className="flex flex-wrap justify-center">
						<div className="flex flex-wrap justify-center">
							<div className="relative h-28 w-28 m-2">
								<label className="sr-only " htmlFor="formatter">
									Speechmatics
								</label>
								<div className="flex flex-col items-center justify-center h-full">
									<input
										className="absolute h-full w-full m-0 cursor-pointer z-10 opacity-0 peer/spm"
										type="radio"
										name="formatter"
										id="sms"
										onChange={handleRadioChange}
									/>
									<img
										src={spm.src}
										alt="Speechmatics"
										className="w-20 peer-checked/spm:w-20 peer-checked/spm:h-20 peer-checked/spm:border-indigo-500 peer-checked/spm:border-solid peer-checked/spm:border-2"
									/>
									<p className="text-white-600 text-sm tracking-wide">
										Speechmatics
									</p>
								</div>
							</div>
						</div>
						<div className="flex flex-wrap justify-center">
							<div className="relative h-28 w-28 m-2">
								<label className="sr-only" htmlFor="formatter">
									Whisper-x
								</label>
								<div className="test flex flex-col items-center justify-center h-full -z-10">
									<input
										className="absolute h-full w-full cursor-pointer z-10 opacity-0 peer/wsx"
										type="radio"
										name="formatter"
										id="wsx"
										onChange={handleRadioChange}
									/>
									<img
										src={whis.src}
										alt="Whisper-x"
										className="w-20 peer-checked/wsx:w-20 peer-checked/wsx:h-20 peer-checked/wsx:border-indigo-500 peer-checked/wsx:border-solid peer-checked/wsx:border-2"
									/>
									<p className="text-white-600 text-sm tracking-wide">
										Whisper-x
									</p>
								</div>
							</div>
						</div>
					</div>
					<br />
					<legend className="sr-only">Upload your file</legend>
					<div className="border-2 bg-black rounded-lg w-fit mx-auto my-0 fontify cursor-pointer">
						<input
							type="file"
							id="files"
							className="hidden"
							onChange={handleFileChange}
						/>
						<label className="px-1 cursor-pointer" htmlFor="files">
							{fileName || "Select file"}
						</label>
						<br></br>
					</div>
					<div className="h-1 p-1"></div>
					<div className="border-2 bg-black px-1 rounded-lg w-fit mx-auto my-0 fontify">
						<button className="text-white-500" type="submit">
							Submit
						</button>
					</div>
				</fieldset>
			</form>
			{result && (
				<div
					id="diarized_text"
					className="max-w-prose personal_ct flex flex-wrap"
					dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(result) }}
				/>
			)}
		</div>
	);
};

export default FileUpload;

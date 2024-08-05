import autoFill from "./parser";
import htmlFormatter from "@scripts/htmlformatter";

export async function GET() {
	return new Response(
		JSON.stringify({ status: 200, message: "GET request received" }),
	);
}

export async function POST(context) {
	// TODO - Add error handling for file upload
	// TODO - Add ways to add files directly without type
	// TODO - Add zip support
	const [formData, formDataError] = await handleTryCatch(context.request.formData());
	if (formDataError) {
		console.error("Error extracting form data:", formDataError);
		return new Response(
			JSON.stringify({
				status: 400,
				message: "Failed to extract form data",
				error: {message: formDataError.message, stack: error}
			}),
			{ status: 400, headers: { "Content-Type": "application/json" } }
		);
	}

	const file = formData.get("file");
	let type = formData.get("file").type;
	const formatter = formData.get("formatter");


	if (!file) {
		return new Response(
			JSON.stringify({
				status: 400,
				message: "No file provided"
			}),
			{ status: 400, headers: { "Content-Type": "application/json" } }
		);
	}
	
	const [fileContent, fileContentError] = await handleTryCatch(file.text());
  if (fileContentError) {
    console.error("Error reading file content:", fileContentError);
    return new Response(
      JSON.stringify({
        status: 400,
        message: "Failed to read file content, please send an issue to the github! Don't forget to screenshot console via browser and/or read the issue.md! Thank you very much!",
				note: "Perhaps change .text() to .json() or JSON.parse(variable) or JSON.stringify(variable) or something else",
        error: {message: fileContentError.message, stack: fileContentError}
      }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

	const [jsonContent, jsonError] = await handleTryCatch(JSON.parse(fileContent));
	if (jsonError) {
		return new Response(
			JSON.stringify({
				status: 400,
				message: "Failed to parse JSON",
				error: error.message
			}),
			{ status: 400, headers: { "Content-Type": "application/json" } }
		);
	}

  if ((type === null || type === undefined || type === "") && jsonContent !== null) {
    type = "application/json";
  }

	return context_Handler(jsonContent, type, formatter, false);
}


/**
 * @description Handles the context of the request (whether it is a JSON or ZIP file) and formats it accordingly into it's respective html and divs and sends back the response object!
 * @param {Blob | JSON} json_str Zip not supported yet, only JSON, JSON is parsed previously, failure to parse will return an error response and not reach this function
 * @param {string} type In forms of application/*, * being type i.e. zip, json, etc
 * @param {string} formatter Either sms or wsx only! String type only.
 * @param {boolean} skip Whether to skip entire switch case and run the default case, for debugging purposes
 * @returns {Response} Returns a 200 response request back to the user
 */
export async function context_Handler(json_str, type, formatter, skip) {
  console.log({type});
	if (skip) type = skip;
	switch (type) {
		// Localhost receives JSON files as application/json;charset=utf-8 and as [object Blob]
		case "application/json;charset=utf-8": {
			const extrapolated_data = autoFill(json_str, formatter);
			const html_str = htmlFormatter(extrapolated_data);
			return new Response(JSON.stringify({ status: 200, message: html_str }));
		}
		/**
		 * Cloudflare receives
		 * JSON files as application/json and as [object Object] <- postman and site
		 * ZIP files as application/zip and as [object Blob]
		 */
		case "application/json": {
			const extrapolated_data = autoFill(json_str, formatter);
			const html_str = htmlFormatter(extrapolated_data);
			return new Response(JSON.stringify({ status: 200, message: html_str }));
		}
		case "application/zip": {
			console.log(formData.get("zip"));
			// Code for handling ZIP file
			return new Response(JSON.stringify({
				status: 500,
				message: `ZIP file not supported yet`,
				reason: `Adding zip file support soon!`,
			}));
		}
		case null: {
			console.log("No content type specified");
			// Code for handling no content type not yet specified or file not uploaded
			return new Response(
				JSON.stringify({
					status: 400,
					message: `No content type specified or no file sent`,
					reason: `For the grace of good god, how did you manage to reach a null content type when it errors earlier if you sent no file?`,
				}),
			);
		}
		default: {
			// Code for handling files that cannot be parsed be it frontend or backend
			console.log("Unsupported content type");
			return new Response(
				JSON.stringify({
					status: 500,
					message: `${json_str}<br>${{formatter}}<br>${type}<br><p>Unsupported content type</p><br>`,
					reason: `Either debugging issues or unsupported content type`,
				}),
			);
		}
	}
}


async function handleTryCatch(request, isFn = false) {
	if (isFn) {
		try {
			const result = request();
			return [result, null];
		} catch (error) {
			return [null, error];
		}
	}
  try {
    const data = await request;
    return [data, null];
  } catch (err) {
    return [null, err];
  }
}
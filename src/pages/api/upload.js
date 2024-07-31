import autoFill from "./parser";
import htmlFormatter from "@scripts/htmlformatter";

export async function POST(context) {
  // TODO - Add error handling for file upload
  // TODO - Add ways to add files directly without type
  // TODO - Add zip support
  try {
    const formData = await context.request.formData();
    const file = formData.get("file");
    const type = formData.get("file").type;
    const formatter = formData.get("formatter");
    let [json_file, err] = await handleTryCatch(file.json());
    if (err) {json_file = file;}
    return context_Handler(json_file, type, formatter, false);
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({
        status: 400,
        message: `Did not receive a file?\n${error}`,
        error,
      }),
    );
  }
}

export async function GET() {
  return new Response(
    JSON.stringify({ status: 200, message: "GET request received" }),
  );
}

/**
 * 
 * @param {Blob | JSON } file Zip not supported yet, file sent to the parent function is sent here
 * @param {string} type In forms of application/*, * being type i.e. zip, json, etc
 * @param {string} formatter Either sms or wsx only! String type only.
 * @param {boolean} skip Whether to skip entire switch case
 * @returns {Response} Returns a response object to send back to original user
 */
export async function context_Handler(json_file, type, formatter, skip) {
  if (skip) type = skip;
  switch (type) {
    // Localhost receives JSON files as application/json;charset=utf-8 and as [object Blob]
    case "application/json;charset=utf-8": {
      const extrapolated_data = autoFill(json_file, formatter);
      const html_str = htmlFormatter(extrapolated_data);
      return new Response(JSON.stringify({ status: 200, message: html_str }));
    }
    /**
     * Cloudflare receives
     * JSON files as application/json and as [object Object] <- postman and site
     * ZIP files as application/zip and as [object Blob]
     */
    case "application/json": {
      const extrapolated_data = autoFill(json_file, formatter);
      const html_str = htmlFormatter(extrapolated_data);
      return new Response(JSON.stringify({ status: 200, message: html_str }));
    }
    case "application/zip": {
      console.log(formData.get("zip"));
      // Code for handling ZIP file
      return;
    }
    case null:
      console.log("No content type specified");
      // Code for handling no content type not yet specified or file not uploaded
      return new Response(
        JSON.stringify({ status: 400, message: `No content type specified or no file sent` }),
      );
    default:
      // Code for handling files that cannot be parsed be it frontend or backend
      const json_file = await file.json();

      console.log("Unsupported content type");
      return new Response(
        JSON.stringify({ status: 400, message: `${json_file}<br>${file}<br>${type}<br><p>Unsupported content type</p><br>`}),
      );
  }
}

async function handleTryCatch(request) {
    return request.then(data => [data, null])
      .catch(err => [null, err]);
  }
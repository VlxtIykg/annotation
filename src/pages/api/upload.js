import autoFill from "./parser";
import htmlFormatter from "@scripts/htmlformatter";

export async function POST(context) {
  // TODO - Add error handling for file upload
  // TODO - Add ways to add files directly without type
  // TODO - Add zip support
  try {
    const formData = await context.request.formData();
    const file = formData.get("file");
    console.log(file);
    const type = formData.get("file").type;
    switch (type) {
      // Localhost receives JSON files as application/json;charset=utf-8 and as [object Blob]
      case "application/json;charset=utf-8": {
        const formatter = formData.get("formatter");
        const json_file = await file.json();
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
        const formatter = formData.get("formatter");
        const json_file = await file.json();
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
        console.log("Unsupported content type");
        // Code for handling files that cannot be parsed be it frontend or backend
        return new Response(
          JSON.stringify({ status: 400, message: `${json_file}<br>${type}<br><p>Unsupported content type</p><br>`}),
        );
    }
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

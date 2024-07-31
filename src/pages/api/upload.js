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
    /*
    switch (type) {
      case "application/json;charset=utf-8": {
        const formatter = formData.get("formatter");
        const json_file = await file.json();
        const extrapolated_data = autoFill(json_file, formatter);
        const html_str = htmlFormatter(extrapolated_data);
        return new Response(JSON.stringify({ status: 200, message: html_str }));
      }
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
        // Code for handling no content type specified
        return new Response(
          JSON.stringify({ status: 400, message: `No content type specified` }),
        );
      default:
        console.log("Unsupported content type");
        // Code for handling unsupported content type
        return new Response(
          JSON.stringify({
            status: 400,
            message: `<p>Unsupported content type</p><br>${type}`,
          }),
        );
    }
    */
    return new Response(JSON.stringify({ status: 200, message: `${file}\n${type}` }));
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ status: 400, message: `Did not receive a file?\n${error}`, error }),
    );
  }
}

export async function GET() {
  return new Response(
    JSON.stringify({ status: 200, message: "GET request received" }),
  );
}

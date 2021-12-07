const endpoint = process.env.NEXT_PUBLIC_API_HOST;

const rest =
  (method = "GET") =>
  async (
    path: string,
    { body = null, json = true }: { body?: any; json?: boolean } = {}
  ) => {
    const headers = {
      "Content-Type": "application/json",
    };
    console.log("in", method, "with", path);
    try {
      let resp = await fetch(`${endpoint}${path}`, {
        method,
        ...(body && {
          body: JSON.stringify({ ...body }),
        }),
        headers,
        credentials: "include",
      });

      try {
        var jsonBody = await resp.json();
      } catch (err: any) {
        if (err.message !== "Unexpected end of JSON input") {
          throw err;
        }
        console.warn("no json body returned");
      }

      if (resp.status >= 500) {
        console.error("resp.status > 500", jsonBody);
        // server error
        throw new Error("Got an unexpected error from API, please try again");
      }
      if (resp.status == 401) {
        return { status: "unauthorized" };
      }

      if (resp.status >= 400 && resp.status < 500) {
        // client error
        console.error("resp.status >= 400 && resp.status < 500", jsonBody);
        return { status: "error", error: jsonBody.error || jsonBody };
      }

      return { status: "ok", body: jsonBody };
    } catch (err) {
      console.error("got general error in api call", err);
      throw new Error("Something went wrong, please try again");
    }
  };

export const get = rest();
export const post = rest("POST");
export const patch = rest("PATCH");
export const put = rest("PUT");
export const del = rest("DELETE");

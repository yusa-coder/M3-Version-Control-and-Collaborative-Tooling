"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderResponse = renderResponse;
function renderResponse(response, formatter) {
    switch (response.status) {
        case "loading":
            return "Loading...";
        case "success":
            return formatter(response.data);
        case "error":
            return `Error ${response.statusCode}: ${response.message}`;
    }
    const _exhaustive = response;
    throw new Error(`Unhandled state: ${JSON.stringify(_exhaustive)}`);
}

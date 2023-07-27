import PasteClient from "pastebin-api";
import { config } from "./config";
const client = new PasteClient(config.PASTEBIN_API_KEY);

export function konwertuj_koordynaty(x: number, y: number) {
  // Oblicz przesunięcie dla osi x i y
  const przesuniecie_x = 1500;
  const przesuniecie_y = 1000;

  // Nowe współrzędne po przesunięciu
  const nowe_x = x + przesuniecie_x;
  const nowe_y = y + przesuniecie_y;

  return [nowe_x, nowe_y];
}

export async function createObject(URL: string, x: number, y: number) {
  const [nowe_x, nowe_y] = konwertuj_koordynaty(x, y);
  const response = await client.createPaste({
    code: `{
            "faction": "",
            "contact": "",
            "templates": [
            {
            "name": "xD",
            "sources": [
            "${URL}"
            ],
            "x": ${nowe_x},
            "y": ${nowe_y}
            }
            ],
            "whitelist": [],
            "blacklist": []
    }`,
    format: "javascript",
    name: "xD",
    publicity: 1
  });
  const pasteId = response.split("/").pop();
  return `https://pastebin.com/raw/${pasteId}`;
}

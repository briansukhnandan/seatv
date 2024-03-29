import fs from "fs";
import path, { PlatformPath } from "path";

/**
 * Really for sanity checking purposes. 
 * Not intended to be used in production.
 */
export async function saveTVPosterToServer(imageBlob: Blob, posterPath: string): Promise<PlatformPath> {
  const postersDir = path.join(__dirname, "/posters");

  if (!fs.existsSync(`${__dirname}/posters`)) {
    fs.mkdirSync(postersDir);
  }

  const imageBuffer = await imageBlob.arrayBuffer();
  const imageView = new DataView(imageBuffer);
  fs.writeFileSync(`${postersDir}/${posterPath.match(/\/(.*)/)[1]}`, imageView);

  return path;
}
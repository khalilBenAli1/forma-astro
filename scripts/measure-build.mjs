import { readdir, readFile, stat } from 'node:fs/promises';
import { gzipSync } from 'node:zlib';
async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  return (
    await Promise.all(
      entries.map(async (entry) =>
        entry.isDirectory()
          ? walk(`${directory}/${entry.name}`)
          : `${directory}/${entry.name}`,
      ),
    )
  ).flat();
}
const files = await walk('dist');
const size = async (path) => ({
  path,
  bytes: (await stat(path)).size,
  gzipBytes: gzipSync(await readFile(path)).length,
});
const scripts = await Promise.all(
  files.filter((path) => path.endsWith('.js')).map(size),
);
const css = await Promise.all(
  files.filter((path) => path.endsWith('.css')).map(size),
);
const images = await Promise.all(
  files.filter((path) => path.endsWith('.webp')).map(size),
);
console.log(
  JSON.stringify(
    {
      htmlRoutes: files.filter((path) => path.endsWith('.html')).length,
      scripts,
      css,
      images,
      totalImageBytes: images.reduce((sum, image) => sum + image.bytes, 0),
    },
    null,
    2,
  ),
);

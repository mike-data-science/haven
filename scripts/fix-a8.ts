import fs from 'fs/promises';
import path from 'path';

async function main() {
  const rootDir = process.cwd();
  const srcFolder = path.join(rootDir, 'a8');
  const destFolder = path.join(rootDir, 'lib', 'properties', 'a8');
  const latestCreatedFolder = path.join(rootDir, 'lib', 'properties', 'latest_created');

  // 1. Delete latest_created so we don't get an empty 'Exemplu'
  try {
    await fs.rm(latestCreatedFolder, { recursive: true, force: true });
    console.log('Removed empty latest_created folder.');
  } catch (e) {
    // Ignore if not found
  }

  // 2. Move a8 to lib/properties/a8
  try {
    const stats = await fs.stat(srcFolder);
    if (stats.isDirectory()) {
      await fs.mkdir(destFolder, { recursive: true });
      
      const files = await fs.readdir(srcFolder);
      let movedImages = 0;
      for (const file of files) {
        await fs.rename(path.join(srcFolder, file), path.join(destFolder, file));
        movedImages++;
      }
      
      const mockDetails = {
        title: "Exemplu",
        description: "Acesta este un apartament exemplu.",
        price: "125000",
        rooms: "3",
        area_sqm: "80",
        floor: "2"
      };
      await fs.writeFile(path.join(destFolder, 'details.json'), JSON.stringify(mockDetails, null, 2));
      
      await fs.rmdir(srcFolder).catch(() => {});
      console.log(`Successfully moved a8 and generated details.json for "Exemplu" with ${movedImages} photos!`);
    }
  } catch (e) {
    console.log('a8 folder already moved or not found at root.');
    // Check if it's already in lib/properties/a8
    try {
      await fs.access(destFolder);
      console.log('a8 is already in lib/properties. Making sure details.json exists...');
      const mockDetails = {
        title: "Exemplu",
        description: "Acesta este un apartament exemplu.",
        price: "125000",
        rooms: "3",
        area_sqm: "80",
        floor: "2"
      };
      await fs.writeFile(path.join(destFolder, 'details.json'), JSON.stringify(mockDetails, null, 2));
    } catch(err) {}
  }
}

main().catch(console.error);

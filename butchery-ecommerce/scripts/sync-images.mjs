// Copies real product photos from the original BUTCHERY-BUSINESS resource
// folder (with its original, human-friendly filenames) into public/images
// using the clean, web-safe filenames the site's code actually references.
//
// Usage:
//   1. Drop your real photos into BUTCHERY-BUSINESS/ at the exact paths
//      shown in BUTCHERY-BUSINESS-TREE.md (overwriting the placeholders).
//   2. Run: node scripts/sync-images.mjs
//   3. Commit + redeploy.
import { copyFile, mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const ORIGINAL = join(ROOT, "BUTCHERY-BUSINESS");
const PUBLIC_IMAGES = join(ROOT, "public", "images");

const MAP = [
  ["about-business-resources/business-advertisement-pamphlet.jpg", "about-business-resources/business-advertisement-pamphlet.jpg"],
  ["about-business-resources/promotional-campaign-profile-opening-picture.jpg", "about-business-resources/promotional-campaign-profile-opening-picture.jpg"],
  ["public/beef-products/fresh Beef Burgers (raw patties).jpg", "beef-products/beef-burger-patties.jpg"],
  ["public/business-logo/official-business-logo.jpg", "business-logo/official-business-logo.jpg"],
  ["public/business-past-menus/past-specials-promos1.jpg", "business-past-menus/past-specials-promos1.jpg"],
  ["public/business-past-menus/past-specials-promos2.jpg", "business-past-menus/past-specials-promos2.jpg"],
  ["public/business-past-menus/past-specials-promos3.jpg", "business-past-menus/past-specials-promos3.jpg"],
  ["public/other-processed-products/biltong.png", "other-processed-products/biltong.png"],
  ["public/other-processed-products/biltong2.png", "other-processed-products/biltong2.png"],
  ["public/other-processed-products/fresh Boerewors (coiled).jpg", "other-processed-products/boerewors-coiled.jpg"],
  ["public/other-processed-products/fresh Chakalaka Burgers (raw).jpg", "other-processed-products/chakalaka-burgers.jpg"],
  ["public/other-processed-products/fresh Chakalaka Mince.jpg", "other-processed-products/chakalaka-mince.jpg"],
  ["public/other-processed-products/fresh Chakalaka Wors (coiled).jpg", "other-processed-products/chakalaka-wors.jpg"],
  ["public/other-processed-products/fresh French Polony (sliced and whole).jpg", "other-processed-products/french-polony.jpg"],
  ["public/other-processed-products/fresh Penny Polony (whole and sliced).jpg", "other-processed-products/penny-polony.jpg"],
  ["public/other-processed-products/fresh Red Viennas.jpg", "other-processed-products/red-viennas.jpg"],
  ["public/other-processed-products/fresh Sandwich Ham (sliced).jpg", "other-processed-products/sandwich-ham.jpg"],
  ["public/pork-products/fresh Pork Back Bones.jpg", "pork-products/pork-back-bones.jpg"],
  ["public/pork-products/fresh Pork Braai Chops.jpg", "pork-products/pork-braai-chops.jpg"],
  ["public/pork-products/fresh Pork Packs (assorted cuts).jpg", "pork-products/pork-packs-assorted.jpg"],
  ["public/pork-products/fresh Pork Smoked Bones.jpg", "pork-products/pork-smoked-bones.jpg"],
  ["public/pork-products/fresh Pork Stew meat (cubed).jpg", "pork-products/pork-stew-meat.jpg"],
  ["public/pork-products/fresh Pork Trotters.jpg", "pork-products/pork-trotters.jpg"],
  ["public/spice-products/5-spices-in-a-single-shoot.jpg", "spice-products/five-spices-shot.jpg"],
  ["public/spice-products/demo.jpg", "spice-products/house-braai-spice.jpg"],
  ["public/web-icons/beef-icon.jpg", "web-icons/beef-icon.jpg"],
  ["public/web-icons/pork-icon.jpg", "web-icons/pork-icon.jpg"],
  ["public/web-icons/whatsapp-icon.jpg", "web-icons/whatsapp-icon.jpg"],
];

let copied = 0;
let skipped = 0;

for (const [from, to] of MAP) {
  const src = join(ORIGINAL, from);
  const dest = join(PUBLIC_IMAGES, to);
  try {
    await mkdir(dirname(dest), { recursive: true });
    await copyFile(src, dest);
    copied++;
  } catch (err) {
    skipped++;
    console.warn(`Skipped (not found): ${from}`);
  }
}

console.log(`\nDone. Copied ${copied} image(s), skipped ${skipped}.`);

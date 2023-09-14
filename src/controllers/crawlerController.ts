import { Request, Response, Router } from "express";

import PuppeteerService from "../services/puppteeerService";
import BahamasService from "../services/bahamasService";

const router = Router();

router.get("/health", async (req: Request, res: Response) => {
  res.status(200).send("OK");
});

router.get("/get-images", async (req: Request, res: Response) => {
  try {
    console.log("start to get images");
    const url = BahamasService.url;

    const page = await PuppeteerService.init(url);

    await PuppeteerService.takeScreenshot(page, "bahamas.png");
    await BahamasService.selectCidade(page);
    await PuppeteerService.takeScreenshot(page, "bahamasLocated.png");

    res.status(200).send("OK");
  } catch (error) {
    console.log("error to get images", error);
    res.status(400).send(`ERRO: ${JSON.stringify(error)}`);
  }
});

// async function handleImages(page, bodyPart, equipmentType, quantity, gender) {
//   const imagesMale = await getImages(
//     page,
//     bodyPart,
//     equipmentType,
//     quantity,
//     gender
//   );

//   imagesMale.forEach((img, index) => {
//     setTimeout(async () => {
//       console.log(
//         `${gender} - ${imagesMale.length}/${index + 1} - image:`,
//         img.title
//       );

//       await saveImage(img, bodyPart, equipmentType, gender);

//       if (index + 1 === imagesMale.length) {
//         console.log(`${gender} - ${imagesMale.length}/${index + 1} - finish`);
//       }
//     }, index * 1000);
//   });
// }

// async function getImages(page, bodyPart, equipmentType, quantity, gender) {
//   const url = `https://gymvisual.com/16-animated-gifs/s-1/style_type-basic_grey/body_part-${bodyPart}/equipment_type-${equipmentType}/gender-${gender}/media_type-animated_gifs/exercise_type-strength?n=${quantity}`;
//   await page.goto(url);

//   const imgs = await page.$$eval(
//     ".product_img_link img.replace-2x[src]",
//     (imgs) =>
//       imgs.map((img) => {
//         const src = img.getAttribute("src");
//         const title = img.getAttribute("title");

//         return { src, title };
//       })
//   );
//   console.log("images", imgs.length);

//   return imgs;
// }

// async function saveImage(img, bodyPart, equipmentType, gender) {
//   const src = img.src;
//   const title = img.title?.trim() as string;
//   const name = title?.split(" ").join("_").toLowerCase() as string;
//   const path = `./gifs/${bodyPart}/${equipmentType}/${gender}`;
//   const filename = `${name}.gif`;

//   const gif: Gif = {
//     title,
//     name,
//     bodyPart,
//     equipmentType,
//     gender,
//   };

//   const repository = new GifRepository();
//   const isSaved = await repository.getByName(name);
//   if (!isSaved) {
//     await repository.create(gif);
//   }

//   const exist = fs.existsSync(`${path}/${filename}`);
//   if (!exist) {
//     downloadImage(src, path, filename);
//   }
// }

// async function downloadImage(url, path, filename) {
//   try {
//     if (!fs.existsSync(path)) {
//       fs.mkdirSync(path, { recursive: true });
//     }

//     client.get(url, (res) => {
//       res.pipe(fs.createWriteStream(`${path}/${filename}`));
//     });
//   } catch (error) {
//     console.log("error to download images", { url, path, filename, error });
//   }
// }

export default router;

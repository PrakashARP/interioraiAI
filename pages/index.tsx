import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect,useState, useRef } from "react";
import Bridge from "../components/Icons/Bridge";
import Logo from "../components/Icons/Logo";
import Modal from "../components/Modal";
import cloudinary from "../utils/cloudinary";
import getBase64ImageUrl from "../utils/generateBlurPlaceholder";
import type { ImageProps } from "../utils/types";
import { useLastViewedPhoto } from "../utils/useLastViewedPhoto";
import FileUpload from "./FileZone/_filezone";
import SelectOptions from "./Component/SelectOption";
const Home: NextPage = ({ images }: { images: ImageProps[] }) => {
  const router = useRouter();
  const { photoId } = router.query;
  const [lastViewedPhoto, setLastViewedPhoto] = useLastViewedPhoto();

  const lastViewedPhotoRef = useRef<HTMLAnchorElement>(null);
  const [selectedValue, setSelectedValue] = useState('');

  const handleValueChange = (value: string) => {
    setSelectedValue(value);
  };
  useEffect(() => {
    // This effect keeps track of the last viewed photo in the modal to keep the index page in sync when the user navigates back
    if (lastViewedPhoto && !photoId) {
      lastViewedPhotoRef.current.scrollIntoView({ block: "center" });
      setLastViewedPhoto(null);
    }
  }, [photoId, lastViewedPhoto, setLastViewedPhoto]);
  const roomOptions = [
  {label:"Living room",value: 1 },
  {label:"Bedroom",value:2},
  {label:"Bath room",value: 3},
  {label:"Attic",value:4},
  {label:"Kitchen",value:5},
  {label:"Dining room",value:6},
  {label:"Study room",value:7},
  {label:"Home office",value:8},
  {label:"Gaming room",value:9},
  {label:"House exterior",value:10},
  {label:"Outdoor pool area",value:11},
  {label:"Outdoor patio",value:12},
  {label:"Outdoor garden",value:13},
  {label:"Meeting room",value:14},
  {label:"Workshop",value:15},
  {label:"Fitness gym",value:16},
  {label:"Coffee shop",value:17},
  {label:"Clothing store",value:18},
  {label:"Walk in closet",value:19},
  {label:"Toilet",value:20},
  {label:"Restaurant",value:21},
  {label:"Office",value:22},
  {label:"Coworking space",value:23},
  {label:"Hotel lobby",value:24},
  {label:"Hotel room",value:25},
  {label:"Hotel bathroom",value:26},
  {label:"Exhibition space",value:27},
  {label:"Onsen",value:28},
  {label:"Mudroom",value:29},
  {label:"Drop zone",value:30},
  ];
  const modeOptions = [
    {labe:"Virtual staging (locks walls, slower)",value: "virtual staging"},
  {label:"Interior design (more creative, fast)",value:"interior design"},
  {label:"Freestyle (no image needed, very fast)",value: "freestyle"},
  {label:"360° panaroma (beta, does not use image)",value:"360"},
  ]
  return (
    <>
      <Head>
        <title>Next.js Conf 2022 Photos</title>
        <meta
          property="og:image"
          content="https://nextjsconf-pics.vercel.app/og-image.png"
        />
        <meta
          name="twitter:image"
          content="https://nextjsconf-pics.vercel.app/og-image.png"
        />
      </Head>
      <div className="flex">
        <div
          className="p-5 sm:w-full xl:w-1/4 2xl:w-1/4"
          style={{ background: "#161616" }}
        >
          <div className="columns-1 items-center">
            <FileUpload />

            <div className="text-xs text-white mt-2">
              <p>
                Take a photo of your current room. For best results make sure it
                shows the entire room in a 90° straight angle facing a wall or
                window horizontally (click for example). Not from a corner or
                angled, and not a wide angle photo as it's trained on regular
                photos. The AI isn't great at angled pics (yet)! Uploads +
                renders are shown on site but auto deleted after 15 mins. To
                make 100% private HQ renders without deletion and watermark
                upgrade to Pro and you get your own private workspace.
              </p>
            </div>
            <div className="mt-2">
            <SelectOptions title="ROOM" options={roomOptions} />
              </div>
              <div className="mt-2">
            <SelectOptions title="MODE" options={modeOptions} />
              </div>
              <div className="text-xs text-white">
                <p>
                You get widely different results with each mode. Virtual Staging mode will auto detect the construction (like walls, ceiling, beams) and tries to avoid changing it, while Interior Design mode doesn't but gives you more creative ideas. A good idea is to use Interior Design mode and then Mix to get the original auto masked background back. 360° panorama is a new beta feature, soon we will add a viewer for it, for now copy your image and paste and watch your panorama here.
                </p>
              </div>

              <div className="">
                <button className=" bg-white text-md font-bold text-black w-full p-3 text-center rounded-lg mt-5">Render your idea</button>
              </div>
          </div>
        </div>
        <div className="overflow-y-auto p-5 sm:w-full xl:w-3/4 2xl:w-3/4">
          <div className="h-screen">
            <div className="columns-1 gap-4 sm:columns-2 xl:columns-3 2xl:columns-4">
              {images.map(({ id, public_id, format, blurDataUrl }) => (
                <Link
                  key={id}
                  href={`/?photoId=${id}`}
                  as={`/p/${id}`}
                  ref={
                    id === Number(lastViewedPhoto) ? lastViewedPhotoRef : null
                  }
                  shallow
                  className="after:content group relative mb-5 block w-full cursor-zoom-in after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight"
                >
                  <Image
                    alt="Next.js Conf photo"
                    className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110"
                    style={{ transform: "translate3d(0, 0, 0)" }}
                    placeholder="blur"
                    blurDataURL={blurDataUrl}
                    src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_720/${public_id}.${format}`}
                    width={720}
                    height={480}
                    sizes="(max-width: 640px) 100vw,
                  (max-width: 1280px) 50vw,
                  (max-width: 1536px) 33vw,
                  25vw"
                  />
                </Link>
              ))}
            </div>
            <div className="col-span-2 mx-auto max-w-[1960px] p-4">
              {photoId && (
                <Modal
                  images={images}
                  onClose={() => {
                    setLastViewedPhoto(photoId);
                  }}
                />
              )}
            </div>
            <footer className="p-6 text-center text-white/80 sm:p-12">
              Thank you to{" "}
              <a
                href="https://edelsonphotography.com/"
                target="_blank"
                className="font-semibold hover:text-white"
                rel="noreferrer"
              >
                Josh Edelson
              </a>
              ,{" "}
              <a
                href="https://www.newrevmedia.com/"
                target="_blank"
                className="font-semibold hover:text-white"
                rel="noreferrer"
              >
                Jenny Morgan
              </a>
              , and{" "}
              <a
                href="https://www.garysextonphotography.com/"
                target="_blank"
                className="font-semibold hover:text-white"
                rel="noreferrer"
              >
                Gary Sexton
              </a>{" "}
              for the pictures.
            </footer>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

export async function getStaticProps() {
  const results = await cloudinary.v2.search
    .expression(`folder:${process.env.CLOUDINARY_FOLDER}/*`)
    .sort_by("public_id", "desc")
    .max_results(400)
    .execute();
  let reducedResults: ImageProps[] = [];

  let i = 0;
  for (let result of results.resources) {
    reducedResults.push({
      id: i,
      height: result.height,
      width: result.width,
      public_id: result.public_id,
      format: result.format,
    });
    i++;
  }

  const blurImagePromises = results.resources.map((image: ImageProps) => {
    return getBase64ImageUrl(image);
  });
  const imagesWithBlurDataUrls = await Promise.all(blurImagePromises);

  for (let i = 0; i < reducedResults.length; i++) {
    reducedResults[i].blurDataUrl = imagesWithBlurDataUrls[i];
  }

  return {
    props: {
      images: reducedResults,
    },
  };
}

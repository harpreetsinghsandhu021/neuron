import React from "react";
import Image from "next/image";
import { GridBackgroundDemo } from "@/components/gridBackground";
import { FlipWords } from "@/components/flipWords";
import { FeaturesSection } from "@/components/featuresSection";
import FooterComponent from "@/components/footer";

type FeatureBoxProps = {
  imageSrc: string;
  title: string;
  description: string;
};

const FeatureBox: React.FC<FeatureBoxProps> = ({
  imageSrc,
  title,
  description,
}) => (
  <div className="flex flex-col grow items-center px-9 py-12 w-full text-center rounded-3xl bg-zinc-900 max-md:px-5 max-md:mt-8">
    <Image
      width={300}
      height={500}
      loading="lazy"
      src={imageSrc}
      alt={title}
      className="max-w-full aspect-square rounded-[30px] w-[104px]"
    />
    <h3 className="mt-12 text-xl font-semibold leading-8 text-white max-md:mt-10">
      {title}
    </h3>
    <p className="self-stretch mt-7 text-sm leading-7 text-neutral-400">
      {description}
    </p>
  </div>
);

type CompanyLogoProps = {
  imageSrc: string;
  altText: string;
};

const CompanyLogo: React.FC<CompanyLogoProps> = ({ imageSrc, altText }) => (
  <div className="flex flex-1 justify-center items-center px-7 py-7 bg-black rounded-xl max-md:px-5">
    <Image
      width={300}
      height={500}
      loading="lazy"
      src={imageSrc}
      alt={altText}
      className="aspect-[2.63] fill-zinc-700 w-[101px]"
    />
  </div>
);

const MyComponent: React.FC = () => {
  const featureBoxes = [
    {
      imageSrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/9d4992a7f5e22a6598256290d1712e854f69f50350925d087117ed3d49caa3ee?apiKey=1d6ea0e9cb024b58b6d3b2fddd0c29ce&",
      title: "Fully Customizable",
      description:
        "A good design is not only aesthetically pleasing, but also functional. It should be able to solve the problem",
    },
    {
      imageSrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/b1cc3b71c54371374e7649c7d0b848aadcdd48695e07a9b64e2219519c0315b9?apiKey=1d6ea0e9cb024b58b6d3b2fddd0c29ce&",
      title: "Fully Customizable",
      description:
        "A good design is not only aesthetically pleasing, but also functional. It should be able to solve the problem",
    },
    {
      imageSrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/9108d3d2f0bce8d90413406f332f481431f9f937b682ec20e6e5a49a8cec858d?apiKey=1d6ea0e9cb024b58b6d3b2fddd0c29ce&",
      title: "Fully Customizable",
      description:
        "A good design is not only aesthetically pleasing, but also functional. It should be able to solve the problem",
    },
    {
      imageSrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/9fe5213e6e4141bd39abd04e50278dafeb9f566571237160ae01b7ccc2310bf7?apiKey=1d6ea0e9cb024b58b6d3b2fddd0c29ce&",
      title: "Fully Customizable",
      description:
        "A good design is not only aesthetically pleasing, but also functional. It should be able to solve the problem",
    },
    {
      imageSrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/053536052e1b8301725e3ace613884780831be9eda4a9ae764456d2eb51b696d?apiKey=1d6ea0e9cb024b58b6d3b2fddd0c29ce&",
      title: "Fully Customizable",
      description:
        "A good design is not only aesthetically pleasing, but also functional. It should be able to solve the problem",
    },
    {
      imageSrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/a7d505dccb08601d58ee6828355380cb7423216d8104f01f9d5098eb49014c86?apiKey=1d6ea0e9cb024b58b6d3b2fddd0c29ce&",
      title: "Fully Customizable",
      description:
        "A good design is not only aesthetically pleasing, but also functional. It should be able to solve the problem",
    },
  ];

  const companyLogos = [
    {
      imageSrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/9704aaf56bb80aa2239c1846f8bba7120eef6c3db6c163094fe7d741dab52177?apiKey=1d6ea0e9cb024b58b6d3b2fddd0c29ce&",
      altText: "Company Logo 1",
    },
    {
      imageSrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/a72a30b0e754531faaad539b69a992f23de4eb98db0f014a295e09fc47fc5227?apiKey=1d6ea0e9cb024b58b6d3b2fddd0c29ce&",
      altText: "Company Logo 2",
    },
    {
      imageSrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/d4b17c4374aeb89f6a1f2f98ce65a3721c45aeabf1c69e7c765a688452664c75?apiKey=1d6ea0e9cb024b58b6d3b2fddd0c29ce&",
      altText: "Company Logo 3",
    },
    {
      imageSrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/8348b3bb1bb4752915672d878439a9fda95091d223ba04f674c78b8609552a9d?apiKey=1d6ea0e9cb024b58b6d3b2fddd0c29ce&",
      altText: "Company Logo 4",
    },
    {
      imageSrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/3de4cabdceb2d696df947e4f4b75ab87069145fc3f2fd1d56af330886e0839a4?apiKey=1d6ea0e9cb024b58b6d3b2fddd0c29ce&",
      altText: "Company Logo 5",
    },
    {
      imageSrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/5d230404256ec5b1544a39b17fbed48a454da7c7223b0d9943a7448fd6bdf3ff?apiKey=1d6ea0e9cb024b58b6d3b2fddd0c29ce&",
      altText: "Company Logo 6",
    },
  ];

  const words = [
    "powerful",
    "advanced",
    "robust",
    "intelligent",
    "easy-to-use",
    "flexible",
    "scalable",
  ];

  return (
    <div className="flex bg-black flex-col items-center px-5">
      <header className="flex gap-5 py-10 justify-between w-full max-w-screen-xl  max-md:flex-wrap">
        <div className="flex gap-2.5 items-start my-auto">
          <Image
            width={300}
            height={500}
            loading="lazy"
            src="/images/logo.svg"
            alt=""
            className="shrink-0 aspect-[1.25] fill-white w-[41px]"
          />
        </div>
        <nav className="flex gap-5 justify-between text-sm">
          <a
            href="#"
            className="my-auto text-center leading-[200%] text-neutral-400"
          >
            Home
          </a>
          <a
            href="/dashboard/overview"
            className="justify-center px-7 py-3 text-white rounded-md bg-[linear-gradient(93deg,#FF9898_0.48%,#8054FF_100%)] leading-[143%] max-md:px-5"
          >
            Go To Dashboard
          </a>
        </nav>
      </header>

      <main>
        <section className="flex ">
          <div className="mt-2 flex-1 font-semibold text-left text-white max-md:max-w-screen-xl ">
            <h1 className="text-6xl leading-[70px] mx-auto font-normal text-neutral-600 dark:text-neutral-400">
              Build
              <FlipWords words={words} /> <br />
              Applications with Neuron AI
            </h1>
            <p className="mt-6 text-left w-2/3 text-xl font-[300] leading-7 text-neutral-400 ">
              Neuron scans your website, help center, or other designated
              resource to provide quick and accurate AI-generated answers to
              customer questions
            </p>
            <div className="flex justify-start">
              <a
                href="/dashboard/overview"
                className=" justify-center px-7 py-3 mt-10 text-sm leading-5 text-white rounded-md bg-[linear-gradient(93deg,#FF9898_0.48%,#8054FF_100%)] max-md:px-5"
              >
                Go To Dashboard
              </a>
            </div>
          </div>
          <div className="flex-[1.1]">
            <Image
              src={"/images/app-ui.png"}
              alt=""
              className="-translate-y-5 rounded-sm translate-x-40"
              width={2400}
              height={2400}
            />
            <Image
              src={"/images/bot-ui.png"}
              alt=""
              className="absolute -translate-y-80 "
              width={330}
              height={300}
            />
          </div>
        </section>

        <FeaturesSection />

        <section className="mt-8 overflow-hidden max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col max-md:gap-0">
            <div className="flex flex-col w-3/5 max-md:ml-0 max-md:w-full">
              <div className="flex flex-col justify-center px-16 py-20 rounded-full border border-solid border-neutral-800 max-md:px-5 max-md:mt-6 max-md:max-w-full">
                <div className="flex flex-col px-16 pt-16 pb-11 mx-6 mt-1 rounded-full border border-solid border-neutral-800 max-md:px-5 max-md:mr-2.5 max-md:max-w-full">
                  <Image
                    width={300}
                    height={500}
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/d0ad8de7f59f3e5706f88c9cb7004fc5bd3ddf62aac1b2901ed549b1b94015ee?apiKey=1d6ea0e9cb024b58b6d3b2fddd0c29ce&"
                    alt="Decorative circular image"
                    className="w-full rounded-full border border-solid aspect-[0.99] border-neutral-800 max-md:ml-1.5"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col ml-5 w-2/5 max-md:ml-0 max-md:w-full">
              <div className="flex flex-col self-stretch my-auto text-white max-md:mt-10 max-md:max-w-full">
                <h2 className="text-5xl font-semibold leading-[64px] max-md:max-w-full max-md:text-4xl max-md:leading-[60px]">
                  We&apos;re here to guide and help you at all times
                </h2>
                <p className="mt-8 text-lg leading-7 text-neutral-400 max-md:mr-2.5 max-md:max-w-full">
                  A good design is not only aesthetically pleasing, but also
                  functional. It should be able to solve the problem
                </p>
                <a
                  href="#"
                  className="inline-block justify-center self-start px-7 py-3 mt-8 text-sm leading-5 whitespace-nowrap rounded-md bg-[linear-gradient(93deg,#FF9898_0.48%,#8054FF_100%)] max-md:px-5"
                >
                  Download
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <FooterComponent />
    </div>
  );
};

export default MyComponent;

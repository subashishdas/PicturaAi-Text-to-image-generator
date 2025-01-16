import sample_img_1 from "./sample_img_1.png";
import sample_img_2 from "./sample_img_2.png";
import profile_img_1 from "./profile_img_1.png";
import profile_img_2 from "./profile_img_2.png";
import step_icon_1 from "./step_icon_1.svg";
import step_icon_2 from "./step_icon_2.svg";
import step_icon_3 from "./step_icon_3.svg";

export const assets = {
  sample_img_1,
  sample_img_2,
};

export const stepsData = [
  {
    title: "Describe Your Vision",
    description:
      "Type a phrase, sentence, or paragraph that describes the image you want to create.",
    icon: step_icon_1,
  },
  {
    title: "Watch the Magic",
    description:
      "Our AI-powered engine will transform your text into a high-quality, unique image in seconds.",
    icon: step_icon_2,
  },
  {
    title: "Download & Share",
    description:
      "Instantly download your creation or share it with the world directly from our platform.",
    icon: step_icon_3,
  },
];

export const testimonialsData = [
  {
    image: profile_img_1,
    name: "Donald Jackman",
    role: "Graphic Designer",
    stars: 5,
    text: `I've been using bg.removal for nearly two years, primarily for Instagram, and it has been incredibly user-friendly, making my work much easier.`,
  },
  {
    image: profile_img_2,
    name: "Richard Nelson",
    role: "Content Creator",
    stars: 5,
    text: `I've been using bg.removal for nearly two years, primarily for Instagram, and it has been incredibly user-friendly, making my work much easier.`,
  },
  {
    image: profile_img_1,
    name: "Donald Jackman",
    role: " Graphic Designer",
    stars: 4,
    text: `I've been using bg.removal for nearly two years, primarily for Instagram, and it has been incredibly user-friendly, making my work much easier.`,
  },
];

export const plans = [
  {
    id: "Basic",
    desc: "Perfect for getting started with AI image generation",
    price: 10,
    credits: 100,
    features: [
      "100 AI Image Credits",
      "Standard Resolution",
      "24/7 Support",
      "Commercial Usage",
    ],
  },
  {
    id: "Pro",
    desc: "Ideal for professionals and growing businesses",
    price: 25,
    credits: 300,
    features: [
      "300 AI Image Credits",
      "HD Resolution",
      "Priority Support",
      "Commercial Usage",
      "Batch Generation",
    ],
  },
  {
    id: "Enterprise",
    desc: "Maximum power for high-volume needs",
    price: 50,
    credits: 1000,
    features: [
      "1000 AI Image Credits",
      "4K Resolution",
      "Dedicated Support",
      "Commercial Usage",
      "Batch Generation",
      "API Access",
    ],
  },
];

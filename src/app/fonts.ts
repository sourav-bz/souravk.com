// app/fonts.js
import localFont from "next/font/local";

// Define the Satoshi Variable font (main font to use)
export const satoshi = localFont({
  src: [
    {
      path: "../fonts/Satoshi-Variable.woff2",
      weight: "300 900",
      style: "normal",
    },
    {
      path: "../fonts/Satoshi-VariableItalic.woff2",
      weight: "300 900",
      style: "italic",
    },
  ],
  variable: "--font-satoshi",
  display: "swap",
});

// Individual font weights for specific use cases
export const satoshiLight = localFont({
  src: [
    {
      path: "../fonts/Satoshi-Light.woff2",
      weight: "300",
      style: "normal",
    },
  ],
  variable: "--font-satoshi-light",
  display: "swap",
});

export const satoshiLightItalic = localFont({
  src: [
    {
      path: "../fonts/Satoshi-LightItalic.woff2",
      weight: "300",
      style: "italic",
    },
  ],
  variable: "--font-satoshi-light-italic",
  display: "swap",
});

export const satoshiRegular = localFont({
  src: [
    {
      path: "../fonts/Satoshi-Regular.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-satoshi-regular",
  display: "swap",
});

export const satoshiItalic = localFont({
  src: [
    {
      path: "../fonts/Satoshi-Italic.woff2",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-satoshi-italic",
  display: "swap",
});

export const satoshiMedium = localFont({
  src: [
    {
      path: "../fonts/Satoshi-Medium.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-satoshi-medium",
  display: "swap",
});

export const satoshiMediumItalic = localFont({
  src: [
    {
      path: "../fonts/Satoshi-MediumItalic.woff2",
      weight: "500",
      style: "italic",
    },
  ],
  variable: "--font-satoshi-medium-italic",
  display: "swap",
});

export const satoshiBold = localFont({
  src: [
    {
      path: "../fonts/Satoshi-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-satoshi-bold",
  display: "swap",
});

export const satoshiBoldItalic = localFont({
  src: [
    {
      path: "../fonts/Satoshi-BoldItalic.woff2",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-satoshi-bold-italic",
  display: "swap",
});

export const satoshiBlack = localFont({
  src: [
    {
      path: "../fonts/Satoshi-Black.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-satoshi-black",
  display: "swap",
});

export const satoshiBlackItalic = localFont({
  src: [
    {
      path: "../fonts/Satoshi-BlackItalic.woff2",
      weight: "900",
      style: "italic",
    },
  ],
  variable: "--font-satoshi-black-italic",
  display: "swap",
});

import "@/styles/globals.css";
import "@/styles/globals.css";
import { Source_Sans_3 } from "next/font/google";


const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  variable: "--font-source-sans",
});

export default function App({ Component, pageProps }) {
  return (
    <main className={sourceSans.className}>
      <Component {...pageProps} />
    </main>
  )
}

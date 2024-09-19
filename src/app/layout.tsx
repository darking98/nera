import '@/src/styles/global.css'
import ThemeProvider from '../context/ThemeProvider'
import ReactQueryProvider from '../context/ReactQueryProvider'
export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <head>
        <link
          rel='icon'
          sizes='192x192'
          href='https://static.wixstatic.com/media/2ed052_d2109625ec3640c9a7ac220d026aff77%7Emv2.png/v1/fill/w_192%2Ch_192%2Clg_1%2Cusm_0.66_1.00_0.01/2ed052_d2109625ec3640c9a7ac220d026aff77%7Emv2.png'
          type='image/png'
        />
        <link
          href='https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap'
          rel='stylesheet'
        />
      </head>
      <body>
        <ThemeProvider>
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

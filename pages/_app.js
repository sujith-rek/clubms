import { AuthProvider } from '@/context/authContext';
import '@/styles/root/globals.scss'
import { ChakraProvider } from '@chakra-ui/react'
import App from 'next/app'
import { getUserFromSession } from '@/context/authContext';
import { RoomProvider } from '@/context/roomContext';
function MyApp({ Component, pageProps, user }) {
  return (
    <RoomProvider>
      <AuthProvider ssrUser={user}>
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </AuthProvider>
    </RoomProvider>
  )
}

MyApp.getInitialProps = async (appContext) => {
  if (appContext.router.isSsr === undefined) {
    const appProps = await App.getInitialProps(appContext);
    const user = await getUserFromSession(appContext.ctx);
    return { ...appProps, user: user };
  } else {
    const appProps = await App.getInitialProps(appContext);
    return { ...appProps };
  }
}

export default MyApp;

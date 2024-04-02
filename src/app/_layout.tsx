import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import CartProvider from '../providers/CartProvider';
import AuthProvider from '../providers/AuthProvider';
import { FontAwesome } from '@expo/vector-icons';

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }
  return <RootLayoutNav/>;
}
  
function RootLayoutNav(){
    const colorScheme = useColorScheme();
    return (
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <AuthProvider>
          <CartProvider>
            <Stack>
              <Stack.Screen
                name="(admin)"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="(user)"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="(auth)"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="cart"
                options={{ presentation: 'modal' }}
              />
            </Stack>
          </CartProvider>
        </AuthProvider>
      </ThemeProvider>
    );


  }
  

  
  


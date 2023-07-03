import { Stack } from 'expo-router'
import { useCallback } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen  from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync(); //when app is initially loading, this will make splash screen visible

const Layout =()=>{
    const [fontsLoaded] = useFonts({
        DMBold : require('../assets/fonts/DMSans-Bold.ttf'), 
        DMMedium: require('../assets/fonts/DMSans-Medium.ttf'),
        DMRegular : require('../assets/fonts/DMSans-Regular.ttf'), 
    })

    /* const [fontsLoaded] = async () => {
        await Font.loadAsync({
          DMBold: require('../assets/fonts/DMSans-Bold.ttf'),
          DMMedium: require('../assets/fonts/DMSans-Medium.ttf'),
          DMRegular: require('../assets/fonts/DMSans-Regular.ttf'),
        });
    } */

    const onLayoutRootView= useCallback(async()=> {
        if(fontsLoaded){
            await SplashScreen.hideAsync(); //only show homepage if fonts have been loaded
        }
    }, [fontsLoaded])

    if(!fontsLoaded) return null;

    return <Stack onLayout={onLayoutRootView} />;
}

export default Layout;






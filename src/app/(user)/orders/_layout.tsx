import { Stack } from "expo-router";


export default function OrderStack(){
    return(
        <Stack screenOptions={{
            
        }}>
            <Stack.Screen name = "index" options = {{title: 'Orders'}}/>
        </Stack>
    )
}
   


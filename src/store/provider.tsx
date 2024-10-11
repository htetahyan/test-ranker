'use client'
import * as React from "react";
import { Provider as ReduxProvider } from 'react-redux'

// 1. import `NextUIProvider` component
import {NextUIProvider} from "@nextui-org/react";
import { store } from "./store";

const Provider=({children}:{children:React.ReactNode})=> {
  // 2. Wrap NextUIProvider at the root of your app
  return (      <ReduxProvider store={store}>

    <NextUIProvider>
    {children}
   
    </NextUIProvider> </ReduxProvider>
  );
}
export default Provider
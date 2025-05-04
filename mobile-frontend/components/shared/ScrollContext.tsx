import React from "react";

interface ScrollProps {
    onScroll: any;
    contentContainerStyle: any;
    scrollEventThrottle: number;
    showsVerticalScrollIndicator: boolean;
}

export const ScrollContext = React.createContext<ScrollProps | null>(null);

export const useScrollProps = () => {
    const context = React.useContext(ScrollContext);
    if (!context) {
        throw new Error("useScrollProps must be used within ListScreenLayout");
    }
    return context;
};
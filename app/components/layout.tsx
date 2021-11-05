import { FC } from "react";
import { Footer } from "./footer";
import Header from "./header";

export const Layout: FC<any> = ({ children }) => {
    return (
        <>
            <Header />
            <main>{children}</main>
            <Footer />
        </>
    );
}
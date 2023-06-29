import Navbar from "./navbar";
import { useContext, useEffect } from "react";
import { MemesDataContext } from "@/app/memesDataContext";

export default function Layout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode
}) {
    const { close, setClose } = useContext(MemesDataContext);

    useEffect(() => {
        // console.log("set layout...");
        setClose(true);
    }, []);

    return (
        <div>
            {/* Include shared UI here e.g. a header or sidebar */}
            <Navbar />
            <div onClick={() => setClose(true)}>
                {children}
                <footer>
                    <div className="mx-auto my-6 text-center">
                        Copyright &copy; 2023, All Rights Reserved
                    </div>
                </footer>
            </div>

        </div>
    )
}
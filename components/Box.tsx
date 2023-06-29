import { ReactNode } from "react";

export default function Box({
    children, // will be a page or nested layout
}: {
    children: ReactNode
}) {

    return (
        <div className="container">
            {children}
        </div>
    )
}
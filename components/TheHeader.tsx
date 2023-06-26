import Link from "next/link"

const TheHeader = () => {
    return (
        <header>
            <Link href="/parsing">Parse URL</Link>
            <Link href="/history">History</Link>
        </header>
    )
}
export {TheHeader};
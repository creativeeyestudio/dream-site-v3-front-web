import Link from "next/link";

export default function ButtonLink(label: string, link: string, isBlank: boolean = false) {
    return(
        <Link href={link} target={isBlank ? '_blank' : ''}>
            {label}
        </Link>
    )
}
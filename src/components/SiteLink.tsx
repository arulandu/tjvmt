import Link from "next/link";

const SiteLink = ({txt, href, className=""}) => {
  return (<Link href={href} passHref className={`${className}`}>{txt}</Link>);
}

export default SiteLink
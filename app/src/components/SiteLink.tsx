import Link from "next/link";

const SiteLink = ({txt, href, className=""}) => {
  return (
    <Link href={href} passHref><a className={`${className}`}>{txt}</a></Link>
  );
}

export default SiteLink
import { Link as RadixLink } from "@radix-ui/themes";
import Link from "next/link";

interface Props {
  href: string;
  children: string;
}
const TrakifyrLink = ({ href, children }: Props) => {
  return (
    <Link href={href} passHref legacyBehavior>
      <RadixLink>{children}</RadixLink>
    </Link>
  );
};

export default TrakifyrLink;

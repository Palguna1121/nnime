import Link from "next/link";

const Header = ({ title, linkHref, linkTitle }) => {
  return (
    <div className="flex justify-between p-2 my-10">
      <h1 className="text-3xl md:text-4xl font-semibold text-white mb-2 md:mb-1 mx-8">{title}</h1>
      {linkHref && linkTitle ? (
        <Link href={linkHref} className="mx-5 lg:text-md md:text-sm text-xs transition-colors hover:text-indigo-400">
          {linkTitle}
        </Link>
      ) : null}
    </div>
  );
};

export default Header;

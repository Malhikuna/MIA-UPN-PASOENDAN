import Link from "next/link";

interface Crumb {
  label: string;
  href?: string;
}

const Breadcrumbs = ({ items }: { items: Crumb[] }) => {
  return (
    <div className="breadcrumbs font-light text-md">
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {item.href ? <Link href={item.href}>{item.label}</Link> : item.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Breadcrumbs;
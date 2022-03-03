import useSwr from "swr";
import Link from "next/link";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Users() {
  const { data, error } = useSwr("/api/user", fetcher);

  if (error) return <div>Failed to load users</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <ul>
      {data.map((user) => (
        <li key={user.id}>
          <Link href="/user/[id]" as={`/user/${user._id}`}>
            <a>{`User ${user.name}`}</a>
          </Link>
        </li>
      ))}
    </ul>
  );
}

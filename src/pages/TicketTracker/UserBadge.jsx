export default function UserBadge({ name }) {
  return (
    <span className="inline-block text-xs mr-1 mb-1 px-2 py-0.5 rounded-full bg-green-700 text-white">
      {name}
    </span>
  );
}

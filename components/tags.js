export default function Tags({ tags }) {
  const tagNodes = tags.split(',').map(tag => (
    <div
      key={tag.trim()}
      className="p-1 mr-2 bg-gray-100 rounded-sm"
    >
      {tag.trim()}
    </div>
  ));

  return (
    <div className="flex text-base">
      {tagNodes}
    </div>
  );
}

type CardProps = { content: string };

export default function Card({ content }: CardProps) {
  return <div className="flex-1 bg-white p-4 rounded-xl">{content}</div>;
}

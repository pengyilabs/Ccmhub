// Generic placeholder for representational/decorative icons (logos, thumbnails, status symbols)

interface PlaceholderIconProps {
  className?: string;
}

export function PlaceholderIcon({ className = "w-8 h-8" }: PlaceholderIconProps) {
  return (
    <div className={`${className} bg-gray-300 border-2 border-gray-400`} />
  );
}

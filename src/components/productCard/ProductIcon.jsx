const ICON_PATHS = {
  camera: "/products/icons/livestream.svg",
  shield: "/products/icons/favicon.svg",
  sensors: "/products/icons/Group 1417.svg",
  protection: "/products/icons/Group 1418.svg",
  review:"/products/icons/review.svg",
  truck: "/products/icons/Vector.svg", 
};

export default function ProductIcon({ name, className }) {
  const iconSrc = ICON_PATHS[name] || ICON_PATHS.camera;

  return (
    <img
      src={iconSrc}
      alt={name}
      className={className}
      style={{ width: "100%", height: "100%", objectFit: "contain" }}
    />
  );
}
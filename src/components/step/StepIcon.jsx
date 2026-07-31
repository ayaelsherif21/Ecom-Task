const ICON_PATHS = {
  camera: "/assets/icons/livestream.svg",
  shield: "/assets/icons/favicon.svg",
  sensors: "/assets/icons/Group 1417.svg",
  protection: "/assets/icons/Group 1418.svg",
  review:"/assets/icons/review.svg",
  truck: "/assets/icons/Vector.svg", 
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
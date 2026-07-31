const ICON_PATHS = {
  camera: "/assets/icons/camera.svg",
  shield: "/assets/icons/favicon.svg",
  sensors: "/assets/icons/sensors.svg",
  protection: "/assets/icons/protection.svg",
  review:"/assets/icons/review.svg",
  truck: "/assets/icons/Shipping.svg", 
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
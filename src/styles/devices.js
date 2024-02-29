const sizes = {
  mobile: "320px",
  tablet: "768px",
  desktop: "1200px",
};

const devices = {
  mobile: `(min-width: ${sizes.mobile})`,
  tablet: `(min-width: ${sizes.tablet})`,
  desktop: `(min-width: ${sizes.desktop})`,
};

export default devices;

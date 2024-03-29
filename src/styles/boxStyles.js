const boxStyles = {
  /* border-radius 속성 */
  radius8: "border-radius: 8px",
  radius16: "border-radius: 16px",
  radius24: "border-radius: 24px",
  radius200: "border-radius: 200px",
  radiusC: "border-radius: 50%",

  /* box-shadow */
  shadow1: "box-shadow: 0px 4px 4px 0px rgba(140, 140, 140, 0.25)",
  shadow2: "box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
  shadow3: "box-shadow: 0px 16px 20px 0px rgba(48, 48, 48, 0.62)",

  /* box-padding */
  paddingInput: "padding: 12px 16px;",
  paddingButtonIcon: "padding: 12px 16px",
  paddingButtonS: "padding: 8px 12px",
  paddingButtonM: "padding: 12px 24px",
  paddingBadge: "padding: 4px 12px",
  paddingToast: "padding: 12px 20px",
  padding16: "padding: 16px",
  padding20: "padding: 20px",
  padding24: "padding: 24px",
  padding32: "padding: 32px",

  /* flex */
  flexRowCenter:
    "display: flex; flex-direction: row; justify-content: center; align-items: center",
  inlineFlexRowCenter:
    "display: inline-flex; flex-direction: row; justify-content: center; align-items: center",
  flexColumnCenter:
    "display: flex; flex-direction: Column; align-items: center;",

  /* skeleton Style */
  skeletonAnimation: `
    @keyframes load {
      100% {
        background-position: -100% 0;
      }
    }
    background: linear-gradient(
      120deg,
      #e5e5e5 30%,
      #f0f0f0 38%,
      #f0f0f0 40%,
      #e5e5e5 48%
    );
    background-size: 200% 100%;
    background-position: 100% 0;
    animation: load 1s infinite;       
  `,
};

export default boxStyles;

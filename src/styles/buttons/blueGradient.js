// /styles/buttons/blueGradient.js

const commonTextStyles = {
  fontWeight: 600,
  fontFamily: '"Albert Sans"',
  borderRadius: '60px',
};

// Common styles for all blueGradient buttons (enabled state)
const blueGradientCommonStyles = {
  ...commonTextStyles,
  background: 'linear-gradient(90deg, #153259 -0.31%, #418FD1 99.69%)', // Blue gradient
  color: '#FFF',
  textTransform: 'none',
};

// Common styles for disabled blue buttons
const disabledButtonStyles = {
  ...commonTextStyles,
  color: 'rgba(255, 255, 255, 0.50)',
  background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.50) 0%, rgba(0, 0, 0, 0.50) 100%), linear-gradient(271deg, #153259 -11.45%, #418FD1 -11.45%, #67DE7F 123.02%)', // Blue disabled gradient
  lineHeight: '24px',
};

// Size-specific styles
const sizeMap = {
  small: {
    padding: '8px 20px',
    fontSize: '14px',
    lineHeight: '20px',
  },
  medium: {
    padding: '10px 25px',
    fontSize: '16px',
    lineHeight: '22px',
  },
  large: {
    padding: '12px 32px',
    fontSize: '18px',
    lineHeight: '24px',
  },
  extraLarge: {
    padding: '15px 40px',
    fontSize: '20px',
    lineHeight: '26px',
  },
};

// Helper function to generate variants with disabled styles
const generateBlueGradientVariants = (size) => ({
  props: { variant: 'blueGradient', size },
  style: {
    ...blueGradientCommonStyles,
    ...sizeMap[size],
    '&.Mui-disabled': {
      ...disabledButtonStyles,
      fontSize: sizeMap[size].fontSize,
      lineHeight: sizeMap[size].lineHeight,
    },
  },
});

// Generate all blue gradient variants
const blueGradientVariants = [
  generateBlueGradientVariants('small'),
  generateBlueGradientVariants('medium'),
  generateBlueGradientVariants('large'),
  generateBlueGradientVariants('extraLarge'),
];

export default blueGradientVariants;

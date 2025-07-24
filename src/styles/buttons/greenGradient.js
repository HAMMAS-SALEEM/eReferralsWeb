const commonTextStyles = {
  fontWeight: 600,
  fontFamily: '"Albert Sans"',
  borderRadius: '60px',
};

const greenGradientCommonStyles = {
  ...commonTextStyles,
  background: 'linear-gradient(90deg, #2D6465 -12.67%, #3A806B -12.67%, #67DE7F 112.91%)',
  color: '#FFF',
  textTransform: 'none',
};

const disabledButtonStyles = {
  ...commonTextStyles,
  color: 'rgba(255, 255, 255, 0.50)',
  background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.50) 0%, rgba(0, 0, 0, 0.50) 100%), linear-gradient(271deg, #2D6465 -11.45%, #3A806B -11.45%, #67DE7F 123.02%)',
  lineHeight: '24px',
};

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
    fontSize: '24px',
    lineHeight: '26px',
  },
};

const generateGreenGradientVariants = (size) => ({
  props: { variant: 'greenGradient', size },
  style: {
    ...greenGradientCommonStyles,
    ...sizeMap[size],
    '&.Mui-disabled': {
      ...disabledButtonStyles,
      fontSize: sizeMap[size].fontSize,
      lineHeight: sizeMap[size].lineHeight,
    },
  },
});

const greenGradientVariants = [
  generateGreenGradientVariants('small'),
  generateGreenGradientVariants('medium'),
  generateGreenGradientVariants('large'),
  generateGreenGradientVariants('extraLarge'),
];

export default greenGradientVariants;

import PropTypes from 'prop-types';

const DoubleArrow = ({ mode }) => {
  return mode === 'light' ? (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='26'
      height='26'
      viewBox='0 0 26 26'
      fill='none'
    >
      <path
        d='M1.77734 1L13.1458 13L1.77734 25'
        stroke='black'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M12.8535 1L24.2219 13L12.8535 25'
        stroke='black'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  ) : (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='26'
      height='26'
      viewBox='0 0 26 26'
      fill='none'
    >
      <path
        d='M1.77734 1L13.1458 13L1.77734 25'
        stroke='white'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M12.8535 1L24.2219 13L12.8535 25'
        stroke='white'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

DoubleArrow.propTypes = {
  mode: PropTypes.string,
};

export default DoubleArrow;

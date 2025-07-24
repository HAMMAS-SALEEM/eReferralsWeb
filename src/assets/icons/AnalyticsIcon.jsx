import PropTypes from 'prop-types';

const AnalyticsIcon = ({ mode }) => {
  return mode === 'light' ? (
    <svg
    xmlns="http://www.w3.org/2000/svg"
    width="28"
    height="28"
    viewBox="0 0 28 28"
    fill="none"
  >
    <path
      d="M27 5.33333L19.0404 13.2929C18.6499 13.6834 18.0167 13.6834 17.6262 13.2929L14.7071 10.3738C14.3166 9.98324 13.6834 9.98324 13.2929 10.3738L6.77778 16.8889"
      stroke="black"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M1 1V23.8C1 24.9201 1 25.4802 1.21799 25.908C1.40973 26.2843 1.71569 26.5903 2.09202 26.782C2.51984 27 3.0799 27 4.2 27H27"
      stroke="black"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
  ) : (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='28'
      height='28'
      viewBox='0 0 28 28'
      fill='none'
    >
      <path
        d='M27 5.33334L19.0404 13.2929C18.6499 13.6834 18.0167 13.6834 17.6262 13.2929L14.7071 10.3738C14.3166 9.98326 13.6834 9.98326 13.2929 10.3738L6.77778 16.8889'
        stroke='white'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M1 1V23.8C1 24.9201 1 25.4802 1.21799 25.908C1.40973 26.2843 1.71569 26.5903 2.09202 26.782C2.51984 27 3.0799 27 4.2 27H27'
        stroke='white'
        strokeWidth='2'
        strokeLinecap='round'
      />
    </svg>
  );
};

AnalyticsIcon.propTypes = {
  mode: PropTypes.string,
};

export default AnalyticsIcon;

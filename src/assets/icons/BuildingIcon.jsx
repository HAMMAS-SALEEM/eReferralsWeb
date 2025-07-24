import PropTypes from 'prop-types';

const BuildingIcon = ({ mode }) => {
  return mode === 'light' ? (
    <svg
    xmlns="http://www.w3.org/2000/svg"
    width="26"
    height="30"
    viewBox="0 0 26 30"
    fill="none"
  >
    <path
      d="M1 28.5L24.6889 28.5"
      stroke="black"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6.48832 5.67778H3.31055V28.2111H8.22166H17.4661H22.3772V5.67778H18.9105M6.48832 5.67778V1.5H18.9105V5.67778M6.48832 5.67778H18.9105"
      stroke="black"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <path
      d="M8.51172 27.9222V22.1444H17.1784V27.9222"
      stroke="black"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <path
      d="M8.84375 10H10.0145M8.84375 14H10.0145M8.84375 18H10.0145M15.673 10H16.8438M15.673 14H16.8438M15.673 18H16.8438"
      stroke="black"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12.8438 22.4333V28.2111"
      stroke="black"
      strokeWidth="2"
      strokeLinejoin="round"
    />
  </svg>
  ) : (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='26'
      height='30'
      viewBox='0 0 26 30'
      fill='none'
    >
      <path
        d='M1.15625 28.5L24.8451 28.5'
        stroke='white'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M6.64457 5.67778H3.4668V28.2111H8.37791H17.6224H22.5335V5.67778H19.0668M6.64457 5.67778V1.5H19.0668V5.67778M6.64457 5.67778H19.0668'
        stroke='white'
        strokeWidth='2'
        strokeLinejoin='round'
      />
      <path
        d='M8.66797 27.9222V22.1445H17.3346V27.9222'
        stroke='white'
        strokeWidth='2'
        strokeLinejoin='round'
      />
      <path
        d='M9 10H10.1707M9 14H10.1707M9 18H10.1707M15.8293 10H17M15.8293 14H17M15.8293 18H17'
        stroke='white'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M13 22.4333V28.2111'
        stroke='white'
        strokeWidth='2'
        strokeLinejoin='round'
      />
    </svg>
  );
};

BuildingIcon.propTypes = {
  mode: PropTypes.string,
};

export default BuildingIcon;

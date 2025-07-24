import PropTypes from 'prop-types';

const ProfileIcons = ({ mode }) => {
  return mode === 'light' ? (
    <svg
    xmlns="http://www.w3.org/2000/svg"
    width="28"
    height="28"
    viewBox="0 0 28 28"
    fill="none"
  >
    <circle
      cx="13.9993"
      cy="11.1111"
      r="4.33333"
      stroke="black"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <circle cx="14" cy="14" r="13" stroke="black" strokeWidth="2" />
    <path
      d="M22.6673 23.6863C22.1561 22.1506 21.0297 20.7936 19.4627 19.8258C17.8957 18.8579 15.9758 18.3333 14.0007 18.3333C12.0255 18.3333 10.1056 18.8579 8.53861 19.8258C6.97163 20.7936 5.84519 22.1506 5.33398 23.6863"
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
      <circle
        cx='13.9993'
        cy='11.1111'
        r='4.33333'
        stroke='white'
        strokeWidth='2'
        strokeLinecap='round'
      />
      <circle cx='14' cy='14' r='13' stroke='white' strokeWidth='2' />
      <path
        d='M22.6673 23.6863C22.1561 22.1506 21.0297 20.7936 19.4627 19.8258C17.8957 18.8579 15.9758 18.3333 14.0007 18.3333C12.0255 18.3333 10.1056 18.8579 8.53861 19.8258C6.97163 20.7936 5.84519 22.1506 5.33398 23.6863'
        stroke='white'
        strokeWidth='2'
        strokeLinecap='round'
      />
    </svg>
  );
};

ProfileIcons.propTypes = {
  mode: PropTypes.string,
};

export default ProfileIcons;

import {
  createContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  useContext,
} from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

// Default values for the context
const MainContext = createContext({
  getFromDate: () => null,
  getToDate: () => null,
});

// eslint-disable-next-line react-refresh/only-export-components
export const useMainContext = () => useContext(MainContext);

export const MainDataProvider = ({ children }) => {
  const [collapsed, setCollapsed] = useState(true);
  const [filterIsVisible, setFilterIsVisible] = useState(false);
  const [selectedValues, setSelectedValues] = useState([]);
  const [referralsList, setReferralsList] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [openSearchPatient, setOpenSearchPatient] = useState(false);

  const referralsData = useSelector((state) => state.referrals.referralsData);

  const currentDate = new Date().toLocaleDateString("en-GB");

  const [newPatient] = useState({
    createDate: currentDate,
    createdBy: "",
    patient: "",
    surname: "",
    gender: "",
    address: "",
    suburb: "",
    state: "",
    postcode: "",
    patientDob: "",
    phoneNumber: "",
    email: "",
    referralType: "",
    provider: "",
    status: "",
  });

  const handleOpenSearchPatient = () => setOpenSearchPatient(true);
  const handleCloseSearchPatient = () => setOpenSearchPatient(false);

  const stepUp = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const stepDown = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleToggleCollapse = () => {
    setCollapsed(!collapsed);
  };
  const handleToggleFilterVisible = () => {
    setFilterIsVisible(!filterIsVisible);
  };

  const handleCheckboxChange = (value) => {
    if (selectedValues.includes(value)) {
      setSelectedValues(selectedValues.filter((item) => item !== value));
    } else {
      setSelectedValues([...selectedValues, value]);
    }
  };

  const referralsFilter = () => {
    const newList = referralsList.filter((list) => {
      list.referralType === selectedValues;
    });
    setReferralsList(newList);
  };

  const formatCreateDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  const dobDatesMinMax = referralsData?.results
    ? referralsData?.results?.map(
        (user) => new Date(formatCreateDate(user.created_date))
      )
    : [];

  const minDate = useMemo(
    () => new Date(Math.min(...dobDatesMinMax)),
    [dobDatesMinMax]
  );
  const maxDate = useMemo(
    () => new Date(Math.max(...dobDatesMinMax)),
    [dobDatesMinMax]
  );

  const getFormattedDate = useCallback((date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();
    return {
      day,
      month,
      year,
    };
  }, []);

  const getFromDate = useCallback(
    () => getFormattedDate(minDate),
    [getFormattedDate, minDate]
  );
  const getToDate = useCallback(
    () => getFormattedDate(maxDate),
    [getFormattedDate, maxDate]
  );

  useEffect(() => {
    fetchReferrals();
  }, []);

  const fetchReferrals = async () => {};

  return (
    <MainContext.Provider
      value={{
        filterIsVisible,
        setFilterIsVisible,
        handleToggleFilterVisible,
        collapsed,
        handleToggleCollapse,
        selectedValues,
        handleCheckboxChange,
        referralsFilter,
        stepUp,
        stepDown,
        currentStep,
        openSearchPatient,
        newPatient,
        handleOpenSearchPatient,
        handleCloseSearchPatient,
        getFromDate,
        getToDate,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

MainDataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainContext;

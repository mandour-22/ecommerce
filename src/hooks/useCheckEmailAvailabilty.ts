import { useState } from "react";
import axios from "axios";

type TStatus = "idle" | "checking" | "available" | "notAvailable" | "failed";

const useCheckEmailAvailabilty = () => {
  const [emailAvailabiltyStatus, setEmailAvailabiltyStatus] =
    useState<TStatus>("idle");

  const [enterEmail, setEnterEmail] = useState<null | string>(null);

  const checkEmailAvailability = async (email: string) => {
    setEmailAvailabiltyStatus("checking");
    setEnterEmail(email);

    try {
      const response = await axios.get(`/users?email=${email}`);

      if (!response.data.length) {
        setEmailAvailabiltyStatus("available");
      } else {
        setEmailAvailabiltyStatus("notAvailable");
      }
    } catch (error) {
      setEmailAvailabiltyStatus("failed");
    }
  };

  const restEmailAvailabilaty = () => {
    setEmailAvailabiltyStatus("failed");
    setEnterEmail(null);
  };

  return {
    emailAvailabiltyStatus,
    enterEmail,
    checkEmailAvailability,
    restEmailAvailabilaty,
  };
};

export default useCheckEmailAvailabilty;

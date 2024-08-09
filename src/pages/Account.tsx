import { useAppSelector } from "@store/Hooks";
import { Heading } from "@components/common";

const Account = () => {
  const accountFullInfo = useAppSelector((state) => state.auth.user);

  return (
    <>
      <Heading title="My Account" />
      <ul>
        <li>First Name: {accountFullInfo?.firstName}</li>
        <li>Last Name: {accountFullInfo?.lastName}</li>
        <li>Email Address: {accountFullInfo?.email}</li>
      </ul>
    </>
  );
};

export default Account;

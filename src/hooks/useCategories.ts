import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@store/Hooks";
import {
  ActGetCategories,
  cleanUpCategregoriesRecords,
} from "@store/Category/CategoriesSlice";

const useCategories = () => {
  const dispath = useAppDispatch();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { loading, records, error } = useAppSelector(
    (state) => state.Categories
  );

  useEffect(() => {
    const promise = dispath(ActGetCategories());

    return () => {
      promise.abort();
      dispath(cleanUpCategregoriesRecords());
    };
  }, [dispath]);

  return { loading, error, records };
};

export default useCategories;

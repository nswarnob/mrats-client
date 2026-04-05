import { useEffect } from "react";

const usePageTitle = (title) => {
  useEffect(() => {
    document.title = title ? `${title} | LoanLink` : "LoanLink";
  }, [title]);
};

export default usePageTitle;

/* eslint-disable no-useless-escape */
import type { TErrorSources, TGenericErrorResponse } from "../interface/error";

const handleDuplicateError = (err: Error): TGenericErrorResponse => {
  // Extract value within double quotes using regex
  const match = err.message.match(/\"([^\"]*)\"/);
  const extractedMessage: string = (match && match[1]) || "Unknown";

  const errorSources: TErrorSources = [
    {
      path: "",
      message: `${extractedMessage} is already exists`,
    },
  ];

  const statusCode = 400;

  return {
    statusCode,
    message: "Invalid ID",
    errorSources,
  };
};

export default handleDuplicateError;

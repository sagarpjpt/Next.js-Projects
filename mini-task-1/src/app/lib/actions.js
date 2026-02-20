"use server";

export async function calculateSum(prevState, formData) {
  const num1 = Number(formData.get("num1"));
  const num2 = Number(formData.get("num2"));

  // increment attempts using prevState
  const attempts = prevState.attempts + 1;

  // validation
  if (isNaN(num1) || isNaN(num2)) {
    return {
      ...prevState,          // preserve old result
      attempts,              // updated attempts
      error: "Invalid numbers",
    };
  }

  return {
    result: num1 + num2,  
    error: null,
    attempts,
  };
}

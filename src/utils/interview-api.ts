export async function getLatestInterview() {

  const response = await fetch("/api/interview/latest");

  const data = await response.json();

  if (!data.success) {

    throw new Error(data.message);

  }

  return data.interview;

}
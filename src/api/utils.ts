export async function data<ResultType>(
  promise: Promise<{ data: ResultType }>,
): Promise<ResultType> {
  return promise.then(({ data }) => data);
}

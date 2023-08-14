export default async function mapUserThreads(rawResponse: FullUserThreads) {
  const userApiResponse = rawResponse?.data?.mediaData?.threads

  if (!userApiResponse) return null

  console.log(rawResponse?.data?.mediaData?.threads[0].thread_items[0].post)

  const data: Thread[] = userApiResponse

  return data
}

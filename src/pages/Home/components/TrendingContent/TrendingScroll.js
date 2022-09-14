/*

import { useState, useEffect } from 'react'

import { getTrendingTablature } from "services/tablatureServices";

const TrendingScroll = (pageNum = 1) => {
  const [results, setResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [error, setError] = useState({})
  const [hasNextPage, setHasNextPage] = useState(false)
  
  useEffect(() => {
    setIsLoading(true)
    setIsError(false)
    setError({})

    /abort controller cancels the request/
    const controller = new AbortController()
    /signal is an option/
    const { signal } = controller

    * need to refactor for json response *

    getTrendingTablature(pageNum, { signal }).then(data => {
      setResults(prev => [...prev, ...data])
      setHasNextPage(Boolean(data.length))
      setIsLoading(false)
    })
    .catch(e => {
      setIsLoading(false)
      if (signal.aborted) return
      setIsError(true)
      setError({ message: e.message })
    })

    /clean-up function/
    return () => controller.abort()

  }, [pageNum])
  
  return { isLoading, isError, error, results, hasNextPage }
}

export default TrendingScroll

*/
// Example TypeScript snippet for import demo
// This file demonstrates the <<< import syntax

interface ApiResponse<T> {
  data: T
  status: number
  message: string
}

export async function fetchData<T>(
  endpoint: string
): Promise<ApiResponse<T>> {
  const response = await fetch(endpoint)
  const data = await response.json()
  return {
    data,
    status: response.status,
    message: response.ok ? 'Success' : 'Error'
  }
}

// #region example
export const greeting = (name: string) => {
  return `Hello, ${name}!`
}
// #endregion example

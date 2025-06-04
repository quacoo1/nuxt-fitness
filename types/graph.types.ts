export type GraphData = {
  labels: string[]
  datasets: {
    label: string
    backgroundColor: string
    data: any[]
  }[]
}

export type GraphDataIterator = {
  [key: string]: {
    labels: string[]
    datasets: {
      label: string
      backgroundColor: string
      data: number[]
    }[]
  }
}

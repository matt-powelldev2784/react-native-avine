import useGetApiData from '../../../../utils/hooks/useGetApiData'
import { useEffect, useState } from 'react'
import { getAllClients } from '../../../../db/clients/getAllClients'
import { ClientWithIdT } from '../../../../types/ClientT'

interface ClientOption {
  label: string
  value: string
}

export const useGetClientOptions = () => {
  const [clients, setClients] = useState<ClientOption[]>([])
  const { data } = useGetApiData({
    apiFunction: async () => getAllClients(),
  })

  useEffect(() => {
    const fetchRounds = async () => {
      if (!data) return

      const allClients = data as ClientWithIdT[]

      const clientOptions: ClientOption[] = allClients?.map((client) => ({
        value: client.id,
        label: client.name,
      }))

      setClients(clientOptions)
    }
    fetchRounds()
  }, [data])

  return clients
}

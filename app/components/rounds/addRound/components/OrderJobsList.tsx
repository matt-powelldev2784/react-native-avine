import { View } from 'react-native'
import React, { useEffect, useState } from 'react'
import DraggableFlatList from 'react-native-draggable-flatlist'
import OrderedJobListItem from './OrderedJobListItem'

interface JobOption {
  label: string
  value: string
}

interface OrderJobsListProps {
  relatedJobs: string[]
  userJobs: JobOption[]
  formik: any
}

const OrderJobsList = ({
  relatedJobs,
  userJobs,
  formik,
}: OrderJobsListProps) => {
  const [orderedJobs, setOrderedJobs] = useState<JobOption[] | []>([])

  useEffect(() => {
    const userJobsWithoutPrefix = userJobs.map((job) => {
      return {
        label: job.label,
        value: job.value.substring(5),
      }
    })

    const selectdJobs = userJobsWithoutPrefix.filter((job) => {
      if (relatedJobs.includes(job.label)) {
        return job
      }
    })

    setOrderedJobs(selectdJobs)
  }, [relatedJobs, userJobs])

  const handleDragEnd = (data: JobOption[] | []) => {
    setOrderedJobs(data)
    const orderedJobLabels = data.map((job) => job.label)
    formik.setFieldValue('relatedJobs', orderedJobLabels)
  }

  return (
    <View style={{ flex: 1 }}>
      <DraggableFlatList
        data={orderedJobs}
        renderItem={({ item, drag, isActive }) => (
          <OrderedJobListItem item={item} drag={drag} isActive={isActive} />
        )}
        keyExtractor={(item) => `draggable-item-${item.label}`}
        onDragEnd={({ data }) => handleDragEnd(data)}
      />
    </View>
  )
}

export default OrderJobsList

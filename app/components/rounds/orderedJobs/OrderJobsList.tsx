import { View } from 'react-native'
import React from 'react'
import DraggableFlatList from 'react-native-draggable-flatlist'
import OrderedJobListItem from './OrderedJobListItem'
import useOrderedJobs from './hooks/useOrderedJobs'

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
  const [orderedJobs, setOrderedJobs] = useOrderedJobs(userJobs, relatedJobs)

  const handleDragEnd = (data: JobOption[]) => {
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

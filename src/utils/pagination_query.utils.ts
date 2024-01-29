import aqp from 'api-query-params'
import mongoose, { Document } from 'mongoose'
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose'

interface ModelQuery<T extends Document<any, any, any>> { }
export interface DataQueryResponse {
  meta: {
    currentPage: number
    pageSize: number
    pages: number
    total: number
  }
  result: any[]
}

export const PaginationQuery = async (queryString: string, model: any): Promise<DataQueryResponse> => {
  const queryParams = JSON.parse(JSON.stringify(queryString))
  const { current, pageSize } = queryParams
  const { filter, sort, projection, population } = aqp(queryString)
  delete filter.current
  delete filter.pageSize
  const currentPage = current ? Number(current) : 1
  const defaultLimit = pageSize ? Number(pageSize) : 10
  const offset = (currentPage - 1) * defaultLimit
  const totalItem = (await model.find(filter)).length
  const totalPage = Math.ceil(totalItem / defaultLimit)

  const result = await model
    .find(filter)
    .skip(offset)
    .limit(defaultLimit)
    .sort(sort as any)
    .populate(population)
    .exec()
  return {
    meta: {
      currentPage: currentPage,
      pageSize: defaultLimit,
      pages: totalPage,
      total: totalItem
    },
    result
  }
}

import aqp from 'api-query-params'
import { PopulateOptions } from 'mongoose'
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose'
export interface DataQueryResponse {
  meta: {
    currentPage: number
    pageSize: number
    pages: number
    total: number
  }
  result: any[]
}

interface PaginationQueryOptions {
  filter?: Record<string, any>
  sort?: Record<string, any>
  projection?: Record<string, any>
  population?: PopulateOptions[]
}

export const PaginationQuery = async (
  queryString: string,
  model: SoftDeleteModel<any>,
  options?: PaginationQueryOptions
): Promise<DataQueryResponse> => {
  const queryParams = JSON.parse(JSON.stringify(queryString))
  const { current, pageSize } = queryParams
  const { filter, sort, projection, population } = options ? options : aqp(queryParams)
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
    .select(projection)
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

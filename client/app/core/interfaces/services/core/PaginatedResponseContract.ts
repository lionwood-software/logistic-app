import { PaginationMetaContract } from "@/app/core/interfaces/services/core/PaginationMetaContract";

export interface PaginatedResponseContract<T> {
  items: T[];
  meta: PaginationMetaContract;
}
